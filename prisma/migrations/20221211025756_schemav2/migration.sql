/*
  Warnings:

  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - Added the required column `category` to the `Products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Products` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Products_sellerID_key";

-- AlterTable
ALTER TABLE "Products" ADD COLUMN     "category" TEXT NOT NULL,
ADD COLUMN     "description" VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "name",
ADD COLUMN     "firstname" TEXT,
ADD COLUMN     "lastname" TEXT;
