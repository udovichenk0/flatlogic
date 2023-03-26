import { createEffect, sample } from "effector";
import {modelFactory} from "effector-factorio";
import { createForm } from "effector-forms";

import { createAccountWithEmail, saveUserToBD, User } from "@/shared/api/User";
import { signUpRoutes } from "@/shared/routing";

import { sessionModel } from "@/entities/session";

import { rules } from "../config";

export const registerFactory = modelFactory(() => {
  const registerForm = createForm({
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
        return await createAccountWithEmail(email, password);
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
    target: sessionModel.getUserFx,
  });

  sample({
    clock: signUpWithEmailAndPasswordFx.done,
    target: [sessionModel.removeProductFromLsFx, sessionModel.authSuccessed],
  });

  sample({
    clock: signUpRoutes.route.closed,
    target: registerForm.reset,
  });
  return {
    registerForm
  }
})

