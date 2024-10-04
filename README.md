For local development:

1. pnpm i
2. docker compose up
3. create .env with following content

NODE_ENV="development"
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/time_demo_dev"
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""

4. pnpx prisma generate && pnpx prisma migrate dev

============

pnpx prisma migrate dev - creating migration

pnpx prisma db push - to update db from updated schema
