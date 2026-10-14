import { useEffect, useRef } from 'react'

// A field of dots on a plane, rolling in slow overlapping waves, seen through a camera that looks down
// at it. Drawn on a plain 2D canvas with a perspective projection.
//
// The surface is also a small spring simulation (a height field following the wave equation), one cell
// per dot. The cursor pushes down on it, which makes a dent that trails a wake as it moves; a click is a
// sharper push, and the ripple that follows comes out of the simulation itself. Stops when scrolled out
// of view; with reduced motion it draws a single still frame and doesn't react to the cursor.

const PITCH = (35 * Math.PI) / 180 // how far the camera looks down: 0 = level with the plane, 90° = straight down
const CAMERA_HEIGHT = 1 // above the plane, in world units
const STEP = 0.04 // dot spacing on the plane, in world units (also the simulation's cell size)
const NEAR = 0.3 // nearest and farthest rows drawn, measured along the plane from below the camera
const FAR = 7
const AMPLITUDE = 0.05 // height of the slow background waves, in world units

// the surface simulation, stepped at a fixed 60Hz
const TENSION = 0.1 // how strongly each point is pulled towards its neighbours (sets the ripple speed)
const RESTORE = 0.004 // how strongly each point is pulled back to flat
const DAMPING = 0.965 // how much motion survives each step (lower settles faster)
const HOVER_FORCE = 0.0005 // the cursor's push per step; ~0.06 deep at rest
const HOVER_RADIUS = 7.5 // in cells
const CLICK_IMPULSE = 0.016 // a click's push
const CLICK_RADIUS = 4.5 // in cells
const FOLLOW = 0.03 // how quickly the push point catches up with the cursor (0..1 per step)
const FADE = 0.015 // how quickly the push fades in and out (0..1 per step)

const BASE = [167, 180, 207] // #a7b4cf, the dot colour used elsewhere on the page
const CREST = [92, 116, 196] // bluer, for dots lifted by the waves

