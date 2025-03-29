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

=====

for running Docker local

docker build -t supa-estate-i .

docker run -d -p 3000:3000 -v D:\Portfolio\supa-real-estate\prisma\data:/app/data -e DATABASE_URL="file:./data/dev.db" --name supa-estate-c --restart always supa-estate-i 

put your address to db  file HERE: D:\Portfolio\supa-real-estate\prisma\data

Then: 

docker start supa-estate-c

Check logs: docker logs --follow supa-estate-c

open terminal inside container docker exec -it supa-estate-c sh
