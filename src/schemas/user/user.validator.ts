import { checkSchema } from "express-validator";

const registerModel = checkSchema({
  email: {
    isEmail: true,
  },
  password: {
    isLength: {
      options: {
        min: 6,
      },
    },
  },
});

export { registerModel };
