/*
  Warnings:

  - The primary key for the `FavouredPosts` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "FavouredPosts" DROP CONSTRAINT "FavouredPosts_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "FavouredPosts_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "FavouredPosts_id_seq";
