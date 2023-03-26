/*
  Warnings:

  - You are about to drop the column `location` on the `Seller` table. All the data in the column will be lost.
  - Added the required column `location` to the `Products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Products" ADD COLUMN     "location" JSONB NOT NULL;

-- AlterTable
ALTER TABLE "Seller" DROP COLUMN "location";
