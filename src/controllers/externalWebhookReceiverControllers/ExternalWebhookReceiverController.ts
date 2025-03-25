/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request } from "express";
import { ExternalWebhookReceiverHotmartDTO } from "./ExternalWebhookReceiverControllerDTO";
import { ExternalWebhookReceiverService } from "../../services/externalWebhookReceiverServices/ExternalWebhookReceiverService";
import { ExternalWebhookReceiverRepository } from "../../repositories/externalWebhookReceiverRepositories/ExternalWebhookReceiverRepository";

export class ExternalWebhookReceiverController {
  private service: ExternalWebhookReceiverService;

  constructor() {
    const repository = new ExternalWebhookReceiverRepository();
    this.service = new ExternalWebhookReceiverService(repository);
  }

  async CreateExternalWebhookReceiverHotmartWebhook(req: Request) {
    try {
      const webhookData: ExternalWebhookReceiverHotmartDTO = req.body;
      const source: string | null = req.headers["user-agent"] || null;
      
      // Validações básicas
      if (!webhookData.event || !webhookData.id) {
        return { 
          statusCode: 422, 
          body: { error: "Dados do webhook inválidos" } 
        };
      }

      // Processa via service
      const result = await this.service.processNewExternalWebhookReceiverHotmart(webhookData, source);

      return { 
        statusCode: 200, 
        body: { success: true, id: result.requestId } 
      };
    } catch (error) {
      return { 
        statusCode: 500, 
        body: { error: "Erro ao processar webhook" } 
      };
    }
  }
}