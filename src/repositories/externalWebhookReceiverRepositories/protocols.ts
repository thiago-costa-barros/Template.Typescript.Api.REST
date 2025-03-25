import { ExternalWebhookReceiver } from "@prisma/client";
import { ExternalWebhookReceiverHotmartDTO } from "src/controllers/externalWebhookReceiverControllers/ExternalWebhookReceiverControllerDTO";

export interface ICreateExternalWebhookReceiverHotmartRepository {
  createExternalReceiverWebhookHotmart(
    externalReceiverWebhookHotmartData: ExternalWebhookReceiverHotmartDTO
  ): Promise<ExternalWebhookReceiver>;
}
