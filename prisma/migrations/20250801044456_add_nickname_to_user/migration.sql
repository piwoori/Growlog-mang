/*
  Warnings:

  - A unique constraint covering the columns `[nickname]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "nickname" TEXT NOT NULL DEFAULT 'user';

-- CreateIndex
CREATE UNIQUE INDEX "User_nickname_key" ON "User"("nickname");
