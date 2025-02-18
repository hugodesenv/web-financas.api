import { PrismaClient } from "@prisma/client";

export abstract class BaseRepository {
  dbClient: PrismaClient;

  constructor(dbClient: PrismaClient) {
    this.dbClient = dbClient;
  }
}