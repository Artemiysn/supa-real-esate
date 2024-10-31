For local development
===========

1. pnpm i
2. docker compose up (for db currently)
3. create .env with following content (generate google credentials in google studio website)

```
NODE_ENV="development"
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/time_demo_dev"
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
```

4. pnpx prisma generate && pnpx prisma migrate dev

Prisma commands
===============


pnpx prisma migrate dev - creating migration

pnpx prisma db push - to update db from updated schema (withoutn migration)

pnpx prisma db seed - run seed.js

pnpx prisma studio - run web client for db management
