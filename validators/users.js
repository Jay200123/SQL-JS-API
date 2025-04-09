import { body } from "express-validator";

export const createUserValidator = async (req) => {
  const userRequiredFields = [
    body("name").notEmpty().withMessage("Name is required").isString().run(req),
    body("password")
      .notEmpty()
      .withMessage("Password is required")
      .isString()
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long")
      .run(req),
  ];

  return userRequiredFields;
};
