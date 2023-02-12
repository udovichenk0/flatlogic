import { createEffect, createStore, sample } from "effector";

import { getSessionUser, User } from "@/shared/api/User";

export const $session = createStore({} as User);
export const $isAuthenticated = createStore(false);
export const getUserFx = createEffect(async () => {
  const user = await getSessionUser();
  return user;
});

sample({
  clock: getUserFx.done,
  fn: () => true,
  target: $isAuthenticated,
});
