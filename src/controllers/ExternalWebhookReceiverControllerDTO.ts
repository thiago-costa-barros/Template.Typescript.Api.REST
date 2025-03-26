import { Prisma } from "@prisma/client"

export type ExternalWebhookReceiverHotmartDTO = {
    id: string,
    creation_date: bigint,
    event: string,
    version: string,
    data: Prisma.InputJsonValue
}