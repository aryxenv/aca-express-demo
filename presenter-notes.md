# Presenter notes — Azure Container Apps Express

A crisp, customer-facing story: **Express is the fastest way to get a
containerized web app live on Azure**, and it's the same platform you already
know — with the first-time setup cost stripped down.

**Sourcing rules for this deck**

- The headline **numbers** (cold start, provisioning, deploy times) come from the
  author's own live demo and are treated as the source of truth. Always frame
  them as **measured in the reference demo** (same container image, West Central
  US), and cite the blog.
- **Platform facts** (managed environment, consumption CPU, built on Sandboxes,
  regions, preview status, feature matrix) come from Microsoft Learn.
- Every fact/number on a slide has a hyperlinked citation. Full links are below.

**Key sources**

- Blog — _Azure Container Apps Express for Shipping Container Apps Fast_:
  https://techcommunity.microsoft.com/blog/appsonazureblog/azure-container-apps-express-for-shipping-container-apps-fast/4531371
- Learn — Express overview (preview):
  https://learn.microsoft.com/azure/container-apps/express-overview
- Learn — Express FAQ:
  https://learn.microsoft.com/azure/container-apps/express-faq
- Learn — Reducing cold-start time:
  https://learn.microsoft.com/azure/container-apps/cold-start
- Express management UI: https://containerapps.azure.com/

**Accuracy guardrail — do NOT say "environmentless."** Express removes the need
to _manage_ an environment: in the portal the platform creates a lightweight,
fully-managed, **shared** environment for you; from the **CLI you still create an
environment yourself**. Express runs on **consumption CPU**, so the honest
comparison is _Express vs a classic Consumption environment_ — the win is
skipping first-time setup and an optimized cold start, not a different
compute/pricing tier.

---

## Slide 1 — "Ship containers in seconds." (`express-title`)

**Talk track**
> "Getting a containerized web app onto the cloud usually means provisioning
> infrastructure and waiting. Express is Azure Container Apps with that first-time
> tax stripped down — bring an image, get a public URL, scale to zero when idle,
> and wake back up in seconds."

**Key facts**
- Express = the fastest way to deploy containerized **web apps** to Azure;
  developer-first and agent-first, opinionated defaults, minimal config. (Learn)
- Three hooks on the slide map to the story: live URL in seconds (path-to-prod),
  scale to zero (cost), optimized cold start ~1.5 s vs ~20 s (experience).

**Sources:** Learn overview.

**Watch-out:** it's **public preview** — say so if asked about production SLAs.

---

## Slide 2 — "Setup stands in the way." (`the-setup-tax`)

**Talk track**
> "Normally there's a setup tax before value: stand up an environment and wait,
> configure networking and scaling, and even after all that, the first request to
> an app that scaled to zero can still take tens of seconds. That's three taxes
> you pay before a user is served."

**Presenter mechanic:** the three cards are selectable (spacebar / click) if you
want to walk them one at a time.

**Key facts**
- This is the generic "classic Consumption environment" experience, not a knock
  on the platform — set up the contrast you resolve on the next slides.

**Sources:** framing slide — no metric claims here.

---

## Slide 3 — "Just bring your image." (`what-is-express`)

**Talk track**
> "Express answers all three. You deploy a container image and get a public HTTPS
> URL. There's no environment for you to stand up — the platform provisions and
> manages a lightweight, shared one for you. It runs on consumption CPU, scales
> to zero, and is tuned for fast cold starts."

**The "why it's fast" mechanics** (kept off-slide, use if a technical buyer asks):
- **Built on Azure Container Apps Sandboxes** — a platform primitive that
  delivers **subsecond startup from prewarmed pools**, strong isolation, and
  massive scale-out. Express is the opinionated experience on top. (Learn FAQ)
- **State restoration / optimized cold start** — instead of replaying the full
  boot sequence on every wake, the platform optimizes cold-start behavior so the
  app starts closer to ready. That's what keeps scale-to-zero practical: nothing
  while idle, low single-digit-second wake-ups. (blog + Learn)

**Accuracy guardrail (important):** the slide reads "no environment to stand
up." If pushed on "environmentless," add the nuance **verbally**: in the portal
there's no environment to manage; from the **CLI you still create one**. Don't
overclaim.

**Sources:** Learn overview + FAQ.

---

## Slide 4 — "Same app. From zero." — live demo (`cold-start-race`)

**Talk track**
> "Both apps have scaled all the way to zero — no cost while idle. Watch what
> happens on the first request. [Click **Send request**.] Express is back almost
> immediately — about 1.5 seconds. The same image on a Consumption environment is
> still waking… and lands around 20 seconds. That's the cold-start experience
> customers have been asking for."

**How the demo behaves**
- Click **Send request**: both lanes wake from zero. A **request token races down
  each track** while the **timers tick up live** — Express reaches "First
  response" and lands "200 OK · 1.5 s" while Consumption is still crawling and its
  counter climbs toward 20 s. A verdict then reads "Express answered about **13×**
  faster" (20 ÷ 1.5).
