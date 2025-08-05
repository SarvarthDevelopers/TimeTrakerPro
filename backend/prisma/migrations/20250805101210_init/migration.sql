/*
  Warnings:

  - The primary key for the `STATUSES` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `CONTEXT` on the `STATUSES` table. All the data in the column will be lost.
  - You are about to drop the column `CREATED_AT` on the `STATUSES` table. All the data in the column will be lost.
  - You are about to drop the column `ID` on the `STATUSES` table. All the data in the column will be lost.
  - You are about to drop the column `IS_FINAL` on the `STATUSES` table. All the data in the column will be lost.
  - You are about to drop the column `LABEL` on the `STATUSES` table. All the data in the column will be lost.
  - You are about to drop the column `VALUE` on the `STATUSES` table. All the data in the column will be lost.
  - Added the required column `context` to the `STATUSES` table without a default value. This is not possible if the table is not empty.
  - The required column `id` was added to the `STATUSES` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `value` to the `STATUSES` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."STATUSES" DROP CONSTRAINT "STATUSES_pkey",
DROP COLUMN "CONTEXT",
DROP COLUMN "CREATED_AT",
DROP COLUMN "ID",
DROP COLUMN "IS_FINAL",
DROP COLUMN "LABEL",
DROP COLUMN "VALUE",
ADD COLUMN     "context" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "isFinal" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "label" TEXT,
ADD COLUMN     "value" TEXT NOT NULL,
ADD CONSTRAINT "STATUSES_pkey" PRIMARY KEY ("id");
