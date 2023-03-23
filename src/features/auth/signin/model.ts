import { createEffect, sample } from "effector";
import { createForm } from "effector-forms";

import { loginWithEmailAndPassword } from "@/shared/api/User";
import { signInRoutes } from "@/shared/routing";

import {authSuccessed, getUserFx} from "@/entities/session/model";

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


export const signInWithEmailAndPasswordFx = createEffect(
  async ({ email, password }: { email: string; password: string }) => {
    const response = await loginWithEmailAndPassword(email, password);
    return response;
  }
);

const removeProductFromLsFx = createEffect(() => {
  localStorage.removeItem("products")
})

// login on form submitted
sample({
  clock: loginForm.formValidated,
  target: signInWithEmailAndPasswordFx,
});

sample({
  clock: signInWithEmailAndPasswordFx.done,
  target: [removeProductFromLsFx, authSuccessed]
});

sample({
  clock: signInRoutes.route.closed,
  target: loginForm.reset,
});