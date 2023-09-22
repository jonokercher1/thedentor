import { PrismaClient } from '@prisma/client';

export default class TestDatabaseService {
  database: PrismaClient;

  constructor() {
    this.database = new PrismaClient();
  }

  public async disconnect(): Promise<void> {
    await this.database.$disconnect();
  }
}