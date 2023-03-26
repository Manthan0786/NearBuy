/*
  Warnings:

  - Added the required column `location` to the `Seller` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Seller" ADD COLUMN     "location" JSON NOT NULL;
