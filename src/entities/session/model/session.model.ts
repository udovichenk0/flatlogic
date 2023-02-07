import { createEffect, createStore } from "effector";

import { getSessionUser, User } from "@/shared/api/User";

export const $session = createStore({} as User);

export const getUserFx = createEffect(async () => {
  const user = await getSessionUser();
  return user;
});
