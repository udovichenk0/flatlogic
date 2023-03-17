import { redirect } from "atomic-router";
import { createEffect, sample } from "effector";
import { createForm } from "effector-forms";

import { createAccountWithEmail, saveUserToBD, User } from "@/shared/api/User";
import { homeRoutes, signUpRoutes } from "@/shared/routing";

import {authSuccessed, getUserFx} from "@/entities/session/model";

import { rules } from "../config";

export const registerForm = createForm({
  fields: {
    email: {
      init: "",
      rules: [rules.email(), rules.required()],
    },
    name: {
      init: "",
      rules: [rules.required(), rules.minLength(2), rules.maxLength(20)],
    },
    surname: {
      init: "",
      rules: [rules.required(), rules.minLength(3), rules.maxLength(20)],
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

const signUpWithEmailAndPasswordFx = createEffect(
  async ({
    email,
    password,
    name,
    surname,
  }: {
    email: string;
    password: string;
    name: string;
    surname: string;
  }) => {
    const user = await createAccountWithEmail(email, password);
    return user;
  }
);

const saveUserToFx = createEffect(async (data: User) => {
  await saveUserToBD(data);
});

const removeProductFromLsFx = createEffect(() => {
  localStorage.removeItem("products")
})

sample({
  clock: registerForm.formValidated,
  fn: ({ email, password, name, surname }) => ({
    email,
    password,
    name,
    surname,
  }),
  target: signUpWithEmailAndPasswordFx,
});

sample({
  clock: signUpWithEmailAndPasswordFx.done,
  fn: ({ params, result }) => ({
    avatar_url: "",
    billing_address: "",
    delivery_address: "",
    payment_method: "",
    cart: [],
    email: params.email,
    name: params.name,
    surname: params.surname,
    id: result.uid,
    role: "USER",
  }),
  target: saveUserToFx,
});

sample({
  clock: signUpWithEmailAndPasswordFx.doneData,
  fn: (response) => ({ uid: response.uid }),
  target: getUserFx,
});

sample({
  clock: signUpWithEmailAndPasswordFx.done,
  target: [removeProductFromLsFx, authSuccessed],
});

sample({
  clock: signUpRoutes.route.closed,
  target: registerForm.reset,
});
