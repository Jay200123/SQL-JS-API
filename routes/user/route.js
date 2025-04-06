import { UserRepository } from "./repository.js";
import { UserService } from "./service.js";
import { UserController } from "./controller.js";
import express from 'express';

const router = express.Router();

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

const userRoutes = [
    {
        method: "get",
        path: "/users",
        handler: userController.getAllUsers.bind(userController) 
    },
    {
        method: "get",
        path: "/user/:id",
        handler: userController.getOneUser.bind(userController) 
    }
];

// Register routes dynamically
userRoutes.forEach(route => {
    router[route.method](route.path, route.handler);
});

export default router;
