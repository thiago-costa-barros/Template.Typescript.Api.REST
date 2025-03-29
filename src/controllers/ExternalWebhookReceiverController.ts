/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request } from "express";
import { ExternalWebhookReceiverHotmartDTO } from "./ExternalWebhookReceiverControllerDTO";
import { ExternalWebhookReceiverService } from "../services/ExternalWebhookReceiverService";
import { ExternalWebhookReceiverRepository } from "../repositories/ExternalWebhookReceiverRepository";
import { VerifyHotmartToken } from "src/utils/VerifyExternalTokens";
import { AutoHandlerUserId } from "src/decorators/AutoHandlerUserId";
import { getHandlerUserId } from "src/utils/HandlerUser";
import {
  CustomError,
  InternalServerError,
  UnauthorizedError,
  UnprocessableEntityError,
} from "src/errors/CustomError";

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
      if (!VerifyHotmartToken(req))
        throw new UnauthorizedError("Hotmart Token Inválido");

      const webhookData: ExternalWebhookReceiverHotmartDTO = req.body;
      const source: string | null = req.headers["user-agent"] || null;
      const handlerName = this._methodName as string;

      const userId = await getHandlerUserId(handlerName);

      // Validações básicas
      if (!webhookData.event || !webhookData.id)
        throw new UnprocessableEntityError("Dados do webhook inválidos");

      const existsExternalWebhookReceiver =
        await this.service.serviceGetExternalWebhookReceiverByRequestId(
          webhookData.id
        );
      if (existsExternalWebhookReceiver)
        throw new UnprocessableEntityError("Webhook já processado");

      // Processa via service
      const result =
        await this.service.serviceCreateExternalWebhookReceiverHotmart(
          webhookData,
          source,
          userId
        );

      return {
        sucess: true,
        statusCode: 200,
        message: "Webhook processado com sucesso",
        data: webhookData,
      };
    } catch (error) {
      // Não encapsule erros customizados em InternalServerError
      if (error instanceof CustomError) {
        throw error;
      }
      throw new InternalServerError(
        "Ocorreu um erro inesperado no servidor",
        error
      );
    }
  }
}
