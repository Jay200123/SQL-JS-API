import { Handler, ErrorHandler } from "../../utils/index.js";

export class UserController {
  constructor(UserService) {
    this.UserService = UserService;
  }

  async getAllUsers(req, res, next) {
    try {
      const results = new Handler(res);
      const data = await this.UserService.getAllUsersService();

      return results.SuccessHandler(200, data, "Users retrieved successfully");
    } catch (err) {
      return next(err);
    }
  }

  async getOneUser(req, res, next) {
    const results = new Handler(res);
    const data = await this.UserService.getOneUserService(req.params.id);

    return data.result.length === 0
      ? next(new ErrorHandler(404, "User not found"))
      : results.SuccessHandler(200, data, "User retrieved successfully");
  }

  async createUser(req, res, next) {
    const data = await this.UserService.createUserService(req.body);
    return res.status(201).json({
      status: "success",
      data,
    });
  }
}
