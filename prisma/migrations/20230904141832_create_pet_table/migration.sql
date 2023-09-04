-- CreateEnum
CREATE TYPE "Age" AS ENUM ('Newborn', 'Child', 'Young', 'Adult', 'Senior', 'Elderly');

-- CreateEnum
CREATE TYPE "Size" AS ENUM ('Tiny', 'Miniature', 'Medium', 'Standard', 'Large', 'Colossal');

-- CreateEnum
CREATE TYPE "EnergyLevel" AS ENUM ('Low', 'Moderate', 'Average', 'High', 'Intense');

-- CreateEnum
CREATE TYPE "IndependenceLevel" AS ENUM ('Dependent', 'Partially', 'Moderately', 'Mostly', 'Fully');

-- CreateEnum
CREATE TYPE "PhysicalSpace" AS ENUM ('Small', 'Medium', 'Large', 'Huge');

-- CreateEnum
CREATE TYPE "Availability" AS ENUM ('Available', 'Reserved', 'Unavailable');

-- CreateTable
CREATE TABLE "pets" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "age" "Age" NOT NULL,
    "size" "Size" NOT NULL,
    "energyLevel" "EnergyLevel" NOT NULL,
    "independenceLevel" "IndependenceLevel" NOT NULL,
    "physicalSpace" "PhysicalSpace" NOT NULL,
    "availability" "Availability" NOT NULL,
    "organizationId" TEXT NOT NULL,

    CONSTRAINT "pets_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
