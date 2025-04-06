// Import necessary modules and classes
import { UserRepository } from "./repository.js"; // Handles database interactions for user data
import { UserService } from "./service.js"; // Contains business logic for user-related operations
import { UserController } from "./controller.js"; // Handles HTTP requests and responses for user routes
import express from "express"; // Express framework for routing and handling requests

// Create a new Express router
const router = express.Router();

// Initialize the UserRepository, UserService, and UserController
const userRepository = new UserRepository(); // Repository to interact with the database
const userService = new UserService(userRepository); // Service layer to handle business logic
const userController = new UserController(userService); // Controller to handle request and response for user routes

// Define the routes for handling user-related HTTP requests
const userRoutes = [
  {
    method: "get", // HTTP method for this route
    path: "/users/all", // The route path for retrieving all users
    handler: userController.getAllUsers.bind(userController), // Bind the `this` context to `userController`
    // The `.bind()` ensures that when the route is hit, `this` inside `getAllUsers` refers to the `userController` object
  },
  {
    method: "get", // HTTP method for this route
    path: "/user/:id", // The route path for retrieving a single user by ID
    handler: userController.getOneUser.bind(userController), // Bind `this` to `userController` for `getOneUser`
  },
  {
    method: "post", // HTTP method for this route
    path: "/user/create", // The route path for creating a new user
    handler: userController.createUser.bind(userController), // Bind `this` to `userController` for `createUser`
  },
];

// Dynamically register the routes with the Express router
// This allows you to register multiple routes with a single loop, making the code more maintainable
userRoutes.forEach((route) => {
  router[route.method](route.path, route.handler); // Register each route by HTTP method and path
});

// Export the configured router for use in the main application
export default router;
