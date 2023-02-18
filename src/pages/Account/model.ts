import { MainLayout } from "@/widgets/Layouts/main-layout";
import { createRoute } from "atomic-router";
import { lazy } from "react";

const AccountPageLazy = lazy(() => import("./ui"));
const route = createRoute();

export const accountRoute = { route };

export const AccountPage = {
  route,
  view: AccountPageLazy,
  layout: MainLayout,
};
