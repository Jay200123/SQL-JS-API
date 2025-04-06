export class UserService {
  constructor(UserRepository) {
    this.UserRepository = UserRepository;
  }

  async getAllUsersService() {
    const results = await this.UserRepository.getAllUsersRepository();

    console.log("Retrieved from repo:", results);
    return {
      results,
    };
  }

  async getOneUserService(id) {
    const result = await this.UserRepository.getOneUserRepository(id);
    return {
      result,
    };
  }
}
