import { createEvent, createStore } from "effector";

import { CartItem } from "@/shared/api/user";

export const cartReset = createEvent();

export const $cart = createStore<CartItem[]>([]);

$cart.reset(cartReset);

export function mergeArrayOfObjects(array: CartItem[], newArray: CartItem[]) {
  const ids = new Set(array.map((cart) => cart.id));

  return [...array, ...newArray.filter(({ id }) => !ids.has(id))];
}
