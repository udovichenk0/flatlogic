import { lazy } from "react";

import { signInRoutes } from "@/shared/routing";

import { MainLayout } from "@/widgets/Layouts/main-layout";

const SignIn = lazy(() => import("./ui"));

export const SigninPage = {
  route: signInRoutes.route,
  view: SignIn,
};
