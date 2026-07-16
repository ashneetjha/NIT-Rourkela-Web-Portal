# Installation Guide

## Prerequisites

- Node.js 22
- pnpm 9+
- MongoDB Atlas account if you want persistent database storage

## Local setup

1. Install dependencies:

   ```bash
   pnpm install
   ```

2. Copy the environment template:

   ```bash
   cp .env.example .env
   ```

3. Update `.env` with your values:

   - `JWT_SECRET`: strong random secret
   - `MONGODB_URI`: MongoDB Atlas connection string
   - `MONGODB_DB`: database name, default `msms`

4. Seed the demo accounts and records:

   ```bash
   pnpm seed
   ```

5. Start development:

   ```bash
   pnpm dev
   ```

## Expected local URLs

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:4000`
- Health API: `http://localhost:4000/api/health`

## Demo accounts

- `admin@nitr.edu` / `Password123!`
- `coordinator@nitr.edu` / `Password123!`
- `faculty@nitr.edu` / `Password123!`

## Troubleshooting

- If login fails, confirm the backend is running and the frontend is using `VITE_API_BASE_URL=http://localhost:4000/api`.
- If MongoDB is unavailable, the backend still boots using the seeded in-memory store.
- If you change schemas, rerun the seed script to refresh the demo records.
