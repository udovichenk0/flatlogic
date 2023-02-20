import { lazy } from "react";

import { homeRoutes } from "@/shared/routing";

import { MainLayout } from "@/widgets/Layouts/main-layout";

const HomePageLazy = lazy(() => import("./ui"));

export const HomePage = {
  route: homeRoutes.route,
  view: HomePageLazy,
  layout: MainLayout,
};
