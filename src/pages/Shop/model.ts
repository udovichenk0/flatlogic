import {combine, createEvent, createStore, Effect, sample} from "effector";

import { shopRoutes } from "@/shared/routing";

import { createFilterModel } from "@/entities/filter";
import { createGoodsListModel } from "@/entities/product/model";
const pageOpened = createEvent();

export const MIN = 1;
export const MAX = 1500;
export const MAX_DEFAULT = 700;

//factory
export const $$goodsList = createGoodsListModel({limit: 5});

export const filterModel = createFilterModel()

sample({
  clock: filterModel.filterRangeChanged,
  source: filterModel.$filters,
  fn: ([byPriceRange, order]) => {
    return {
      byPriceRange,
    }
  },
  target: $$goodsList.getGoodsFx
})


//fetch goods when page is opened and there is empty store with goods
sample({
  clock: [shopRoutes.route.opened, pageOpened],
  target: $$goodsList.getGoods,
});


pageOpened();
