import { createEffect, sample } from "effector";
import { createForm } from "effector-forms";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import { getUser } from "@/shared/api/User";
import { signInRoutes } from "@/shared/routing";

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

sample({
  clock: signInRoutes.route.closed,
  target: loginForm.reset,
});
