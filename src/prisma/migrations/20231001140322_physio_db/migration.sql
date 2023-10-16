/*
  Warnings:

  - Added the required column `image` to the `blogs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "blogs" ADD COLUMN     "image" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "diagnosis" (
    "diagnosisID" TEXT NOT NULL,
    "diagnosis" TEXT NOT NULL,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userID" TEXT,

    CONSTRAINT "diagnosis_pkey" PRIMARY KEY ("diagnosisID")
);

-- AddForeignKey
ALTER TABLE "diagnosis" ADD CONSTRAINT "diagnosis_userID_fkey" FOREIGN KEY ("userID") REFERENCES "user"("userID") ON DELETE SET NULL ON UPDATE CASCADE;
