import { lazy } from "react";

import { signUpRoutes } from "@/shared/routing";

import {chainNotAuthorized} from "@/entities/session/model";

const SignUp = lazy(() => import("./ui"));
const notAuthorizedRoute = chainNotAuthorized(signUpRoutes.route)
export const SignUpPage = {
  route: notAuthorizedRoute,
  view: SignUp,
};
