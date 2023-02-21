import {
  chainRoute,
  RouteInstance,
  RouteParams,
  RouteParamsAndQuery,
  redirect,
} from "atomic-router";
import { createEvent, sample } from "effector";
import { and, debug, not } from "patronum";

import { signInRoutes } from "@/shared/routing";

import { $isAuthenticated, getUserFx } from "./session.model";

export function chainAuthorized<Params extends RouteParams>(
  route: RouteInstance<Params>
) {
  const checkStarted = createEvent<RouteParamsAndQuery<Params>>();

  const alreadyAutorized = sample({
    clock: checkStarted,
    filter: $isAuthenticated,
  });

  sample({
    clock: checkStarted,
    filter: and(not(getUserFx.pending), not($isAuthenticated)),
    target: getUserFx,
  });

  sample({
    clock: checkStarted,
    filter: not($isAuthenticated),
    target: redirect({ route: signInRoutes.route }),
  });

  return chainRoute({
    route,
    beforeOpen: checkStarted,
    openOn: [getUserFx.done, alreadyAutorized],
  });
}
