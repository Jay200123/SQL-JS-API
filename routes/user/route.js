import { UserRepository } from "./repository.js";
import { UserService } from "./service.js";
import { UserController } from "./controller.js";
import express from "express";

/**
 * Creates an Express router for user related routes.
 */
const router = express.Router();

/**
 * Initializes the user repository, service and controller.
 * This is where the dependency injection happens.
 * The repository is injected into the service,
 * and the service is injected into the controller.
 * This allows for a clean separation of concerns and makes the code more maintainable.
 */

/**
 * Repository class for handling database interactions for user data.
 * This class is responsible for all CRUD operations related to users database.
 * It abstracts the database logic and provides a clean interface for the service layer.
 */
const userRepository = new UserRepository();
/**
 * Service class for handling business logic related to users.
 * This class uses the repository to perform CRUD operations and contains any additional business logic needed.
 * It acts as an intermediary between the controller and the repository.
 * The service layer is responsible for validating data, applying business rules, and orchestrating complex operations.
 * (Here is where the data is processed).
 */
const userService = new UserService(userRepository);
/**
 * Controller class for handling HTTP requests and responses related to users.
 * This class uses the service to perform operations and formats the responses for the client.
 * It acts as a bridge between the HTTP layer and the service layer.
 * The controller is responsible for handling incoming requests, validating input, and returning appropriate responses.
 */
const userController = new UserController(userService);

/**
 * Here is where the routes are defined, such as http method, path, and handler.
 * The handler is a method of the controller class that will be called when the route is hit.
 */
const userRoutes = [
  {
    /**
     * This route is for retrieving all the users data from the database.
     * The method is GET,
     * The route path is "/users/all",
     * The handler is the getAllUsers method of the userController class.
     * The handler is bound to the userController instance to ensure that `this` refers to the correct context.
     */
    method: "get",
    path: "/users/all",
    handler: userController.getAllUsers.bind(userController),
  },
  {
    /**
     * This route is for retrieving single user data filtered by ID from the database.
     * The method is GET,
     * The route path is "/user/:id",
     * The handler is the getOneUser method of the userController class.
     * The handler is bound to the userController instance to ensure that `this` refers to the correct context.
     */
    method: "get",
    path: "/user/:id",
    handler: userController.getOneUser.bind(userController),
  },
  {
    /**
     * This route is for creating a new user in the database.
     * The method is POST,
     * The route path is "/user/create",
     * The handler is the createUser method of the userController class.
     * The handler is bound to the userController instance to ensure that `this` refers to the correct context.
     */
    method: "post",
    path: "/user/create",
    handler: userController.createUser.bind(userController),
  },
];

// Dynamically register the routes with the Express router
// This allows you to register multiple routes with a single loop, making the code more maintainable
userRoutes.forEach((route) => {
  router[route.method](route.path, route.handler); // Register each route by HTTP method and path
});

// Export the configured router for use in the main application
export default router;
