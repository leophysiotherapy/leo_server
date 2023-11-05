-- CreateEnum
CREATE TYPE "roles" AS ENUM ('patient', 'admin', 'staff');

-- CreateEnum
CREATE TYPE "status" AS ENUM ('upcoming', 'done', 'finished', 'canceled');

-- CreateEnum
CREATE TYPE "platform" AS ENUM ('online', 'f2f');

-- CreateEnum
CREATE TYPE "notifStatus" AS ENUM ('read', 'unread');

-- CreateEnum
CREATE TYPE "inventory" AS ENUM ('equipment', 'supplies');

-- CreateTable
CREATE TABLE "user" (
    "userID" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "roles" NOT NULL,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "creatdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_pkey" PRIMARY KEY ("userID")
);

-- CreateTable
CREATE TABLE "services" (
    "servicesID" TEXT NOT NULL,
    "services" TEXT NOT NULL,
    "descriptions" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "services_pkey" PRIMARY KEY ("servicesID")
);

-- CreateTable
CREATE TABLE "otp" (
    "otpID" TEXT NOT NULL,
    "otp" TEXT NOT NULL,
    "expiredAt" TIMESTAMP NOT NULL,
    "createdAt" TIMESTAMP NOT NULL,

    CONSTRAINT "otp_pkey" PRIMARY KEY ("otpID")
);

-- CreateTable
CREATE TABLE "appointment" (
    "appointmentID" TEXT NOT NULL,
    "date" DATE NOT NULL,
    "time" TEXT NOT NULL,
    "services" TEXT,
    "platform" "platform" NOT NULL,
    "link" TEXT,
    "amount" INTEGER NOT NULL,
    "status" "status" NOT NULL DEFAULT 'upcoming',
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "feedbackID" TEXT,

    CONSTRAINT "appointment_pkey" PRIMARY KEY ("appointmentID")
);

-- CreateTable
CREATE TABLE "equipment" (
    "equipmentID" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "inventory" "inventory" NOT NULL,
    "description" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "expireDate" DATE NOT NULL,
    "creatdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "equipment_pkey" PRIMARY KEY ("equipmentID")
);

-- CreateTable
CREATE TABLE "blogs" (
    "blogsID" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "expertise" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "blogs_pkey" PRIMARY KEY ("blogsID")
);

-- CreateTable
CREATE TABLE "faqs" (
    "faqsID" TEXT NOT NULL,
    "faqs" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "creatdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "faqs_pkey" PRIMARY KEY ("faqsID")
);

-- CreateTable
CREATE TABLE "avatar" (
    "avatarID" TEXT NOT NULL,
    "avatar" TEXT NOT NULL,
    "creatdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "profileID" TEXT,

    CONSTRAINT "avatar_pkey" PRIMARY KEY ("avatarID")
);

-- CreateTable
CREATE TABLE "profile" (
    "profileID" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "designation" TEXT,
    "expertise" TEXT,
    "emergencyPhone" TEXT,
    "userID" TEXT,

    CONSTRAINT "profile_pkey" PRIMARY KEY ("profileID")
);

-- CreateTable
CREATE TABLE "diagnosis" (
    "diagnosisID" TEXT NOT NULL,
    "diagnosis" TEXT NOT NULL,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userID" TEXT,

    CONSTRAINT "diagnosis_pkey" PRIMARY KEY ("diagnosisID")
);

-- CreateTable
CREATE TABLE "presciption" (
    "prescriptionID" TEXT NOT NULL,
    "prescription" TEXT NOT NULL,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userID" TEXT,

    CONSTRAINT "presciption_pkey" PRIMARY KEY ("prescriptionID")
);

-- CreateTable
CREATE TABLE "feedback" (
    "feedbackID" TEXT NOT NULL,
    "feedback" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "creatdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "feedback_pkey" PRIMARY KEY ("feedbackID")
);

-- CreateTable
CREATE TABLE "_otpTouser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_appointmentTouser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_equipmentTouser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_blogsTouser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_faqsTouser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_feedbackTouser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "otp_otp_key" ON "otp"("otp");

