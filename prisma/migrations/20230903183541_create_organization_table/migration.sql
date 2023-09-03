-- CreateTable
CREATE TABLE "organizations" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "responsablePerson" TEXT NOT NULL,
    "postCode" TEXT NOT NULL,
    "Address" TEXT NOT NULL,
    "whatsapp" TEXT NOT NULL,

    CONSTRAINT "organizations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "organizations_email_key" ON "organizations"("email");
