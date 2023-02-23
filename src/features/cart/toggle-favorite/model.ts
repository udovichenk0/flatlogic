import {
  attach,
  createEffect,
  createEvent,
  createStore,
  sample,
} from "effector";

import { addToCart, CartItem, removeFromCart } from "@/shared/api/User";

import { cartModel } from "@/entities/cart";
import { notification } from "@/entities/notification";
import { sessionModel } from "@/entities/session";

export const createCartModel = () => {
  const $isPending = createStore(true);
  const favoriteToggled = createEvent<CartItem>();
  const successAdded = createEvent();
  const successRemoved = createEvent();

  // add/remove product to/from cart
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
          const newCart = await removeFromCart(userId, isProductInCart.id);
          return newCart;
        }
        const newCart = await addToCart(userId, product);
        return newCart;
      }
    ),
  });

  const toggleCartFromLS = attach({
    source: cartModel.$cart,
    mapParams: ({ data }, cart) => ({
      cart,
      product: data,
    }),
    effect: createEffect(
      async ({ cart, product }: { product: CartItem; cart: CartItem[] }) => {
        const isProductInCart = cart.find(({ id }) => id == product.id);
        // if product in localstorage then remove from it, else add to
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

  // toggleFavorite on event triggered // when user is authenticated
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
  // toggle favorite in localStorage when user is not authorized
  sample({
    clock: favoriteToggled,
    source: sessionModel.$session,
    filter: (session) => !session.id,
    fn: (_, data) => ({ data }),
    target: toggleCartFromLS,
  });

  //TODO write logic, when user is anonymous // add to localStorage, then merge products from LS with bd

  // update cart
  //remove from the cart
  sample({
    clock: toggleFavoriteFx.doneData,
    source: cartModel.$cart,
    filter: (cart, newCart) => cart.length > newCart.length,
    fn: (_, newCart) => newCart,
    target: [cartModel.$cart, successRemoved],
  });
  // added to the cart
  sample({
    clock: toggleFavoriteFx.doneData,
    source: cartModel.$cart,
    filter: (cart, newCart) => cart.length < newCart.length,
    fn: (_, newCart) => newCart,
    target: [cartModel.$cart, successAdded],
  });
  // update cart from localStorage
  sample({
    clock: toggleCartFromLS.doneData,
    source: cartModel.$cart,
    filter: (cart, newCart) => cart.length > newCart.length,
    fn: (_, newCart) => newCart,
    target: [cartModel.$cart, successRemoved],
  });

  sample({
    clock: toggleCartFromLS.doneData,
    source: cartModel.$cart,
    filter: (cart, newCart) => cart.length < newCart.length,
    fn: (_, newCart) => newCart,
    target: [cartModel.$cart, successAdded],
  });

  // show toasts when FX are done
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
  //TODO show notification on failed try to add to the store

  return {
    toggleFavoriteFx,
    favoriteToggled,
    $isPending,
  };
};

//=======TEST======

// const fakeItem = {
//   description: "a;osdifjasdf",
//   id: "asdiafsodfi",
//   price: 20,
//   title: "asdfasdf",
//   type: "asdfasdf",
//   url: "adfjasdifjio",
// };

// const itemRemoveSubmitted = createEvent<{ deleteId: string }>();
// const startTimer = createEvent();
// const stopTimer = createEvent();

// const { tick, isRunning } = interval({
//   timeout: 1000,
//   start: startTimer,
//   stop: stopTimer,
//   leading: true,
// });

// type KvStore = Record<
//   string,
//   {
//     product: CartItem;
//     timeLeft: number;
//   }
// >;

// const $meta = createStore<KvStore>({
//   "asdfasdf": { product: fakeItem, timeLeft: 10 },
//   "123123": { product: fakeItem, timeLeft: 5 },
//   // "12": { product: fakeItem, timeLeft: 5 },
//   // "123": { product: fakeItem, timeLeft: 5 },
//   // "1234": { product: fakeItem, timeLeft: 5 },
//   // "124443": { product: fakeItem, timeLeft: 5 },
// } as KvStore);

// const handleRemoveFx = attach({
//   source: $meta,
//   effect: (meta) => {
//     const clone = { ...meta };
//     Object.entries(clone).forEach(([ID, { timeLeft, product }]) => {
//       if (timeLeft != 0) return;
//       delete clone[ID];
//       itemRemoveSubmitted({ deleteId: product.id });
//     });
//     return clone;
//   },
// });

// sample({
//   clock: handleRemoveFx.doneData,
//   target: $meta,
// });

// sample({
//   clock: tick,
//   target: handleRemoveFx,
// });

// sample({
//   clock: tick,
//   source: $meta,
//   fn: (meta) => {
//     const clone = { ...meta };
//     Object.keys(clone).forEach((id) => {
//       if (clone[id].timeLeft) {
//         clone[id].timeLeft -= 1;
//         console.log(clone);
//       }
//     });
//     return clone;
//   },
//   target: $meta,
// });

// startTimer();

// // when itemRmoveSubmitted remove item from db
// sample({
//   clock: itemRemoveSubmitted,
//   source: sessionModel.$session,
//   fn: (session, { deleteId }) => ({
//     deleteId,
//     userId: session.id,
//   }),
//   target: removeFromCartFx,
// });

// //when $meta is empty stop the timer
// sample({
//   clock: removeFromCartFx.done,
//   source: $meta,
//   filter: (meta) => !Object.keys(meta).length,
//   target: stopTimer,
// });
// //start timer when itemRemoveTriggered
// sample({
//   clock: itemRemoveTriggered,
//   target: startTimer,
// });
// //itemRemoveTriggered

//============================
