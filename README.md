
# mobile-magic-proto

Tech stack
- Next.js frontend with Clerk for authentication
- Prisma (SQLite) for persistent metadata (easy to swap to Postgres)
- Redis + BullMQ for job queueing (local Redis required)
- Worker process that calls Gemini Flash 2.0 (placeholder wiring) to get a plan
- Handlebars-based serializer that produces a small web app and zips it (artifact)
- Artifacts stored on the local filesystem (`/artifacts`) for easy download



## Features implemented
- Auth: Clerk (Next.js integration) wired (you must add Clerk keys)
- DB: Prisma + SQLite (file: ./prisma/dev.db)
- Queue: Redis (use local Redis server) + BullMQ
- LLM: Gemini Flash 2.0 wiring provided (set `GEMINI_API_KEY`); defaults to a mock planner if not set
- Worker: `node worker/index.js` processes jobs, generates artifacts and updates job status
- Dev scripts for local run and simple CI-friendly setup

## Quick start (local)

Requirements:
- Node.js 18+
- Redis running locally (default `redis://127.0.0.1:6379`)
- Optional: Clerk account and publishable/secret keys (for real auth)
- Optional: Gemini API key if you want real LLM responses



