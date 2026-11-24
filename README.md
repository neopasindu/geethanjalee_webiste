# Geethanjalee Live in Concert 2026

Official full-stack web application for **Geethanjalee Live in Concert 2026**, proudly presented by the Science Students' Union of the University of Peradeniya in association with M Premium Entertainment.

Built as a monorepo with a **React + Vite + Tailwind CSS** frontend and a **NestJS** REST API backend.

---

## Tech Stack

### Frontend (`frontend/`)
- **React 19** + **TypeScript**
- **Vite 6** (fast dev server with `/api` proxy and production bundling)
- **Tailwind CSS 3** (custom gold/dark concert theme, animations, responsive layout)
- **Lenis** (smooth scrolling)
- **Remix Icon** & **Lucide React** (icons)
- **Framer Motion**

### Backend (`backend/`)
- **NestJS 11** + **TypeScript**
- **class-validator** & **class-transformer** (request DTO validation)
- Modular architecture (`ConcertModule`, `ReservationsModule`)
- File-backed JSON persistence (`backend/data/reservations.json`) for pass reservations

---

## Project Structure

```text
Geethanjalee/
├── backend/                          # NestJS REST API
│   ├── src/
│   │   ├── concert/                  # Concert config, tracks, schedule, artists, tickets, gallery
│   │   │   ├── concert.controller.ts
│   │   │   ├── concert.data.ts
│   │   │   ├── concert.module.ts
│   │   │   ├── concert.service.ts
│   │   │   └── concert.types.ts
│   │   ├── reservations/             # Ticket pass reservation endpoints & validation
│   │   │   ├── dto/create-reservation.dto.ts
│   │   │   ├── reservations.controller.ts
│   │   │   ├── reservations.module.ts
│   │   │   └── reservations.service.ts
│   │   ├── app.controller.ts         # Health check endpoint
│   │   ├── app.module.ts
│   │   └── main.ts                   # App bootstrap, CORS, ValidationPipe, /api prefix
│   ├── .env.example
│   ├── nest-cli.json
│   ├── package.json
│   └── tsconfig.json
├── frontend/                         # React + Vite SPA
│   ├── public/                       # Static concert images, logos, artist photos, pass art
│   ├── src/
│   │   ├── components/               # UI sections (Hero, AudioPlayer, Schedule, Artists, Tickets, etc.)
│   │   ├── constants/                # Navigation & fallback concert data
│   │   ├── hooks/                    # useConcertData hook
│   │   ├── lib/                      # Utility helpers (cn, formatTime)
│   │   ├── services/                 # Typed API client (concertApi)
│   │   ├── types/                    # Shared TypeScript interfaces
│   │   ├── App.tsx
│   │   ├── index.css
│   │   └── main.tsx
│   ├── .env.example
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.ts
│   └── vite.config.ts
├── package.json                      # Root monorepo scripts
└── README.md
```

---

## Prerequisites

- **Node.js** `>= 20.x`
- **npm** `>= 10.x`

---

## Getting Started

### 1. Install dependencies

From the repository root, install dependencies for the root workspace, backend, and frontend:

```bash
npm run install:all
```

### 2. Configure environment variables (optional)

Both apps work out of the box with sensible defaults. If you want to customize ports or origins:

- Copy `backend/.env.example` to `backend/.env`:
  ```env
  PORT=4000
  CORS_ORIGIN=http://localhost:5173
  ```
- Copy `frontend/.env.example` to `frontend/.env`:
  ```env
  VITE_API_URL=/api
  ```
  *(In development, Vite automatically proxies `/api` requests to `http://localhost:4000`.)*

### 3. Run in development mode

Start both the **NestJS backend** (`http://localhost:4000/api`) and the **React frontend** (`http://localhost:5173`) concurrently:

```bash
npm run dev
```

Or run them separately in two terminals:

```bash
# Terminal 1 — NestJS API
npm run dev:backend

# Terminal 2 — React (Vite) Frontend
npm run dev:frontend
```

---

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run install:all` | Install dependencies in root, `backend/`, and `frontend/` |
| `npm run dev` | Run both NestJS backend (watch mode) and Vite frontend concurrently |
| `npm run dev:backend` | Run NestJS API in watch mode on port `4000` |
| `npm run dev:frontend` | Run Vite React dev server on port `5173` |
| `npm run build` | Build both backend (`backend/dist`) and frontend (`frontend/dist`) |
| `npm run build:backend` | Compile NestJS backend for production |
| `npm run build:frontend` | Type-check and bundle React frontend for production |
| `npm run start:backend` | Start compiled NestJS backend (`node dist/main`) |
| `npm run preview:frontend` | Preview production frontend build locally |

---

## API Reference

All backend routes are prefixed with `/api`.

### Health
| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/api/health` | Service health check |

### Concert Data
| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/api/concert/overview` | Full concert payload (config, tracks, schedule, artists, tickets, gallery, achievements) |
| `GET` | `/api/concert/config` | Site metadata, hero slides, social links, and partners |
| `GET` | `/api/concert/tracks` | Featured concert audio tracks |
| `GET` | `/api/concert/schedule` | Concert tour dates & venues |
| `GET` | `/api/concert/artists` | Headline artists & live band profiles |
| `GET` | `/api/concert/artists/:id` | Single artist profile by ID (`yuki`, `umaria`, `ravijay`, `romesh`, `news`) |
| `GET` | `/api/concert/tickets` | Concert pass tiers (`admiral`, `captain`, `commander`, `lieutenant`) |
| `GET` | `/api/concert/gallery` | Concert photo gallery items |
| `GET` | `/api/concert/achievements` | Official partners & sponsors marquee items |

### Ticket Reservations
| Method | Endpoint | Description |
| --- | --- | --- |
| `POST` | `/api/reservations` | Create a new pass reservation (returns a unique `GEETH-2026-XXXX` reference code) |
| `GET` | `/api/reservations` | List all recorded reservations |
| `GET` | `/api/reservations/:referenceCode` | Look up a reservation by reference code |

#### Example `POST /api/reservations` Request

```json
{
  "passId": "admiral",
  "quantity": 2,
  "fullName": "Kasun Perera",
  "phone": "+94 77 123 4567",
  "email": "kasun@example.com"
}
```

#### Example `201 Created` Response

```json
{
  "id": "c7a1f3d2-...",
  "referenceCode": "GEETH-2026-K9M4",
  "passId": "admiral",
  "passTitle": "Admiral's Pass",
  "unitPrice": 5000,
  "quantity": 2,
  "totalAmount": 10000,
  "currency": "LKR",
  "fullName": "Kasun Perera",
  "phone": "+94 77 123 4567",
  "email": "kasun@example.com",
  "status": "pending_payment",
  "createdAt": "2026-11-24T13:15:00.000Z"
}
```

Reservations are stored in `backend/data/reservations.json` (git-ignored) so they persist across server restarts without requiring an external database. You can swap `ReservationsService` to PostgreSQL/Prisma or MongoDB whenever you are ready for production scale.

---

## Production Build

```bash
npm run build
```

- **Backend output:** `backend/dist/` — start with `npm run start:backend` (set `PORT` and `CORS_ORIGIN` in environment).
- **Frontend output:** `frontend/dist/` — serve as static files (e.g., Nginx, Vercel, Netlify, or Cloudflare Pages) with `VITE_API_URL` pointing to your deployed NestJS API URL (e.g., `https://api.geethanjalee.lk/api`).
