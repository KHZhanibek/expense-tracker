/*
  Warnings:

  - You are about to drop the column `user_on_wallet_id` on the `expenses` table. All the data in the column will be lost.
  - Added the required column `wallet_id` to the `expenses` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "expenses" DROP CONSTRAINT "expenses_user_on_wallet_id_fkey";

-- AlterTable
ALTER TABLE "expenses" DROP COLUMN "user_on_wallet_id",
ADD COLUMN     "wallet_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "expenses" ADD CONSTRAINT "expenses_wallet_id_fkey" FOREIGN KEY ("wallet_id") REFERENCES "wallets"("id") ON DELETE CASCADE ON UPDATE CASCADE;
