# Server

An optional FastAPI layer for server-backed demos inside the deck. The current
Azure Container Apps Express slides are fully client-side and do not use it, so
you only need this if you add a slide that calls a backend, or when running
local file exports (PDF and PowerPoint).

CORS is open for demo convenience. This is not a production-grade setup.

## Get started

Set up with uv:

```pwsh
uv sync
```

Start the server (dev mode):

```pwsh
uv run fastapi dev
```

It runs at http://localhost:8000 and the client picks it up automatically, no
config needed.

## Structure

Keeping it simple:

- Shared utils live in `src/utils`
- Routes live in `src/router`
- `main.py` is the entry point where routes are registered

To add a demo endpoint, create a route under `src/router`, register it in
`main.py`, then call it from your slide via the client helpers in
`src/lib/api.ts`.

