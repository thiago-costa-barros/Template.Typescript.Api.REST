/*
  Warnings:

  - You are about to drop the column `createdAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[Email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `UpdateDate` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "coresystem"."User_email_key";

-- AlterTable
ALTER TABLE "coresystem"."User" DROP COLUMN "createdAt",
DROP COLUMN "email",
DROP COLUMN "updatedAt",
ADD COLUMN     "CreationDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "Email" TEXT,
ADD COLUMN     "UpdateDate" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_Email_key" ON "coresystem"."User"("Email");
