// import { createJsonQuery } from "@farfetched/core";

import { getGoods, Good } from "@/shared/api/Goods";
import { createEffect, createEvent, createStore, sample } from "effector";

export const createGoodsListModel = ({
  limit,
}: {
  limit: number;
  lastItemId?: string;
}) => {
  //All goods
  const $goods = createStore<Good[]>([]);

  //id of last item
  const $lastItemId = createStore("");

  //total items in the db
  const $total = createStore<number>(0);

  const changeLastItemId = createEvent<string>();

  // get goods data from bd
  const getGoodsFx = createEffect(async ({ lastItemId }: any) => {
    const goods = await getGoods({ goodsLimit: limit, lastItemId });
    return goods;
  });

  // store data into $goods when fx is done
  sample({
    clock: getGoodsFx.doneData,
    source: $goods,
    fn: (goods, newGoods) => {
      return [...goods, ...newGoods.goods];
    },
    target: $goods,
  });
  //TODO PAGINATION

  //set id of last item
  sample({
    clock: changeLastItemId,
    target: $lastItemId,
  });

  // when id of last item is changed fetch getGoodFx
  sample({
    clock: $lastItemId,
    fn: (lastItemId: string) => ({ lastItemId }),
    target: getGoodsFx,
  });

  // set total after first fetch
  sample({
    clock: getGoodsFx.doneData,
    source: $total,
    filter: (total) => !total,
    fn: (_, count) => {
      return count.total;
    },
    target: $total,
  });
  /*
  TODO make here sort sample
  
  */
  return {
    $goods,
    getGoodsFx,
    changeLastItemId,
    $total,
  };
};

//TODO Make test for the createGoodsList
