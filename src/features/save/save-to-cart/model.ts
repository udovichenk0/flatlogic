import { cartModel } from "@/entities/cart";
import { sessionModel } from "@/entities/session";
import { addToCard, CartItem } from "@/shared/api/User";
import { createEffect, createEvent, sample } from "effector";

export const obj = {};
export const startAddingToCart = createEvent<CartItem>();
export const successAddedToCart = createEvent();
export const failAddedToCard = createEvent();

const addToCartFx = createEffect(
  async ({ id, data }: { id: string; data: CartItem }) => {
    await addToCard(data, id);
    return data;
  }
);

sample({
  clock: startAddingToCart,
  source: sessionModel.$session,
  fn: (session, data) => ({
    id: session.id,
    data,
  }),
  target: addToCartFx,
});

sample({
  clock: addToCartFx.doneData,
  source: cartModel.$cart,
  fn: (cart, newItem) => [...cart, newItem],
  target: cartModel.$cart,
});
