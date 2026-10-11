// Builds a work card's preview image (public/<work>/preview.png) from two phone screenshots.
// See CLAUDE.md, "Work card previews", for the rules this follows.
//
// usage: node scripts/card-preview.js <front.png> <back.png> <card colour> <out.png>
//
// Needs Playwright with a Chromium build. It isn't a dependency of this site, so install it
// somewhere outside the repo and point NODE_PATH at that node_modules, e.g.
//   NODE_PATH=/tmp/pw/node_modules node scripts/card-preview.js ...
// Set CHROMIUM_PATH to use a browser that's already on disk instead of Playwright's download.
const fs = require('fs')
const { chromium } = require('playwright')

const [front, back, tint, out] = process.argv.slice(2)
if (!out) {
  console.error(
    'usage: node scripts/card-preview.js <front.png> <back.png> <card colour> <out.png>'
  )
  process.exit(1)
}

// Screenshots are 1170x2532 (390x844 at 3x). At this height they run off the 960x880 canvas.
const HEIGHT = 1150
const WIDTH = Math.round((HEIGHT * 1170) / 2532)

const dataUrl = (file) =>
  `data:image/png;base64,${fs.readFileSync(file).toString('base64')}`
const phone = (file, left, top, tintOpacity) => `
  <div style="position:absolute;left:${left}px;top:${top}px;width:${WIDTH}px;height:${HEIGHT}px;
    border-radius:12px;overflow:hidden;
    box-shadow:0 30px 70px rgba(0,20,60,.28),0 4px 14px rgba(0,0,0,.08)">
    <img src="${dataUrl(file)}" style="display:block;width:100%;height:100%">
    ${
      tintOpacity
        ? `<div style="position:absolute;inset:0;background:${tint};opacity:${tintOpacity}"></div>`
        : ''
    }
  </div>`

;(async () => {
  const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH })
  const page = await browser.newPage({ viewport: { width: 960, height: 880 } })
  await page.setContent(
    `<body style="margin:0;background:transparent;overflow:hidden">
      ${phone(back, 390, 120, 0.32)}
      ${phone(front, 82, 52)}
    </body>`
  )
  await page.screenshot({ path: out, omitBackground: true })
  await browser.close()
})()
