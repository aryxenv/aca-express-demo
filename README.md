# Azure Container Apps Express deck

An interactive, customer-facing presentation on **Azure Container Apps
Express**, built as a web app with React, Vite, and Tailwind. Slides are live
components, so the demos run right inside the deck.

## The story

Eight slides, in order:

1. **ACA Express**: ship containers in seconds.
2. **The setup tax**: what stands between an idea and a live URL today.
3. **What is Express**: environmentless container, bring your image.
4. **Cold-start race**: Express vs a Consumption environment, live from zero.
5. **The numbers**: measured provisioning, deploy, and cold-start times.
6. **When Express wins**: the scale-to-zero use case, with an honest "reach for Standard" boundary.
7. **Room to grow**: outgrow Express into a standard environment on the same platform.
8. **Get started**: public preview, regions, and a QR to the docs.

Numbers come from the reference demo (cited to the blog); platform facts come
from Microsoft Learn. Every claim carries an on-slide source link, and
`presenter-notes.md` has the full talk track plus citations.

## Run locally

```pwsh
npm install
npm run dev
```

Open http://localhost:5173.

The deck is fully client-side. The optional FastAPI layer in `server/` is not
used by the current slides; see `server/README.md` if you add server-backed
demos.

## Present

- **Left / Right arrows** move between slides.
- **Spacebar** cycles interactive states inside a slide (for example, the
  numbers rows).
- **Swipe** moves between slides on phones.

The cold-start race, the animated metric bars, and the 24-hour traffic chart
play on their own. They respect reduced-motion and fall back to a static state
for exports.

## Export

Use the footer **Export** menu.

| Option | Output |
| --- | --- |
| **PDF** | `webslides.pdf` |
| **PowerPoint** | Editable `webslides.pptx` or image `webslides-img.pptx` |

Local file exports need the FastAPI server and save ignored artifacts in
`exports/`. Do not commit those.

## Project reference

- Slides: `src/components/slides`
- Deck order: `src/Presentation.tsx`
- Shared UI: `src/components/ui`
- Theme tokens (dark palette): `src/index.css`
- Motion hooks: `src/hooks`
- Presenter notes: `presenter-notes.md`
