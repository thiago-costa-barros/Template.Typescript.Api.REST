-- CreateTable
CREATE TABLE "externalsystem"."ExternalWebhookReceiver" (
    "ExternalWebhookReceiverId" SERIAL NOT NULL,
    "CreationDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdateDate" TIMESTAMP(3),
    "DeletionDate" TIMESTAMP(3),
    "RequestId" TEXT NOT NULL,
    "EventDate" TIMESTAMP(3) NOT NULL,
    "EventType" INTEGER NOT NULL,
    "Status" INTEGER NOT NULL,
    "Version" TEXT,
    "Payload" JSONB,
    "Type" INTEGER NOT NULL,
    "CreationUserId" INTEGER NOT NULL,
    "UpdateUserId" INTEGER,

    CONSTRAINT "ExternalWebhookReceiver_pkey" PRIMARY KEY ("ExternalWebhookReceiverId")
);

-- CreateIndex
CREATE UNIQUE INDEX "ExternalWebhookReceiver_RequestId_key" ON "externalsystem"."ExternalWebhookReceiver"("RequestId");
