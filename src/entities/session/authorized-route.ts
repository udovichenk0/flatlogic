import {
  chainRoute,
  RouteInstance,
  RouteParams,
  RouteParamsAndQuery,
  redirect,
} from "atomic-router";
import { createEvent, createStore, sample } from "effector";
import { and, not } from "patronum";

import { signInRoutes } from "@/shared/routing";

import { $isAuthenticated, authFailed, getUserFx } from "./session.model";

export function chainAuthorized<Params extends RouteParams>(
  route: RouteInstance<Params>
) {
  const checkStarted = createEvent<RouteParamsAndQuery<Params>>();
  const $selfLoaded = createStore(false);

  const alreadyAuthorized = sample({
    clock: checkStarted,
    filter: $isAuthenticated,
  });
  sample({
    clock: authFailed,
    fn: () => true,
    target: $selfLoaded,
  });
  sample({
    clock: [authFailed, checkStarted, $selfLoaded],
    filter: and(not($isAuthenticated), route.$isOpened, $selfLoaded),
    target: redirect({ route: signInRoutes.route }),
  });
  return chainRoute({
    route,
    beforeOpen: checkStarted,
    openOn: [getUserFx.done, alreadyAuthorized],
  });
}
