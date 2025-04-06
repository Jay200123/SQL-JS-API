export class UserController {
  constructor(UserService) {
    this.UserService = UserService;
  }

  async getAllUsers(req, res) {
    const results = await this.UserService.getAllUsersService();
    return res.status(200).json({
    data:results
    });
  }

  async getOneUser(req, res) {
    const { id } = req.params;
    const result = await this.UserService.getOneUserService(id);
    return res.status(200).json({
      status: "success",
      data: result,
    });
  }
}