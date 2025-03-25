import { ExternalWebhookReceiverHotmartDTO } from "src/controllers/externalWebhookReceiverControllers/ExternalWebhookReceiverControllerDTO";
import { ExternalWebhookReceiverRepository } from "src/repositories/externalWebhookReceiverRepositories/ExternalWebhookReceiverRepository";
import { ExternalWebhookReceiverEventType, ExternalWebhookReceiverSourceType, ExternalWebhookReceiverStatus } from "src/utils/PublicEnum";

export class ExternalWebhookReceiverService {
  constructor(private readonly repository: ExternalWebhookReceiverRepository) {}

  async processNewExternalWebhookReceiverHotmart(dto: ExternalWebhookReceiverHotmartDTO, source: string | null) {
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
    };

    return this.repository.createExternalWebhookReceiverHotmart(repositoryData);
  }
}
