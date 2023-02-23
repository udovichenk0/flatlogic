import { redirect } from "atomic-router";
import { createEffect, sample } from "effector";
import { createForm } from "effector-forms";

import { loginWithEmailAndPassword } from "@/shared/api/User";
import { homeRoutes, signInRoutes } from "@/shared/routing";

import { getUserFx } from "@/entities/session/model";

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

const signInWithEmailAndPasswordFx = createEffect(
  async ({ email, password }: { email: string; password: string }) => {
    const response = await loginWithEmailAndPassword(email, password);
    return response;
  }
);

// login on form submitted
sample({
  clock: loginForm.formValidated,
  target: signInWithEmailAndPasswordFx,
});

// get user from bd if we signin
sample({
  clock: signInWithEmailAndPasswordFx.doneData,
  fn: (response) => ({ uid: response.uid }),
  target: getUserFx,
});

sample({
  clock: signInRoutes.route.closed,
  target: loginForm.reset,
});

//redirect user to the home when sign in
redirect({
  clock: signInWithEmailAndPasswordFx.done,
  route: homeRoutes.route,
});
