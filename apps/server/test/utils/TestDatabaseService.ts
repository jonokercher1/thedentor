import { PrismaClient } from '@prisma/client';

export default class TestDatabaseService {
  database: PrismaClient;

  constructor() {
    this.database = new PrismaClient();
  }

  public async disconnect() {
    await this.database.$disconnect();
  }
}