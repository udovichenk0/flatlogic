import {chainRoute, redirect, RouteInstance, RouteParams, RouteParamsAndQuery} from "atomic-router";
import {createEvent, createStore, sample} from "effector";
import {and, debug, equals, not, or} from "patronum";

import {homeRoutes, signInRoutes} from "@/shared/routing";

import {
    $isAuthenticated,
    $selfLoaded, $session,
    $sessionRole,
    authFailed,
    authSuccessed
} from "@/entities/session/model/session.model";

export function chainAdminRoute<Params extends RouteParams>(route: RouteInstance<Params>){
    const checkStarted = createEvent<RouteParamsAndQuery<Params>>()
    const isAdmin = sample({
        clock: checkStarted,
        filter: equals($sessionRole, 'Admin')
    })

    sample({
        clock: [checkStarted, $selfLoaded],
        filter: and(or(not($isAuthenticated), equals($sessionRole, 'User')), route.$isOpened),
        target: redirect({ route: homeRoutes.route })
    })


    return chainRoute({
        route,
        openOn: isAdmin,
        beforeOpen: checkStarted
    })
}