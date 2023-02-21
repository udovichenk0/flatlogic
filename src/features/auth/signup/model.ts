import { sample } from "effector";
import { createForm } from "effector-forms";

import { signUpRoutes } from "@/shared/routing";

import { rules } from "../config";

export const registerForm = createForm({
  fields: {
    email: {
      init: "",
      rules: [rules.email(), rules.required()],
    },
    password: {
      init: "",
      rules: [rules.required(), rules.minLength(8), rules.maxLength(20)],
    },
    confirmation: {
      init: "",
      rules: [
        rules.required(),
        rules.minLength(8),
        rules.maxLength(20),
        rules.confirm(),
      ],
    },
  },
});

sample({
  clock: signUpRoutes.route.closed,
  target: registerForm.reset,
});
