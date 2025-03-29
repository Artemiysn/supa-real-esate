Demo
=========

http://srv768196.hstgr.cloud:3000/

For local development (you don't need docker)
===========

``` pnpm i ```

create .env with following content (generate google credentials with google cloud studio website!)

```
NODE_ENV="development"
DATABASE_URL="file:./data/dev.db"
GOOGLE_CLIENT_ID="put generated code here from google web site"
GOOGLE_CLIENT_SECRET="put generated code here"
NEXTAUTH_SECRET="generate secret here - any string works"
```

``` pnpx prisma generate && pnpx prisma migrate dev ``` - this will create db file!

``` pnpm run dev ``` - you are good to go

login using google (this will create first user), then u can use seed script if you want to

Prisma commands
===============


``` pnpx prisma migrate dev ``` - creating migration

``` pnpx prisma db push ``` - to update db from updated schema (withoutn migration)

``` pnpx prisma db seed ``` - run seed.js

``` pnpx prisma studio ``` - run web client for db management


Trying docker locally
=====

for running Docker local (Docker is only needed for deployment):

``` docker build -t supa-estate-i . ```

Then:

```

docker run -d -p 3000:3000 -v D:\Portfolio\supa-real-estate\prisma\data:/app/data -e DATABASE_URL="file:./data/dev.db" --name supa-estate-c --restart always supa-estate-i 

```

put your full address to db  file HERE: D:\Portfolio\supa-real-estate\prisma\data

Then: ``` docker start supa-estate-c ```

Check logs: ``` docker logs --follow supa-estate-c ```

if you need to open terminal inside container: ``` docker exec -it supa-estate-c sh ```

==========

for deployment remove any "" in .env files!