- **Reset** returns both lanes to "scaled to zero." Use **Run again** to repeat.
- This is a **replay of the measured results**, not a live Azure call. The race is
  **compressed to demo speed** (the on-slide note says so); the numbers shown
  (~1.5 s / ~20 s) are the real measured values. If asked, say exactly that.
- Static export / reduced-motion renders the finished state (1.5 s vs 20 s).

**Key facts** — measured, same image, West Central US:
- Cold start from zero (request → first response): **~1.5 s** vs **~20 s**.

**Sources:** blog.

---

## Slide 5 — "Where the time goes." (`the-numbers`)

**Talk track**
> "Here's the full picture, same container image, same region. Express wins big
> on the two steps that build infrastructure from scratch — cold start and
> environment provisioning — and on first-time deploy. But look at the last row:
> once an environment already exists, a routine app deploy is about the same.
> Express isn't a different runtime; it's the same platform with the first-time
> cost stripped down."

**Presenter mechanic:** rows are selectable — highlight one at a time if useful.
**On screen:** each row animates **two proportional bars** (Express vs
Consumption) that grow on entry, with the value counting up and an "N× faster"
tag. The tiny Express bar next to a full Consumption bar makes the gap visible at
a glance; the last row shows equal bars ("About the same").

**Key facts** — measured, same image, West Central US (blog):

| What's measured | Express | Consumption |
|---|---|---|
| Cold start from zero (request → first response) | ~1.5 s | ~20 s |
| Environment provisioning | ~14 s | ~120 s |
| First-time deploy (environment + app → live URL) | ~52 s | ~166 s |
| App deploy only (environment already exists) | ~30 s | ~30 s |

**Do NOT claim:** that Express is faster at steady-state app deploys — it isn't;
the last row is deliberately equal and it makes the story more credible.

**Sources:** blog.

---

## Slide 6 — "When Express wins." — the use case (`use-case`)

**Talk track**
> "Picture an internal tool or an AI-agent endpoint: busy during the workday,
> dead overnight, and you want it to scale to zero to avoid paying for idle. On a
> Consumption environment the first person in each morning eats a ~20-second cold
> start. Express gives you the same scale-to-zero economics, but that first
> request comes back in ~1.5 seconds — nobody hits the wall. And a brand-new
> endpoint is live in seconds, so you can prototype and ship the same day."

**Then set the honest boundary:**
> "Express is focused on HTTP apps. The moment you need a private VNet, managed
> identity today, jobs and batch, TCP, service discovery, Dapr, or GPU — you move
> to a standard Container Apps environment. Same platform, same CLI."

**On screen:** an animated **24-hour traffic curve** draws in — flat and low
overnight ("scaled to zero"), then a marked **"first request after idle"** ping
at the morning ramp, climbing to a busy daytime plateau. The side card shows the
payoff for that first request: **~20 s → ~1.5 s**. Point at the ping when you say
"the first person in each morning."

**Key facts**
- First request after idle: **~20 s → ~1.5 s** (blog).
- Express best fit (Learn "When to use"): web apps/REST APIs, SaaS frontends & AI
  gateways, rapid prototyping/startups, web dashboards/admin panels.
- Use Standard instead for: GPU (serverless GPUs + workload profiles), TCP, jobs,
  microservices w/ service discovery, custom VNet, Dapr. (Learn)

**Sources:** blog (cold start) + Learn overview (when to use).

---

## Slide 7 — "Room to grow." (`grow-into-standard`)

**Talk track**
> "Express keeps the surface small on purpose. When you outgrow it, you don't
> replatform — you move to a standard Container Apps environment on the same
> platform and CLI, and unlock GPUs, private networking, jobs, TCP, service
> discovery, Dapr, and the rest. Express is the on-ramp; Standard is the room to
> grow."

**Key facts**
- The six cards map directly to Learn's "use Standard instead" rows and the
  "Considerations" section (HTTP-only, consumption CPU, opinionated defaults,
  focused feature set at launch).
- Express's supported-feature list is expanding throughout preview — check the
  live feature matrix in the overview before committing to a capability.

**Sources:** Learn overview (when to use + considerations + supported features).

---

## Slide 8 — "Try it today." (`get-started`)

**Talk track**
> "Express is in public preview, and you can have a container on a live URL in the
> time it took us to go through these slides. Create an app from one short form or
> the CLI, pick a preview region, and the docs have the live feature matrix so you
> always know what's supported."

**Presenter mechanic:** three CTA cards, each with a working link (they open in a
new tab). Cards are selectable if you want to walk them. A **scannable QR code**
(top-right, → `aka.ms/aca/express`) lets the audience jump to the docs from their
phones — call it out and give them a beat to scan.

**Key facts**
- **Public preview.** Regions: **West Central US** and **East Asia**, expanding.
- Managed through a dedicated UI at https://containerapps.azure.com/ (separate
  from the standard Azure portal).

**Sources:** Learn overview + FAQ.

---

### One-line close
> "Express is the front door to Azure Container Apps: get an app live in seconds,
> scale to zero, and grow into the full platform when you need it — without ever
> leaving the family."
