import { createRoute } from "atomic-router";
import { lazy } from "react";
import { MainLayout } from "../../widgets/Layouts/main-layout";
const HomePageLazy = lazy(() => import("./ui"));
const route = createRoute();

export const homeRoutes = { route };
export const HomePage = {
  route,
  view: HomePageLazy,
  layout: MainLayout,
};