// `viewHeight` renders the canvas as a slice of a taller view, so a short strip (like the footer's)
// keeps the same camera angle as a full-height one (like the hero's). `viewLift` raises the slice that
// many pixels up from the bottom of that view, towards the horizon, where the dots are smaller and denser.
const DotWave = ({ className, viewHeight, viewLift = 0 }) => {
  const canvas = useRef()

  useEffect(() => {
    const el = canvas.current
    const ctx = el.getContext('2d')
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const cos = Math.cos(PITCH)
    const sin = Math.sin(PITCH)
    // camera-space depth and on-screen position of a point on (or above) the plane
    const depthOf = (y, z) => z * cos - (y - CAMERA_HEIGHT) * sin
    const screenY = (y, z, depth) =>
      centreY - (((y - CAMERA_HEIGHT) * cos + z * sin) * focal) / depth

    let width = 0
    let height = 0
    let focal = 0
    let centreY = 0 // where the camera points on the canvas, vertically
    // the simulation grid: one cell per dot, columns -half..half, rows NEAR..FAR
    const rows = Math.floor((FAR - NEAR) / STEP) + 1
    let half = 0
    let cols = 0
    let h = new Float32Array(0) // height of each cell
    let v = new Float32Array(0) // its vertical speed

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = el.clientWidth
      height = el.clientHeight
      el.width = width * dpr
      el.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const view = viewHeight || height
      // zoom follows the view height, but no further than a desktop-sized hero, so tall phone layouts
      // keep the same dot size and angle instead of zooming in
      focal = Math.min(view, 1100) * 0.9
      centreY = height - view / 2 + viewLift
      // wide enough for the farthest row, plus a margin so ripples don't bounce off the visible edge
      half = Math.ceil(((width / 2) * depthOf(0, FAR) * 1.05) / focal / STEP) + 4
      cols = half * 2 + 1
      h = new Float32Array(cols * rows)
      v = new Float32Array(cols * rows)
    }

    // where a point on screen lands on the plane: cast a ray from the camera and intersect it with y = 0
    const toPlane = (sx, sy) => {
      const rx = (sx - width / 2) / focal
      const ry = (centreY - sy) / focal
      const down = sin - ry * cos
      if (down <= 0.01) return null // above the horizon
      const distance = CAMERA_HEIGHT / down
      return { x: rx * distance, z: (ry * sin + cos) * distance }
    }
    // the same point as simulation cell coordinates
    const toCell = (clientX, clientY) => {
      const r = el.getBoundingClientRect()
      const inside =
        clientX >= r.left && clientX <= r.right && clientY >= r.top && clientY <= r.bottom
      const point = inside && toPlane(clientX - r.left, clientY - r.top)
      if (!point || point.z > FAR) return null
      return { i: point.x / STEP + half, j: (point.z - NEAR) / STEP }
    }

    // push the surface down around a cell, with a soft round falloff
    const push = (ci, cj, amount, radius) => {
      const reach = Math.ceil(radius * 3)
      const i0 = Math.max(1, Math.floor(ci - reach))
      const i1 = Math.min(cols - 2, Math.ceil(ci + reach))
      const j0 = Math.max(1, Math.floor(cj - reach))
      const j1 = Math.min(rows - 2, Math.ceil(cj + reach))
      for (let j = j0; j <= j1; j++) {
        for (let i = i0; i <= i1; i++) {
          const d2 = (i - ci) ** 2 + (j - cj) ** 2
          v[j * cols + i] -= amount * Math.exp(-d2 / (radius * radius))
        }
      }
    }

    // the cursor's cell, and an eased push point that follows it, fading in while it's over the surface
    const touch = { i: 0, j: 0, ti: 0, tj: 0, on: 0, target: 0, placed: false }
    const onMove = ({ clientX, clientY }) => {
      const cell = toCell(clientX, clientY)
      if (!cell) {
        touch.target = 0
        return
      }
      touch.ti = cell.i
      touch.tj = cell.j
      touch.target = 1
      if (!touch.placed) {
        touch.i = cell.i
        touch.j = cell.j
        touch.placed = true
      }
    }
    // leaving the window doesn't fire a final mousemove, so fade out explicitly
    const onLeave = (e) => {
      if (!e.relatedTarget) touch.target = 0
    }
    const onDown = ({ clientX, clientY }) => {
      const cell = toCell(clientX, clientY)
      if (!cell) return
      push(cell.i, cell.j, CLICK_IMPULSE, CLICK_RADIUS)
      wake()
    }

    // whether the surface has any motion left; a calm, untouched surface skips the simulation
    let active = false
    const wake = () => {
      active = true
    }
    const simulate = () => {
      touch.i += (touch.ti - touch.i) * FOLLOW
      touch.j += (touch.tj - touch.j) * FOLLOW
      touch.on += (touch.target - touch.on) * FADE
      if (touch.on > 0.005) {
        push(touch.i, touch.j, HOVER_FORCE * touch.on, HOVER_RADIUS)
        active = true
      }
      if (!active) return

      let energy = 0
      for (let j = 1; j < rows - 1; j++) {
        for (let i = 1; i < cols - 1; i++) {
          const k = j * cols + i
          const lap = h[k - 1] + h[k + 1] + h[k - cols] + h[k + cols] - 4 * h[k]
          v[k] = (v[k] + lap * TENSION - h[k] * RESTORE) * DAMPING
        }
      }
      for (let k = 0; k < h.length; k++) {
        h[k] += v[k]
        energy += Math.abs(h[k])
      }
      active = energy > 0.01 || touch.on > 0.005
      if (!active) {
        h.fill(0)
        v.fill(0)
      }
    }

    // dots are drawn in batches that share a colour: a few crest tints times a few opacity steps
    const TINTS = 6
    const ALPHAS = 8
    const styles = []
    for (let c = 0; c < TINTS; c++) {
      for (let a = 0; a < ALPHAS; a++) {
        const k = c / (TINTS - 1)
        const r = BASE[0] + (CREST[0] - BASE[0]) * k
        const g = BASE[1] + (CREST[1] - BASE[1]) * k
        const b = BASE[2] + (CREST[2] - BASE[2]) * k
        styles.push(
          `rgba(${r | 0}, ${g | 0}, ${b | 0}, ${((a + 1) / ALPHAS).toFixed(3)})`
        )
      }
    }
    const batches = styles.map(() => [])

    const draw = (time) => {
      const t = time / 1000
      ctx.clearRect(0, 0, width, height)
      for (const batch of batches) batch.length = 0

      // only the part of the canvas inside the window gets drawn
      const bounds = el.getBoundingClientRect()
      const top = Math.max(0, -bounds.top) - 10
      const bottom = Math.min(height, window.innerHeight - bounds.top) + 10

      let row = 0
      for (let z = NEAR; row < rows; z += STEP, row++) {
        const rowDepth = depthOf(0, z)
        if (rowDepth <= 0.05) continue
        // enough columns to cover the width at this depth
        const columns = Math.min(
          half,
          Math.ceil(((width / 2) * rowDepth * 1.05) / focal / STEP)
        )
        const depthFade = 1 - (z - NEAR) / (FAR - NEAR)

        for (let col = -columns; col <= columns; col++) {
          const x = col * STEP
          let y =
            AMPLITUDE *
            (Math.sin(x * 5 + t * 0.6) * 0.7 +
              Math.sin(z * 4 - t * 0.9) * 0.6 +
              Math.sin((x + z) * 3.5 + t * 0.4) * 0.3)
          if (active) y += h[row * cols + col + half]

          const depth = depthOf(y, z)
          const scale = focal / depth
          const sx = width / 2 + x * scale
          const sy = screenY(y, z, depth)
          if (sx < -10 || sx > width + 10 || sy < top || sy > bottom) continue

          const crest = Math.min(1, Math.max(0, (y / AMPLITUDE + 1.2) / 2.6))
          const alpha = depthFade ** 0.7
          if (alpha < 0.5 / ALPHAS) continue
          const tint = Math.round(crest * (TINTS - 1))
          const step = Math.min(ALPHAS - 1, Math.round(alpha * ALPHAS) - 1)
          batches[tint * ALPHAS + Math.max(0, step)].push(
            sx,
            sy,
            Math.max(0.5, Math.min(1.7, scale / 700))
          )
        }
      }

      batches.forEach((batch, index) => {
        if (!batch.length) return
        ctx.fillStyle = styles[index]
        ctx.beginPath()
        for (let k = 0; k < batch.length; k += 3) {
          const size = batch[k + 2]
          ctx.rect(batch[k] - size, batch[k + 1] - size, size * 2, size * 2)
        }
        ctx.fill()
      })
    }

    // fixed 60Hz simulation steps, however fast the screen refreshes
    let frame
    let visible = true
    let last = 0
    let pending = 0
    const loop = (time) => {
      pending += Math.min(0.1, (time - (last || time)) / 1000)
      last = time
      while (pending >= 1 / 60) {
        simulate()
        pending -= 1 / 60
      }
      draw(time)
      if (visible && !still) frame = requestAnimationFrame(loop)
    }

    resize()
    draw(0)

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      cancelAnimationFrame(frame)
      last = 0
      if (visible && !still) frame = requestAnimationFrame(loop)
    })
    observer.observe(el)

    const onResize = () => {
      resize()
      draw(performance.now())
    }
    window.addEventListener('resize', onResize)
    if (!still) {
      window.addEventListener('mousemove', onMove, { passive: true })
      document.addEventListener('mouseout', onLeave)
      window.addEventListener('mousedown', onDown)
    }

    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      window.removeEventListener('resize', onResize)
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseout', onLeave)
      window.removeEventListener('mousedown', onDown)
    }
  }, [viewHeight, viewLift])

  return <canvas ref={canvas} className={className} />
}

export default DotWave
