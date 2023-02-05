import { GoodModel } from "@/entities/Cards/Good";
import { createRoute } from "atomic-router";
import { sample } from "effector";
import { lazy } from "react";
import { MainLayout } from "../../widgets/Layouts/main-layout";
const HomePageLazy = lazy(() => import("./ui"));
const route = createRoute();

export const $$goodsList = GoodModel.createGoodsList();

sample({
  clock: route.opened,
  target: $$goodsList.getGoodsFx,
});

export const homeRoutes = { route };
export const HomePage = {
  route,
  view: HomePageLazy,
  layout: MainLayout,
};
