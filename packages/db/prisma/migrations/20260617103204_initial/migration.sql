-- CreateEnum
CREATE TYPE "CarTypes" AS ENUM ('brandNew', 'tokunbo', 'nigerianUsed', 'suvs', 'saloon', 'trucks', 'luxury', 'budget');

-- CreateEnum
CREATE TYPE "Plans" AS ENUM ('free', 'pro', 'vvip');

-- CreateEnum
CREATE TYPE "Platforms" AS ENUM ('whatsApp', 'facebook', 'instagram', 'twitter');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "address" TEXT,
    "phoneNumber" TEXT NOT NULL,
    "businessName" TEXT NOT NULL,
    "description" TEXT,
    "carTypes" "CarTypes"[],
    "monthlyStock" TEXT,
    "platforms" "Platforms"[],
    "plan" "Plans" NOT NULL DEFAULT 'free',
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_phoneNumber_key" ON "User"("phoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "User_businessName_key" ON "User"("businessName");
