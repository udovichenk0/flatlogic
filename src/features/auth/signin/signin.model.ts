import { createEffect, sample } from "effector";
import {modelFactory} from "effector-factorio";
import { createForm } from "effector-forms";

import { loginWithEmailAndPassword } from "@/shared/api/User";
import { signInRoutes } from "@/shared/routing";

import { sessionModel } from "@/entities/session";

import { rules } from "../config";

export const loginFactory = modelFactory(() => {
  const loginForm = createForm({
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
        return await loginWithEmailAndPassword(email, password);
      }
  );
  // login on form submitted
  sample({
    clock: loginForm.formValidated,
    target: signInWithEmailAndPasswordFx,
  });

  sample({
    clock: signInWithEmailAndPasswordFx.done,
    target: [sessionModel.removeProductFromLsFx, sessionModel.authSuccessed]
  });

  sample({
    clock: signInRoutes.route.closed,
    target: loginForm.reset,
  });

  return {
    loginForm
  }
})