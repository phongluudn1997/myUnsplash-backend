import { checkSchema } from "express-validator";

const authenSchema = checkSchema({
  email: {
    isEmail: {
      errorMessage: "Email must be valid",
    },
  },
  password: {
    isLength: {
      errorMessage: "Password between 6 and 12 characters",
      options: {
        min: 6,
        max: 12,
      },
    },
  },
});

export { authenSchema };
