-- CreateEnum
CREATE TYPE "PostType" AS ENUM ('rent', 'sell');

-- CreateEnum
CREATE TYPE "PropertyType" AS ENUM ('apartment', 'house');

-- CreateTable
CREATE TABLE "Posts" (
    "id" BIGSERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "price" INTEGER NOT NULL,
    "address" VARCHAR(255) NOT NULL,
    "description" VARCHAR(1000) NOT NULL,
    "type" "PostType" NOT NULL,
    "property" "PropertyType" NOT NULL,
    "city" VARCHAR(255) NOT NULL,
    "area" INTEGER NOT NULL,
    "kitchen" INTEGER NOT NULL,
    "floor" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,

    CONSTRAINT "Posts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Posts_city_idx" ON "Posts"("city");

-- CreateIndex
CREATE INDEX "Posts_area_idx" ON "Posts"("area");

-- CreateIndex
CREATE INDEX "Posts_price_idx" ON "Posts"("price");

-- CreateIndex
CREATE INDEX "User_name_idx" ON "User"("name");

-- AddForeignKey
ALTER TABLE "Posts" ADD CONSTRAINT "Posts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
