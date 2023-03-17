import { lazy } from "react";

import { signInRoutes } from "@/shared/routing";

import {chainNotAuthorized} from "@/entities/session/model";

const SignIn = lazy(() => import("./ui"));

const shouldNotBeAuthorized = chainNotAuthorized(signInRoutes.route)

export const SigninPage = {
  route: shouldNotBeAuthorized,
  view: SignIn,
};
