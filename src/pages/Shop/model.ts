import { lazy } from "react";
import { attach, createEvent, createStore, sample } from "effector";
import { createRoute } from "atomic-router";

import { createGoodsListModel } from "@/entities/Cards/Good/model";

import { MainLayout } from "@/widgets/Layouts/main-layout";

const Shop = lazy(() => import("./ui"));
const route = createRoute();

export const MIN = 1;
export const MAX = 1500;
export const MAX_DEFAULT = 700;

export const rangeChanged = createEvent<number[]>();
const reset = createEvent();
//store with filters
const $filters = createStore({ priceRange: [MIN, MAX_DEFAULT] }).on(
  rangeChanged,
  (state, range) => ({ ...state, priceRange: range })
);
//factory
export const $$goodsList = createGoodsListModel({ limit: 15 });
$$goodsList.$goods.reset(reset);
//fetch goods when store is changed
const filteredGoodsFx = attach({
  source: $filters,
  effect: $$goodsList.getGoodsFx,
});

//fetch goods on event
sample({
  clock: rangeChanged,
  target: filteredGoodsFx,
});

sample({
  clock: filteredGoodsFx.doneData,
  fn: ({ goods }) => goods,
  target: $$goodsList.$goods,
});
//fetch goods when page is opened and there is ampty store with goods
sample({
  clock: route.opened,
  source: $$goodsList.$goods,
  filter: (goods) => !goods.length,
  target: $$goodsList.getGoodsFx,
});
//reset store when page closed
sample({
  clock: route.closed,
  target: reset,
});
export const shopRoutes = { route };
export const ShopPage = {
  route,
  view: Shop,
  layout: MainLayout,
};
