/*
  Warnings:

  - You are about to drop the column `wallet_id` on the `expenses` table. All the data in the column will be lost.
  - Added the required column `user_on_wallet_id` to the `expenses` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "expenses" DROP CONSTRAINT "expenses_wallet_id_fkey";

-- AlterTable
ALTER TABLE "expenses" DROP COLUMN "wallet_id",
ADD COLUMN     "user_on_wallet_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "expenses" ADD CONSTRAINT "expenses_user_on_wallet_id_fkey" FOREIGN KEY ("user_on_wallet_id") REFERENCES "users_on_wallets"("id") ON DELETE CASCADE ON UPDATE CASCADE;
