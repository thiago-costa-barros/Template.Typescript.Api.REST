/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request } from "express";
import { ExternalWebhookReceiverHotmartDTO } from "./ExternalWebhookReceiverControllerDTO";
import { ExternalWebhookReceiverService } from "../../services/externalWebhookReceiverServices/ExternalWebhookReceiverService";
import { ExternalWebhookReceiverRepository } from "../../repositories/externalWebhookReceiverRepositories/ExternalWebhookReceiverRepository";
import { VerifyHotmartToken } from "src/utils/VerifyExternalTokens";
import { AutoHandlerUserId } from "src/decorators/AutoHandlerUserId";
import { getHandlerUserId } from "src/utils/HandlerUser";

export class ExternalWebhookReceiverController {
  private service: ExternalWebhookReceiverService;
  private _methodName?: string;

  constructor() {
    const repository = new ExternalWebhookReceiverRepository();
    this.service = new ExternalWebhookReceiverService(repository);
  }

  @AutoHandlerUserId
  async CreateExternalWebhookReceiverHotmart(req: Request) {
    try {
      if (!VerifyHotmartToken(req)) {
        return {
          statusCode: 401,
          body: { error: "Token inválido" },
        };
      }
      
      const webhookData: ExternalWebhookReceiverHotmartDTO = req.body;
      const source: string | null = req.headers["user-agent"] || null;
      const handlerName = this._methodName as string;

      const userId = await getHandlerUserId(handlerName)

      // Validações básicas
      if (!webhookData.event || !webhookData.id) {
        return {
          statusCode: 422,
          body: { error: "Dados do webhook inválidos" },
        };
      }

      const existsExternalWebhookReceiver = await this.service.serviceGetExternalWebhookReceiverByRequestId(
          webhookData.id
        );
      if (existsExternalWebhookReceiver) {
        return {
          statusCode: 422,
          body: { error: "Webhook já processado" },
        };
      }

      // Processa via service
      const result =
        await this.service.serviceCreateExternalWebhookReceiverHotmart(
          webhookData,
          source,
          userId
        );

      return {
        statusCode: 200,
        body: { success: true, id: result.requestId},
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: { error: "Erro ao processar webhook" },
      };
    }
  }
}
