For local development
===========

1. pnpm i
3. create .env with following content (generate google credentials in google studio website)

```
NODE_ENV="development"
DATABASE_URL="file:./data/dev.db"
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
NEXTAUTH_SECRET="generate secret here"
```

4. pnpx prisma generate && pnpx prisma migrate dev

Prisma commands
===============


pnpx prisma migrate dev - creating migration

pnpx prisma db push - to update db from updated schema (withoutn migration)

pnpx prisma db seed - run seed.js

pnpx prisma studio - run web client for db management
