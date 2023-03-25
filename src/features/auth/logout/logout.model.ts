import { redirect } from "atomic-router";
import { createEffect, createEvent, sample } from "effector";

import { logout } from "@/shared/api/User";
import { homeRoutes } from "@/shared/routing";

import { cartModel } from "@/entities/cart";
import { sessionModel } from "@/entities/session";

export const logoutTriggered = createEvent();

export const logoutFx = createEffect(async () => {
  return await logout();
});

sample({
  clock: logoutTriggered,
  target: logoutFx,
});

redirect({
  clock: logoutFx.done,
  route: homeRoutes.route,
});

sample({
  clock: logoutFx.done,
  target: [sessionModel.sessionReset, cartModel.cartReset],
});
