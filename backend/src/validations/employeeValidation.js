import { body, validationResult } from "express-validator";

const validateEmployee = [
  body("name")
    .notEmpty()
    .withMessage("Name is required"),

  body("profile.contact.email")
    .isEmail()
    .withMessage("Must be a valid email"),

  body("profile.contact.phone")
    .notEmpty()
    .withMessage("Phone is required"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: errors.array(),
      });
    }
    next();
  },
];

export default validateEmployee;
