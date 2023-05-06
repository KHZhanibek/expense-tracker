/*
  Warnings:

  - Added the required column `ownerId` to the `wallets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "wallets" ADD COLUMN     "ownerId" INTEGER NOT NULL;
