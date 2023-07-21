import { redirect } from "atomic-router";
import { createEvent, sample } from "effector";

import { homeRoutes } from "@/shared/routing";

import { createGoodsListModel } from "@/entities/product";

export const redirectToShop = createEvent();
export const $$goodsList = createGoodsListModel({ limit: 5 });

const pageOpened = createEvent();
//when page is opened fetch data
sample({
  clock: [homeRoutes.route.opened, pageOpened],
  source: $$goodsList.$products,
  filter: (products) => {
    return !products.length;
  },
  target: $$goodsList.getGoods,
});

sample({
  clock: homeRoutes.route.closed,
  target: $$goodsList.reset,
});

redirect({
  clock: redirectToShop,
  route: homeRoutes.goToShopRoute,
});

pageOpened();
