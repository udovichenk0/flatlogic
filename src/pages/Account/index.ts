import { lazy } from "react";

import { accountRoutes } from "@/shared/routing";

import { sessionModel } from "@/entities/session";

import { MainLayout } from "@/widgets/Layouts/main-layout";

const AccountPageLazy = lazy(() => import("./ui"));

const authorizedRoute = sessionModel.chainAuthorized(accountRoutes.route);

export const AccountPage = {
  route: authorizedRoute,
  view: AccountPageLazy,
  layout: MainLayout,
};
