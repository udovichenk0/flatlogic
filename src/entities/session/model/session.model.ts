import { createEffect, createEvent, createStore, sample } from "effector";

import { getUser, User } from "@/shared/api/User";

export const authFailed = createEvent();
export const authSuccessed = createEvent()
export const sessionReset = createEvent();

export const $session = createStore({} as User);
$session.reset(sessionReset);

export const $isAuthenticated = createStore(false);
$isAuthenticated.reset(sessionReset);
export const getUserFx = createEffect(async ({ uid }: { uid: string }) => {
  const user = await getUser(uid);
  return user;
});


sample({
  clock: getUserFx.doneData,
  target: $session,
});

sample({
  clock: getUserFx.done,
  fn: () => true,
  target: $isAuthenticated,
});
