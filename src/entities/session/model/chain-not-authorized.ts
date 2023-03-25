import {chainRoute, redirect, RouteInstance, RouteParams, RouteParamsAndQuery} from "atomic-router";
import {createEvent, sample} from "effector";
import {and, not} from "patronum";

import {homeRoutes} from "@/shared/routing";

import {$isAuthenticated, $selfLoaded, $session, authFailed, authSuccessed, getUserFx} from "./session.model";

export function chainNotAuthorized<Params extends RouteParams>(route:RouteInstance<Params>){
    const checkStarted = createEvent<RouteParamsAndQuery<Params>>()
    const alreadyAuthenticated = sample({
        clock: [checkStarted, $selfLoaded],
        filter: and(not($isAuthenticated), $selfLoaded)
    })

    sample({
        clock: [$selfLoaded, checkStarted, $isAuthenticated],
        filter: and($isAuthenticated, route.$isOpened, $selfLoaded),
        target: redirect({route: homeRoutes.route})
    })

    return chainRoute({
        route,
        beforeOpen: checkStarted,
        openOn: [alreadyAuthenticated]
    })

}