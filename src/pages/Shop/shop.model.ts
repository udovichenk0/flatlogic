import {createEvent, sample} from "effector";

import { productsFx } from "@/shared/api/products";
import { shopRoutes } from "@/shared/routing";

import { createFilterModel } from "@/entities/filter";
import { createGoodsListModel } from "@/entities/product";

const pageOpened = createEvent();

//factory
export const $$goodsList = createGoodsListModel({limit: 5});

export const filterModel = createFilterModel()

sample({
  clock: filterModel.filterRangeChanged,
  source: filterModel.$filters,
  fn: ([byPriceRange]) => {
    return {
      filterByPriceRange: byPriceRange,
    }
  },
  target: productsFx
})


//fetch goods when page is opened and there is empty store with goods
sample({
  clock: [shopRoutes.route.opened, pageOpened],
  source: $$goodsList.$products,
  filter: (products) => !products.length,
  target: $$goodsList.getGoods,
});


pageOpened();
