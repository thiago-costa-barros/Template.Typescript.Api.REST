import { PrismaClient } from '@prisma/client';

// Declaração global para armazenar o PrismaClient em desenvolvimento
declare global {
    // eslint-disable-next-line no-var
    var cachedPrisma: PrismaClient;
}

let db: PrismaClient;

if (process.env.NODE_ENV === 'production') {
    db = new PrismaClient(); // Nova instância em produção
} else {
    if (!global.cachedPrisma) {
        global.cachedPrisma = new PrismaClient(); // Cria uma nova instância se não existir
    }
    db = global.cachedPrisma; // Reutiliza a instância existente
}

export const prisma = db;