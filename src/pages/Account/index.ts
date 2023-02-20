import { lazy } from "react";

import { accountRoutes } from "@/shared/routing";

import { MainLayout } from "@/widgets/Layouts/main-layout";


const AccountPageLazy = lazy(() => import("./ui"));

export const AccountPage = {
  route: accountRoutes.route,
  view: AccountPageLazy,
  layout: MainLayout,
};
