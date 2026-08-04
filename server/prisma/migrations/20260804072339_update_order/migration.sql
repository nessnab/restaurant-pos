/*
  Warnings:

  - A unique constraint covering the columns `[restaurantId,orderDate,orderNumber]` on the table `orders` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `orderDate` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `orderNumber` on the `orders` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropIndex
DROP INDEX "orders_orderNumber_key";

-- DropIndex
DROP INDEX "orders_restaurantId_orderNumber_key";

-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "orderDate" DATE NOT NULL,
DROP COLUMN "orderNumber",
ADD COLUMN     "orderNumber" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "orders_restaurantId_orderDate_orderNumber_key" ON "orders"("restaurantId", "orderDate", "orderNumber");
