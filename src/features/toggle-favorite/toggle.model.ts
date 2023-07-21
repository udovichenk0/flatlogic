import {
  attach,
  createEffect,
  createEvent,
  createStore,
  sample,
} from "effector";

import { addToCart, CartItem, removeFromCart } from "@/shared/api/user";

import { cartModel } from "@/entities/cart";
import { notification } from "@/entities/notification";
import { sessionModel } from "@/entities/session";

  export const createCartModel = () => {
  const favoriteToggled = createEvent<CartItem>();
  const successAdded = createEvent();
  const successRemoved = createEvent();

  const toggleFavoriteFx = attach({
    source: cartModel.$cart,
    mapParams: ({ data, id }, cart) => ({
      product: data,
      userId: id,
      cart,
    }),
    effect: createEffect(
      async ({
        cart,
        product,
        userId,
      }: {
        cart: CartItem[];
        product: CartItem;
        userId: string;
      }) => {
        const isProductInCart = cart.find(({ id }) => id == product.id);
        if (isProductInCart) {
          return await removeFromCart(userId, isProductInCart.id);
        }
        return await addToCart(userId, product);
      }
    ),
  });
  const toggleCartFromLSFx = attach({
    source: cartModel.$cart,
    mapParams: (product:CartItem, cart:CartItem[]) => ({
      cart,
      product,
    }),
    effect: createEffect(
      async ({ cart, product }: { product: CartItem; cart: CartItem[] }) => {
        const isProductInCart = cart.find(({ id }) => id == product.id);
        if (isProductInCart) {
          const newCart = cart.filter(({ id }) => id != product.id);
          localStorage.setItem("products", JSON.stringify(newCart));
          return JSON.parse(localStorage.getItem("products") || "[]");
        } else {
          localStorage.setItem("products", JSON.stringify([...cart, product]));
          return JSON.parse(localStorage.getItem("products") || "[]");
        }
      }
    ),
  });

  sample({
    clock: favoriteToggled,
    source: sessionModel.$session,
    filter: (session) => !!session.id,
    fn: (session, data) => ({
      id: session.id,
      data,
    }),
    target: toggleFavoriteFx,
  });

  sample({
    clock: favoriteToggled,
    source: sessionModel.$session,
    filter: (session) => !session.id,
    fn: (_, product) => product,
    target: toggleCartFromLSFx,
  });

  sample({
    clock: toggleFavoriteFx.doneData,
    source: cartModel.$cart,
    filter: (cart, newCart) => cart.length > newCart.length,
    fn: (_, newCart) => newCart,
    target: [cartModel.$cart, successRemoved],
  });

  sample({
    clock: toggleFavoriteFx.doneData,
    source: cartModel.$cart,
    filter: (cart, newCart) => cart.length < newCart.length,
    fn: (_, newCart) => newCart,
    target: [cartModel.$cart, successAdded],
  });

  sample({
    clock: toggleCartFromLSFx.doneData,
    source: cartModel.$cart,
    filter: (cart, newCart) => cart.length > newCart.length,
    fn: (_, newCart) => newCart,
    target: [cartModel.$cart, successRemoved],
  });

  sample({
    clock: toggleCartFromLSFx.doneData,
    source: cartModel.$cart,
    filter: (cart, newCart) => cart.length < newCart.length,
    fn: (_, newCart) => newCart,
    target: [cartModel.$cart, successAdded],
  });

  notification({
    clock: successAdded,
    type: "success",
    message: "product added to your cart",
  });

  notification({
    clock: successRemoved,
    type: "success",
    message: "product removed from your cart",
  });

  return {
    toggleFavoriteFx,
    toggleCartFromLSFx,
    favoriteToggled,
  };
};

