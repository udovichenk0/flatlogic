// import { createJsonQuery } from "@farfetched/core";

import { getGoods, Good } from "@/shared/api/Goods";
import { createEffect, createStore, restore, sample } from "effector";
//TODO put createGoodsList into babel factory
export const createGoodsList = () => {
  const $goods = createStore<Good[]>([]);
  const getGoodsFx = createEffect(async () => {
    const goods = await getGoods();
    return goods;
  });
  sample({
    clock: getGoodsFx.doneData,
    target: $goods,
  });
  return {
    $goods,
    getGoodsFx,
  };
};