-- CreateIndex
CREATE UNIQUE INDEX "avatar_profileID_key" ON "avatar"("profileID");

-- CreateIndex
CREATE UNIQUE INDEX "profile_userID_key" ON "profile"("userID");

-- CreateIndex
CREATE UNIQUE INDEX "_otpTouser_AB_unique" ON "_otpTouser"("A", "B");

-- CreateIndex
CREATE INDEX "_otpTouser_B_index" ON "_otpTouser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_appointmentTouser_AB_unique" ON "_appointmentTouser"("A", "B");

-- CreateIndex
CREATE INDEX "_appointmentTouser_B_index" ON "_appointmentTouser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_equipmentTouser_AB_unique" ON "_equipmentTouser"("A", "B");

-- CreateIndex
CREATE INDEX "_equipmentTouser_B_index" ON "_equipmentTouser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_blogsTouser_AB_unique" ON "_blogsTouser"("A", "B");

-- CreateIndex
CREATE INDEX "_blogsTouser_B_index" ON "_blogsTouser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_faqsTouser_AB_unique" ON "_faqsTouser"("A", "B");

-- CreateIndex
CREATE INDEX "_faqsTouser_B_index" ON "_faqsTouser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_feedbackTouser_AB_unique" ON "_feedbackTouser"("A", "B");

-- CreateIndex
CREATE INDEX "_feedbackTouser_B_index" ON "_feedbackTouser"("B");

-- AddForeignKey
ALTER TABLE "appointment" ADD CONSTRAINT "appointment_feedbackID_fkey" FOREIGN KEY ("feedbackID") REFERENCES "feedback"("feedbackID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "avatar" ADD CONSTRAINT "avatar_profileID_fkey" FOREIGN KEY ("profileID") REFERENCES "profile"("profileID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profile" ADD CONSTRAINT "profile_userID_fkey" FOREIGN KEY ("userID") REFERENCES "user"("userID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "diagnosis" ADD CONSTRAINT "diagnosis_userID_fkey" FOREIGN KEY ("userID") REFERENCES "user"("userID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "presciption" ADD CONSTRAINT "presciption_userID_fkey" FOREIGN KEY ("userID") REFERENCES "user"("userID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_otpTouser" ADD CONSTRAINT "_otpTouser_A_fkey" FOREIGN KEY ("A") REFERENCES "otp"("otpID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_otpTouser" ADD CONSTRAINT "_otpTouser_B_fkey" FOREIGN KEY ("B") REFERENCES "user"("userID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_appointmentTouser" ADD CONSTRAINT "_appointmentTouser_A_fkey" FOREIGN KEY ("A") REFERENCES "appointment"("appointmentID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_appointmentTouser" ADD CONSTRAINT "_appointmentTouser_B_fkey" FOREIGN KEY ("B") REFERENCES "user"("userID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_equipmentTouser" ADD CONSTRAINT "_equipmentTouser_A_fkey" FOREIGN KEY ("A") REFERENCES "equipment"("equipmentID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_equipmentTouser" ADD CONSTRAINT "_equipmentTouser_B_fkey" FOREIGN KEY ("B") REFERENCES "user"("userID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_blogsTouser" ADD CONSTRAINT "_blogsTouser_A_fkey" FOREIGN KEY ("A") REFERENCES "blogs"("blogsID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_blogsTouser" ADD CONSTRAINT "_blogsTouser_B_fkey" FOREIGN KEY ("B") REFERENCES "user"("userID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_faqsTouser" ADD CONSTRAINT "_faqsTouser_A_fkey" FOREIGN KEY ("A") REFERENCES "faqs"("faqsID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_faqsTouser" ADD CONSTRAINT "_faqsTouser_B_fkey" FOREIGN KEY ("B") REFERENCES "user"("userID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_feedbackTouser" ADD CONSTRAINT "_feedbackTouser_A_fkey" FOREIGN KEY ("A") REFERENCES "feedback"("feedbackID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_feedbackTouser" ADD CONSTRAINT "_feedbackTouser_B_fkey" FOREIGN KEY ("B") REFERENCES "user"("userID") ON DELETE CASCADE ON UPDATE CASCADE;
