import { ExternalWebhookReceiver, Prisma } from "@prisma/client";
import { prisma } from "@lib/prisma";
import { UserService } from "src/services/userServices/UserService";
import { UserRepository } from "../userRepositories/UserRepository";

export class ExternalWebhookReceiverRepository {
  private userService: UserService;

  constructor() {
    this.userService = new UserService(new UserRepository());
  }

  async createExternalWebhookReceiverHotmart(data: {
    id: string;
    creation_date: bigint;
    event: number;
    version: string;
    source: number;
    data: Prisma.InputJsonValue;
    status: number;
  }): Promise<ExternalWebhookReceiver> {
    if (!prisma) {
      throw new Error("Prisma is not initialized");
    }

    return prisma.externalWebhookReceiver.create({
      data: {
        requestId: data.id,
        eventDate: new Date(Number(data.creation_date)),
        eventType: data.event,
        version: data.version,
        sourceType: data.source,
        payload: data.data,
        status: data.status,
        creationUserId: 0,
      },
    });
  }

  async getExternalWebhookReceiverByRequestId(
    requestId: string
  ): Promise<ExternalWebhookReceiver | null> {
    if (!prisma) {
      throw new Error("Prisma is not initialized");
    }

    return prisma.externalWebhookReceiver.findUnique({
      where: { requestId: requestId, deletionDate: null },
    });
  }
}
