import { createRoute } from "atomic-router";
import { createEvent, sample } from "effector";

import { createGoodsListModel } from "@/entities/product/model";

const pageOpened = createEvent();
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
  clock: [route.opened, pageOpened],
  target: $$goodsList.getGoodsFx,
});

pageOpened();
