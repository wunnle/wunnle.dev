# wunnle.dev

Sinan's portfolio. Next.js (pages router). Each work is a folder in `works/<slug>/` with `index.md` (frontmatter + copy) and `images.md` (the screenshots shown on its page), and its images in `public/<slug>/`.

## Work frontmatter

- `title`, `date` (works are listed newest first), `tagline` (what the project is, a few words, shown on the card), `role` (Sinan's role, e.g. "Led the engineering team" or "Personal project"; shown under the tagline on the card and in the work page sidebar), `tech` (optional, comma-separated stack shown as white icons on the card, server-side and hosting last, e.g. "Next.js, Figma, Firebase, Vercel"; each name needs a `<name>White` entry in `components/Icon/icons.js`), `client` (optional), `website` (optional), `featuredImg` (the card preview), `backgroundColor` (the card colour).
- Card colours: reuse the existing ones rather than inventing new ones. They can cycle; avoid giving two neighbouring cards the same colour.
- The site is framed around engineering leadership. Don't describe work as design or front-end only.

## Work card previews

`featuredImg` is a 960x880 transparent PNG. Every card follows the same layout (SpielList and Kafagöz are the reference):

- **Two phone screenshots, no more.** Mobile screenshots read better than desktop ones on the cards.
- **Real phone proportions.** Capture at a full iPhone screen, 390x844 at 3x (1170x2532). Don't use a viewport with the browser toolbars taken out (390x664); it looks too wide.
- **Zoomed in and cropped.** The phones are drawn at 1150px tall, so they run off the bottom of the canvas (and the back one off the right edge). The card container cuts them further.
- **Front phone** at the top left (left 82, top 52), untinted. Put the most striking screen here.
- **Back phone** offset right and lower (left 390, top 120), with a flat tint of the card's own `backgroundColor` at 0.32 opacity so it recedes.
- **Small corner radius** (12px) and a soft shadow. No device frames, no rounded-phone look.
- Hide dev-only UI before capturing (e.g. the Next.js indicator: `nextjs-portal { display: none }`).

Build it with `scripts/card-preview.js` (Playwright; see the comment at the top of the file for how to run it):

```bash
node scripts/card-preview.js front.png back.png "#2F3350" public/kafagoz/preview.png
```

Check the result on the homepage at both desktop and phone widths before committing.

## Work page images

`images.md` lists the screenshots shown on the work page, one per line. Use single full-height phone screenshots (resized to 996px wide) rather than collages, plus at most one desktop screenshot (1600px wide) when the product has a desktop layout.

## Checks

- `yarn build` must pass. Don't run it while `yarn dev` is serving from the same checkout: both write to `.next/` and the dev server breaks.
- Lint changed JS with `npx eslint --fix <files>`.
