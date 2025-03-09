
import { PrismaClient } from "@prisma/client"

export class ConnectDbUseCase {
  private _dbClient?: PrismaClient;

  get dbClient(): PrismaClient {
    if (!this._dbClient) {
      this._dbClient = new PrismaClient({ datasourceUrl: `${process.env.DATABASE_URL}` });
    }

    return this._dbClient;
  }
}