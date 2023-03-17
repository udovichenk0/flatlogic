import {chainRoute, redirect, RouteInstance, RouteParams, RouteParamsAndQuery} from "atomic-router";
import {createEvent, createStore, sample} from "effector";
import {and, debug, not} from "patronum";

import {homeRoutes} from "@/shared/routing";

import {$isAuthenticated, $session, authFailed, authSuccessed, getUserFx} from "./session.model";

export function chainNotAuthorized<Params extends RouteParams>(route:RouteInstance<Params>){
    const checkStarted = createEvent<RouteParamsAndQuery<Params>>()
    const $selfLoaded = createStore(false)
    const alreadyAuthenticated = sample({
        clock: [checkStarted, $selfLoaded],
        filter: and(not($isAuthenticated), $selfLoaded)
    })

    sample({
        clock: [authSuccessed, checkStarted, $isAuthenticated],
        filter: and($isAuthenticated, route.$isOpened),
        target: redirect({route: homeRoutes.route})
    })
    sample({
        clock: authFailed,
        fn: () => true,
        target: $selfLoaded
    })

    return chainRoute({
        route,
        beforeOpen: checkStarted,
        openOn: [alreadyAuthenticated]
    })

}