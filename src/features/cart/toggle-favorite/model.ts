import { cartModel } from "@/entities/cart";
import { notification } from "@/entities/notification";
import { sessionModel } from "@/entities/session";
import { addToCart, CartItem, removeFromCart } from "@/shared/api/User";
import {
  attach,
  createEffect,
  createEvent,
  createStore,
  sample,
} from "effector";
import { debug } from "patronum";

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
        const isInCart = cart.find(({ id }) => id == product.id);
        if (isInCart) {
          const cart = await removeFromCart(userId, isInCart.id);
          return cart;
        }
        const response = await addToCart(userId, product);
        return response;
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

  //TODO write logic, when user is anonymous // add to localStorage, then merge products from LS with bd

  // update cart
  //remove from the cart
  sample({
    clock: toggleFavoriteFx.doneData,
    filter: (favorites) => Array.isArray(favorites),
    fn: (favProducts) => [...(favProducts as CartItem[])],
    target: [cartModel.$cart, successRemoved],
  });
  // added to the cart
  sample({
    clock: toggleFavoriteFx.doneData,
    source: cartModel.$cart,
    filter: (_, favorite) => !Array.isArray(favorite),
    fn: (cart, favorite) => [...cart, favorite as CartItem],
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
