import { cartModel } from "@/entities/cart";
import { addToCard, CartItem } from "@/shared/api/User";
import { createEffect, createEvent, sample } from "effector";

export const obj = {};
export const startAddingToCart = createEvent<CartItem>();
export const successAddedToCart = createEvent();
export const failAddedToCard = createEvent();

const addToCartFx = createEffect(async (data: CartItem) => {
  //   const res = await addToCard(data);
  return data;
});

sample({
  clock: startAddingToCart,
  target: addToCartFx,
});

sample({
  clock: addToCartFx.doneData,
  source: cartModel.$cart,
  fn: (cart, newItem) => [...cart, newItem],
  target: cartModel.$cart,
});
