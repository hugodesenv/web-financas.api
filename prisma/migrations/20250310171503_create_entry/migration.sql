-- CreateEnum
CREATE TYPE "CategoryType" AS ENUM ('REVENUE', 'EXPENSE');

-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "type" "CategoryType" NOT NULL DEFAULT 'EXPENSE';

-- CreateTable
CREATE TABLE "Entry" (
    "id" TEXT NOT NULL,
    "created_at" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "issue_date" DATE NOT NULL,
    "fk_user" TEXT NOT NULL,
    "fk_category" TEXT NOT NULL,
    "gross_value" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "fk_person" TEXT NOT NULL,

    CONSTRAINT "Entry_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Entry" ADD CONSTRAINT "Entry_fk_user_fkey" FOREIGN KEY ("fk_user") REFERENCES "User"("username") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Entry" ADD CONSTRAINT "Entry_fk_category_fkey" FOREIGN KEY ("fk_category") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Entry" ADD CONSTRAINT "Entry_fk_person_fkey" FOREIGN KEY ("fk_person") REFERENCES "Person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
