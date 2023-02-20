import { lazy } from "react";

import { shopRoutes } from "@/shared/routing";

import { MainLayout } from "@/widgets/Layouts/main-layout";

const Shop = lazy(() => import("./ui"));

export const ShopPage = {
  route: shopRoutes.route,
  view: Shop,
  layout: MainLayout,
};
