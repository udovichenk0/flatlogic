import { createEffect, createEvent, createStore, sample } from "effector";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import { getUser, User } from "@/shared/api/User";

export const authFailed = createEvent();

export const $session = createStore({} as User);
export const $isAuthenticated = createStore(false);

export const getUserFx = createEffect(async ({ uid }: { uid: string }) => {
  const user = await getUser(uid);
  return user;
});

sample({
  clock: getUserFx.done,
  fn: () => true,
  target: $isAuthenticated,
});
