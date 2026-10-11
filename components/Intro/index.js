import Image from 'next/image'
import { useEffect, useRef } from 'react'

import socials from '../socials'
import styles from './Intro.module.css'

// Lets the dot grid and the divider respond to the cursor: more of the grid shows faintly around it,
// and the divider glows under it. Writes CSS variables, so React never re-renders.
const useCursorResponse = (reveal, divider) => {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

    let frame
    const onMove = ({ clientX, clientY }) => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        if (reveal.current) {
          const r = reveal.current.getBoundingClientRect()
          const inside =
            clientX > r.left && clientX < r.right && clientY > r.top && clientY < r.bottom
          reveal.current.style.setProperty('--x', `${clientX - r.left}px`)
          reveal.current.style.setProperty('--y', `${clientY - r.top}px`)
          reveal.current.style.setProperty('--on', inside ? 1 : 0)
        }
        if (divider.current) {
          const r = divider.current.getBoundingClientRect()
          divider.current.style.setProperty('--x', `${clientX - r.left}px`)
          divider.current.style.setProperty(
            '--near',
            Math.max(0, 1 - Math.abs(clientY - r.top) / 250)
          )
        }
      })
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(frame)
    }
  }, [reveal, divider])
}

const Intro = () => {
  const reveal = useRef()
  const divider = useRef()
  useCursorResponse(reveal, divider)

  return (
    // clips the full-width decoration sideways only, so it never adds a horizontal scrollbar
    <div className={styles.hero}>
      <div className={styles.intro}>
        {/* background decoration: the layout grid, drawn faintly, and a dot grid on the sides */}
        <div className={styles.decor} aria-hidden="true">
          <div className={styles.reveal} ref={reveal} />
          <div className={styles.sideDots} />
          <span className={[styles.guide, styles.guideLeft].join(' ')} />
          <span className={[styles.guide, styles.guideRight].join(' ')} />
          <span className={[styles.cross, styles.crossLeft].join(' ')} />
          <span className={[styles.cross, styles.crossRight].join(' ')} />
        </div>
        <div className={styles.shortOne}>
          <p className={styles.greeting}>Hi, I’m Sinan.</p>
          <p className={styles.myTitle}>I lead teams that ship</p>
          <a target="_blank" rel="noopener noreferrer" href="mailto:me@wunnle.com">
            <button className={styles.helloButton}>Say hello</button>
          </a>
          <ul className={styles.socials}>
            {socials.map(({ href, icon, name }) => (
              <li key={icon}>
                <a target="_blank" rel="noopener noreferrer" href={href}>
                  <Image
                    src={`/images/${icon}.svg`}
                    width={24}
                    height={24}
                    alt={`wunnle on ${name}`}
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.longOne}>
          <p>
            I’m an Istanbul based software engineer, building for the web for over 15
            years. I’ve been leading engineering teams for a good part of that. I work
            across the stack, mostly with <strong>TypeScript</strong>,{' '}
            <strong>React</strong> and <strong>Next.js</strong> on the front end and{' '}
            <strong>Node.js</strong> on the back.
          </p>
          <p>
            Lately I’ve been spending most of my time on <strong>AI</strong> and{' '}
            <strong>LLM</strong> products.
          </p>
          <p>
            I’m also the organizer of{' '}
            <a
              href="https://kommunity.com/reactjs-istanbul"
              target="_blank"
              rel="noreferrer"
            >
              React Istanbul
            </a>
            , a community for React developers in Istanbul.
          </p>
          <p>
            I’m currently leading engineering at{' '}
            <a href="https://colonist.io" target="_blank" rel="noreferrer">
              Colonist
            </a>
            .
          </p>
        </div>
      </div>
      <div className={styles.br} ref={divider}></div>
    </div>
  )
}

export default Intro
