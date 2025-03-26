-- CreateTable
CREATE TABLE "integrationsystem"."UserToken" (
    "TokenId" SERIAL NOT NULL,
    "UserId" INTEGER NOT NULL,
    "Token" TEXT NOT NULL,
    "Type" INTEGER NOT NULL,
    "ExpiresAt" TIMESTAMP(3) NOT NULL,
    "Status" INTEGER NOT NULL,
    "RevokedAt" TIMESTAMP(3),
    "CreationDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdateDate" TIMESTAMP(3),
    "DeletionDate" TIMESTAMP(3),
    "CreationUserId" INTEGER NOT NULL,
    "UpdateUserId" INTEGER,

    CONSTRAINT "UserToken_pkey" PRIMARY KEY ("TokenId")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserToken_Token_key" ON "integrationsystem"."UserToken"("Token");

-- CreateIndex
CREATE INDEX "UserToken_UserId_DeletionDate_idx" ON "integrationsystem"."UserToken"("UserId", "DeletionDate");

-- CreateIndex
CREATE INDEX "UserToken_Type_DeletionDate_idx" ON "integrationsystem"."UserToken"("Type", "DeletionDate");

-- CreateIndex
CREATE INDEX "UserToken_ExpiresAt_DeletionDate_idx" ON "integrationsystem"."UserToken"("ExpiresAt", "DeletionDate");

-- AddForeignKey
ALTER TABLE "integrationsystem"."UserToken" ADD CONSTRAINT "UserToken_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "coresystem"."User"("UserId") ON DELETE RESTRICT ON UPDATE CASCADE;
