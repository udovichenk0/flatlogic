import { lazy } from "react";

import { signUpRoutes } from "@/shared/routing";

const SignUp = lazy(() => import("./ui"));

export const SignUpPage = {
  route: signUpRoutes.route,
  view: SignUp,
};
