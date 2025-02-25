-- AlterTable
ALTER TABLE "User" ADD CONSTRAINT "User_pkey" PRIMARY KEY ("username");

-- CreateTable
CREATE TABLE "Person" (
    "id" TEXT NOT NULL,
    "name" CHAR(80) NOT NULL,
    "nickname" CHAR(80) NOT NULL,

    CONSTRAINT "Person_pkey" PRIMARY KEY ("id")
);
