import { MainLayout } from "@/widgets/Layouts/main-layout";
import { createRoute } from "atomic-router";
import { Shop } from "./ui";
const route = createRoute();

export const shopRoutes = { route };

export const shopPage = {
  route: route,
  view: Shop,
  layout: MainLayout,
};
