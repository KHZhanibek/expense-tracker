-- DropForeignKey
ALTER TABLE "expenses" DROP CONSTRAINT "expenses_wallet_id_fkey";

-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_expense_id_fkey";

-- DropForeignKey
ALTER TABLE "users_on_wallets" DROP CONSTRAINT "users_on_wallets_user_id_fkey";

-- DropForeignKey
ALTER TABLE "users_on_wallets" DROP CONSTRAINT "users_on_wallets_wallet_id_fkey";

-- AddForeignKey
ALTER TABLE "users_on_wallets" ADD CONSTRAINT "users_on_wallets_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_on_wallets" ADD CONSTRAINT "users_on_wallets_wallet_id_fkey" FOREIGN KEY ("wallet_id") REFERENCES "wallets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "expenses" ADD CONSTRAINT "expenses_wallet_id_fkey" FOREIGN KEY ("wallet_id") REFERENCES "wallets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_expense_id_fkey" FOREIGN KEY ("expense_id") REFERENCES "expenses"("id") ON DELETE CASCADE ON UPDATE CASCADE;
