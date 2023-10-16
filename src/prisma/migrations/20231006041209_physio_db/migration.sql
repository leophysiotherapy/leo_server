/*
  Warnings:

  - You are about to drop the column `advice` on the `presciption` table. All the data in the column will be lost.
  - You are about to drop the column `amount` on the `presciption` table. All the data in the column will be lost.
  - You are about to drop the column `dose` on the `presciption` table. All the data in the column will be lost.
  - You are about to drop the `_notificationTouser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `notification` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `inventory` to the `equipment` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "inventory" AS ENUM ('equipment', 'supplies');

-- DropForeignKey
ALTER TABLE "_notificationTouser" DROP CONSTRAINT "_notificationTouser_A_fkey";

-- DropForeignKey
ALTER TABLE "_notificationTouser" DROP CONSTRAINT "_notificationTouser_B_fkey";

-- AlterTable
ALTER TABLE "equipment" ADD COLUMN     "inventory" "inventory" NOT NULL;

-- AlterTable
ALTER TABLE "presciption" DROP COLUMN "advice",
DROP COLUMN "amount",
DROP COLUMN "dose";

-- DropTable
DROP TABLE "_notificationTouser";

-- DropTable
DROP TABLE "notification";
