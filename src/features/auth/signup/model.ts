import { createEffect, sample } from "effector";
import { createForm } from "effector-forms";

import { createAccountWithEmail, saveUserToBD, User } from "@/shared/api/User";
import { signUpRoutes } from "@/shared/routing";

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
// email: string;
// id: string;
// avatar_url: string;
// billing_address: string;
// delivery_address: string;
// payment_method: string;
// cart: CartItem[];
// name: string;
// second_name: string;
sample({
  clock: signUpWithEmailAndPasswordFx.done,
  fn: ({ params, result }) => ({
    email: params.email,
    id: result.uid,
    avatar_url: "",
    billing_address: "",
    delivery_address: "",
    payment_method: "",
    cart: [],
    name: params.name,
    surname: params.surname,
  }),
  target: saveUserToFx,
});

sample({
  clock: signUpRoutes.route.closed,
  target: registerForm.reset,
});
