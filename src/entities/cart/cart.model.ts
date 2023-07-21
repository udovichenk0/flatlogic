import { createEvent, createStore } from "effector";

import { CartProduct } from "./type";


export const cartReset = createEvent();

export const $cart = createStore<CartProduct[]>([]);

$cart.reset(cartReset);

export function mergeArrayOfObjects(array: CartProduct[], newArray: CartProduct[]) {
  const ids = new Set(array.map((cart) => cart.id));

  return [...array, ...newArray.filter(({ id }) => !ids.has(id))];
}
