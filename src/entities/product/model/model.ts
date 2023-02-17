// import { createJsonQuery } from "@farfetched/core";

import { getProducts, getProduct, Product } from "@/shared/api/Products";
import { CartItem } from "@/shared/api/User";
import {
  attach,
  combine,
  createEffect,
  createEvent,
  createStore,
  sample,
} from "effector";

//list of goods
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

  const $goods = createStore<Product[]>([]);
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
        const goods = await getProducts({
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

export const createProductModel = () => {
  const reset = createEvent();

  const $product = createStore<Product>({} as Product).reset(reset);
  // get single product by id
  const getProductFx = createEffect(async ({ id }: { id: string }) => {
    const product = await getProduct(id);
    return product;
  });

  sample({
    clock: getProductFx.doneData,
    target: $product,
  });
  return {
    getProductFx,
    $product,
    reset,
  };
};
