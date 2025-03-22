-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "coresystem";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "externalsystem";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "integrationsystem";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "servicesystem";

-- CreateTable
CREATE TABLE "coresystem"."User" (
    "UserId" SERIAL NOT NULL,
    "Username" TEXT NOT NULL,
    "email" TEXT,
    "FirstName" TEXT,
    "LastName" TEXT,
    "Password" TEXT NOT NULL,
    "IsStaff" BOOLEAN NOT NULL DEFAULT false,
    "IsAdmin" BOOLEAN NOT NULL DEFAULT false,
    "IsActive" BOOLEAN NOT NULL DEFAULT true,
    "LastLogin" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "DeletionDate" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("UserId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "coresystem"."User"("email");
