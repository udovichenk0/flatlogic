import {
  attach,
  combine,
  createEffect,
  createEvent,
  createStore,
  sample,
} from "effector";
import {spread} from "patronum";

import { getProducts, getProduct, Product } from "@/shared/api/Products";
//list of goods
export const createGoodsListModel = ({limit}: {limit: number; }) => {
  const reset = createEvent();
  const getGoods = createEvent()

  const $goods = createStore<Product[]>([]);
  $goods.reset(reset);
  const $total = createStore<number>(0);
  // get goods data from bd

  const getGoodsFx = createEffect(
      async ({
               byPriceRange,
               filterByOrder,
             }: {
        byPriceRange?: { min: number; max: number };
        filterByOrder?: "asc" | "desc";
      }) => {
        return await getProducts({
          goodsLimit: limit,
          filterByOrder,
          byPriceRange,
        });
      }
  );

  sample({
    clock: [getGoods],
    fn: () => ({}),
    target: getGoodsFx,
  });

  // TODO REFACTOR THIS
  //put goods and total goods into stores
  sample({
    clock: getGoodsFx.doneData,
    fn: ({ goods, total }) => ({
      goods,
      total
    }),
    target: spread({
      targets: {
        goods: $goods,
        total: $total
      }
    }),
  });


  return {
    getGoods,
    reset,
    $goods,
    $isFetching: getGoodsFx.pending,
    $total,
    getGoodsFx,
  };
};

export const createProductModel = () => {
  const reset = createEvent();
  const $product = createStore<Product>({} as Product);
  // get single product by id
  const getProductFx = createEffect(async ({ id }: { id: string }) => {
    const product = await getProduct(id);
    return product;
  });

  $product.reset(reset);

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