-- CreateIndex
CREATE INDEX "ExternalWebhookReceiver_RequestId_idx" ON "externalsystem"."ExternalWebhookReceiver"("RequestId");

-- CreateIndex
CREATE INDEX "ExternalWebhookReceiver_EventDate_idx" ON "externalsystem"."ExternalWebhookReceiver"("EventDate");

-- CreateIndex
CREATE INDEX "ExternalWebhookReceiver_CreationDate_idx" ON "externalsystem"."ExternalWebhookReceiver"("CreationDate");

-- CreateIndex
CREATE INDEX "ExternalWebhookReceiver_UpdateDate_idx" ON "externalsystem"."ExternalWebhookReceiver"("UpdateDate");

-- CreateIndex
CREATE INDEX "ExternalWebhookReceiver_DeletionDate_idx" ON "externalsystem"."ExternalWebhookReceiver"("DeletionDate");
