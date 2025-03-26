import { ExternalWebhookReceiverHotmartDTO } from "src/controllers/ExternalWebhookReceiverControllerDTO";
import { ExternalWebhookReceiverRepository } from "src/repositories/ExternalWebhookReceiverRepository";
import {
  ExternalWebhookReceiverEventType,
  ExternalWebhookReceiverSourceType,
  ExternalWebhookReceiverStatus,
} from "src/utils/PublicEnum";

export class ExternalWebhookReceiverService {
  constructor(private readonly repository: ExternalWebhookReceiverRepository) {}

  async serviceCreateExternalWebhookReceiverHotmart(
    dto: ExternalWebhookReceiverHotmartDTO,
    source: string | null,
    userId: number
  ) {
    // Converte o evento para o valor numérico
    const eventType = ExternalWebhookReceiverEventType.fromName(dto.event);
    const sourceType = ExternalWebhookReceiverSourceType.fromName(source);
    const status = ExternalWebhookReceiverStatus.Created;

    // Prepara os dados para o repositório
    const repositoryData = {
      ...dto,
      event: eventType.value,
      source: sourceType.value,
      status: status,
      userId: userId,
    };

    return this.repository.createExternalWebhookReceiverHotmart(repositoryData);
  }

  async serviceGetExternalWebhookReceiverByRequestId(requestId: string) {
    return this.repository.getExternalWebhookReceiverByRequestId(requestId);
  }
}
