import { Handler, ErrorHandler } from "../../utils/index.js";
import { validationResult } from "express-validator";
import { createUserValidator } from "../../validators/users.js";

/**
 * Controller class are responsible for handing incoming http requests and responses.
 * They act as a bridge between the service layer and the HTTP layer.
 * They handle the incoming requests, validate input, and return appropriate responses.
 * After a route is hit, the controller will be called to handle the request.
 * The controller will call the service to perform the operation and return the result.
 */
export class UserController {
  /**
   * Constructor for the UserController class.
   * @param {UserService} UserService - The service instance to be used by the controller.
   * The constructor are used to inject the service instance into the controller.
   */
  constructor(UserService) {
    /**
     * @type {UserService}
     * @description The service instance to be used by the controller.
     * This allows the controller to use the methods from the service class.
     */
    this.UserService = UserService; 
  }

  async getAllUsers(req, res, next) {
    const results = new Handler(res);
    const data = await this.UserService.getAllUsersService();

    return data.length === 0
      ? next(new ErrorHandler(404, "Users not found"))
      : results.SuccessHandler(200, data, "Users retrieved successfully");
  }

  async getOneUser(req, res, next) {
    const results = new Handler(res);
    const data = await this.UserService.getOneUserService(req.params.id);

    const result = data.result[0];

    return data.result.length === 0
      ? next(new ErrorHandler(404, "User not found"))
      : results.SuccessHandler(200, result, "User retrieved successfully");
  }

  async createUser(req, res, next) {
    const response = new Handler(res);

    const data = await this.UserService.createUserService(req.body);

    return response.SuccessHandler(201, data, "User created successfully");
  }
}
