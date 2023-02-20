import { createRoute } from "atomic-router";
import { sample } from "effector";
import { lazy } from "react";

import { createGoodsListModel } from "@/entities/product/model";

import { MainLayout } from "@/widgets/Layouts/main-layout";

const Shop = lazy(() => import("./ui"));
const route = createRoute();

export const MIN = 1;
export const MAX = 1500;
export const MAX_DEFAULT = 700;

//factory
export const $$goodsList = createGoodsListModel({
  limit: 5,
  minDefaultPrice: MIN,
  maxDefaultPrice: MAX_DEFAULT,
});

//fetch goods when page is opened and there is ampty store with goods
sample({
  clock: route.opened,
  target: $$goodsList.getGoodsFx,
});

export const shopRoutes = { route };
export const ShopPage = {
  route,
  view: Shop,
  layout: MainLayout,
};
