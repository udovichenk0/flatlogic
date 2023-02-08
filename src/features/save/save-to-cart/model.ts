import { cartModel } from "@/entities/cart";
import { sessionModel } from "@/entities/session";
import { addToCart, CartItem, updateCart } from "@/shared/api/User";
import { createEffect, createEvent, sample, merge, split } from "effector";

export const obj = {};
export const startAddingToCart = createEvent<CartItem>();
export const successAddedToCart = createEvent();
export const failAddedToCard = createEvent();
export const removeItemTriggered = createEvent<{
  cart: CartItem[];
  id: string;
}>();
const addToCartFx = createEffect(
  async ({ id, data }: { id: string; data: CartItem }) => {
    await addToCart(data, id);
    return data;
  }
);

const updateCartFx = createEffect(
  async ({ userId, cart }: { userId: string; cart: CartItem[] }) => {
    await updateCart(userId, cart);
    return cart;
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
/*
cart
*/
sample({
  clock: removeItemTriggered,
  source: sessionModel.$session,
  fn: (session, data) => {
    return {
      cart: data.cart.filter(({ id }) => id !== data.id),
      userId: session.id,
    };
  },
  target: updateCartFx,
});

sample({
  clock: addToCartFx.doneData,
  source: cartModel.$cart,
  fn: (cart, newItem) => [...cart, newItem],
  target: cartModel.$cart,
});
sample({
  clock: updateCartFx.doneData,
  source: cartModel.$cart,
  fn: (_, newCart) => newCart,
  target: cartModel.$cart,
});
