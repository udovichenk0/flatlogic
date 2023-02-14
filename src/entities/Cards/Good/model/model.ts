// import { createJsonQuery } from "@farfetched/core";

import { getGoods, Good } from "@/shared/api/Goods";
import { createRoute } from "atomic-router";
import {
  attach,
  combine,
  createEffect,
  createEvent,
  createStore,
  sample,
  split,
} from "effector";

export const goToProductRoute = createRoute();

export const createGoodsListModel = ({
  limit,
  minDefaultPrice = 1,
  maxDefaultPrice = 100000,
}: {
  limit: number;
  minDefaultPrice?: number;
  maxDefaultPrice?: number;
}) => {
  const changeRange = createEvent<number[]>();

  const $goods = createStore<Good[]>([]);
  const $isFetching = createStore(false);
  const $filterRange = createStore<{ min: number; max: number }>({
    min: minDefaultPrice,
    max: maxDefaultPrice,
  });
  const $filterByOrder = createStore<"asc" | "desc">("asc");
  const $total = createStore<number>(0);

  const $filters = combine($filterRange, $filterByOrder);
  // get goods data from bd

  const getGoodsFx = attach({
    source: $filters,
    mapParams: (_, [priceRange, orderBy]) => {
      return {
        priceRange,
        filterByOrder: orderBy,
      };
    },
    effect: createEffect(
      async ({
        priceRange,
        filterByOrder,
      }: {
        priceRange: { min: number; max: number };
        filterByOrder?: "asc" | "desc";
      }) => {
        const goods = await getGoods({
          goodsLimit: limit,
          filterByOrder,
          priceRange,
        });
        return goods;
      }
    ),
  });
  // update price range
  sample({
    clock: changeRange,
    fn: ([min, max]) => ({
      min,
      max,
    }),
    target: $filterRange,
  });
  // after range changed fetch goods
  sample({
    clock: [changeRange],
    target: getGoodsFx,
  });
  // TODO REFACTOR THIS
  //put goods and total goods into stores
  sample({
    clock: getGoodsFx.doneData,
    fn: ({ goods }) => goods,
    target: $goods,
  });
  sample({
    clock: getGoodsFx.doneData,
    fn: ({ total }) => total,
    target: $total,
  });
  // toggle fetching
  sample({
    clock: getGoodsFx,
    fn: () => true,
    target: $isFetching,
  });
  sample({
    clock: [getGoodsFx.done, getGoodsFx.fail],
    fn: () => false,
    target: $isFetching,
  });
  return {
    $goods,
    $isFetching,
    getGoodsFx,
    $total,
    changeRange,
    $filters,
  };
};

//TODO Make test for the createGoodsList
