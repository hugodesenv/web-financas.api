import { UserRepository } from "../repositories/user-repository";

export class UserCase {
  userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async authenticate(user: string, password: string) {
    const res = await this.userRepository.userExists(user, password);
  }
}