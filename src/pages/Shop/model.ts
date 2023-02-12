import { createGoodsListModel } from "@/entities/Cards/Good/model";
import { MainLayout } from "@/widgets/Layouts/main-layout";
import { createRoute } from "atomic-router";
import {
  createEvent,
  createStore,
  sample,
  Event,
  createEffect,
} from "effector";
import { lazy } from "react";

// import { Shop } from "./ui";
const TestLazyPage = lazy(() => import("./ui"));
const route = createRoute();
export const $$goodsList = createGoodsListModel({ limit: 15 });

sample({
  clock: route.opened,
  source: $$goodsList.$goods,
  filter: (goods) => !goods.length,
  target: $$goodsList.getGoodsFx,
});

export const shopRoutes = { route };
export const ShopPage = {
  route,
  view: TestLazyPage,
  layout: MainLayout,
};
