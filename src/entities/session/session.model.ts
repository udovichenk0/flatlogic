import { createEffect, createEvent, createStore, sample } from "effector";

import { getUser } from "@/shared/api/session";

import { User } from "./type";

export const authFailed = createEvent();
export const authSuccessed = createEvent()
export const $selfLoaded = createStore(false)
sample({
  clock: [authFailed, authSuccessed],
  fn: () => true,
  target: $selfLoaded
})

export const sessionReset = createEvent();

export const $session = createStore<User>({} as User);
$session.reset(sessionReset);

export const $isAuthenticated = createStore(false);
$isAuthenticated.reset(sessionReset);
export const $sessionRole = createStore<'User' | 'Admin'>('User')
export const getUserFx = createEffect(async ({ uid }: { uid: string }) => {
  return  await getUser(uid);
});
export const removeProductFromLsFx = createEffect(() => {
  localStorage.removeItem("products")
})


sample({
  clock: getUserFx.doneData,
  target: $session,
});

sample({
  clock: getUserFx.done,
  fn: () => true,
  target: $isAuthenticated,
});
