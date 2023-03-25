import {chainRoute, redirect, RouteInstance, RouteParams, RouteParamsAndQuery} from "atomic-router";
import {createEvent, sample} from "effector";
import {and, equals, not, or} from "patronum";

import {homeRoutes} from "@/shared/routing";

import {
    $isAuthenticated,
    $selfLoaded,
    $sessionRole,
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