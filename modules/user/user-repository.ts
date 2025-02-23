import { PrismaClient } from '@prisma/client';

export class UserRepository {

  /**
   * Result if the user is present in database
   * @param username 
   * @param password 
   * @returns boolean to represent if the user was found
   */
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
