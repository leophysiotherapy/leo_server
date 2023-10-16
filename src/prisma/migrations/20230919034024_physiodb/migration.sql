/*
  Warnings:

  - You are about to drop the `form` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `rating` to the `feedback` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "appointment" ADD COLUMN     "feedbackID" TEXT;

-- AlterTable
ALTER TABLE "feedback" ADD COLUMN     "rating" INTEGER NOT NULL;

-- DropTable
DROP TABLE "form";

-- AddForeignKey
ALTER TABLE "appointment" ADD CONSTRAINT "appointment_feedbackID_fkey" FOREIGN KEY ("feedbackID") REFERENCES "feedback"("feedbackID") ON DELETE SET NULL ON UPDATE CASCADE;
