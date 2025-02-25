import { UserRepository } from "../../repository/user-repository";

export class AuthenticationUserUseCase {
  userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async tryAuthentication(user: string, password: string): Promise<boolean> {
    return await this.userRepository.userExists(user, password);
  }
}