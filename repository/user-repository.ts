import { PrismaClient } from '@prisma/client';
import { IUserRepository } from '../types/user-type';

export class UserRepository implements IUserRepository {

  async userExists(username: string, password: string): Promise<boolean> {
    const prisma = new PrismaClient();
    try {
      const user = await prisma.user.findFirst({ where: { username, password } });
      return user !== null;
    } finally {
      prisma.$disconnect;
    }
  }
}
