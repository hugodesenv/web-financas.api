export interface IUserRepository {
  userExists(username: string, password: string): Promise<boolean>;
}