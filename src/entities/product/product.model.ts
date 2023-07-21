import {
  createEvent,
  createStore,
  sample,
} from "effector";
import { spread } from "patronum";

import { Product, getProductFx, productsFx } from "@/shared/api/products";
export const createGoodsListModel = ({limit}: {limit: number; }) => {
  const reset = createEvent();
  const getGoods = createEvent()

  const $products = createStore<Product[]>([]);
  $products.reset(reset);
  const $total = createStore<number>(0);

  sample({
    clock: getGoods,
    fn: () => ({ productLimit: limit }),
    target: productsFx,
  });

  sample({
    clock: productsFx.doneData,
    fn: ({ goods, total }) => ({goods,total}),
    target: spread({
      targets: {
        goods: $products,
        total: $total
      }
    }),
  });


  return {
    getGoods,
    reset,
    $products,
    $isFetching: productsFx.pending,
    $total,
  };
};

export const createProductModel = () => {
  const reset = createEvent();
  const $product = createStore<Product>({} as Product);

  $product.reset(reset);
  const getProductTriggered = createEvent<{id: string}>();
  
  sample({
    clock: getProductTriggered,
    target: getProductFx
  })
  sample({
    clock: getProductFx.doneData,
    target: $product,
  });
  return {
    $product,
    reset,
    getProductTriggered
  };
};