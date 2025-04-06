export class UserService {
  constructor(UserRepository) {
    this.UserRepository = UserRepository;
  }

  async getAllUsersService() {
    const results = await this.UserRepository.getAllUsersRepository();
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

  async createUserService(data) {
    const result = await this.UserRepository.createUserService(data);

    return {
      result,
    };
  }
}
