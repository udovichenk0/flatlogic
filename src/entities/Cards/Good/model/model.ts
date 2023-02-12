// import { createJsonQuery } from "@farfetched/core";

import { getGoods, Good } from "@/shared/api/Goods";
import { createEffect, createEvent, createStore, sample } from "effector";
import { debug } from "patronum";

export const createGoodsListModel = ({
  limit,
}: //filters
{
  limit: number;
  priceRange?: number[];
  lastItemId?: string;
}) => {
  //All goods
  const $goods = createStore<Good[]>([]);

  const $isFetching = createStore(true);
  //id of last item
  const $lastItemId = createStore("");

  //total items in the db
  const $total = createStore<number>(0);

  const changeLastItemId = createEvent<string>();

  // get goods data from bd
  const getGoodsFx = createEffect(async ({ priceRange }: any) => {
    const goods = await getGoods({
      goodsLimit: limit,
      priceRange,
    });
    return goods;
  });

  sample({
    clock: getGoodsFx.done,
    fn: () => false,
    target: $isFetching,
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
    $isFetching,
    getGoodsFx,
    changeLastItemId,
    $total,
  };
};

//TODO Make test for the createGoodsList
