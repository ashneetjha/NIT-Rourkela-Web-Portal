import { body } from "express-validator";

export const loginValidators = [
  body("email").isEmail().withMessage("Enter a valid email address."),
  body("password").isString().isLength({ min: 8 }).withMessage("Password must be at least 8 characters."),
];
