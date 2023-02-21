import { sample } from "effector";
import { createForm } from "effector-forms";

import { rules } from "../config";

export const loginForm = createForm({
  fields: {
    email: {
      init: "",
      rules: [rules.email(), rules.required()],
    },
    password: {
      init: "",
      rules: [rules.minLength(8), rules.maxLength(20), rules.required()],
    },
  },
  validateOn: ["submit"],
});
sample({
  clock: loginForm.formValidated,
  fn: () => console.log("asdpofasdjp"),
});
