import { cartModel } from "@/entities/cart";
import { sessionModel } from "@/entities/session";
import { addToCart, CartItem, removeFromCart } from "@/shared/api/User";
import {
  attach,
  createEffect,
  createEvent,
  createStore,
  sample,
} from "effector";

export const createCartModel = () => {
  const startAddingToCart = createEvent<CartItem>();
  const successAddedToCart = createEvent();
  const failAddedToCard = createEvent();
  const itemRemoveTriggered = createEvent<{ deleteId: string }>();

  const addToCartFx = createEffect(
    async ({ id, data }: { id: string; data: CartItem }) => {
      const response = await addToCart(data, id);
      return response;
    }
  );

  const removeFromCartFx = createEffect(
    async ({ userId, deleteId }: { userId: string; deleteId: string }) => {
      const cart = await removeFromCart(userId, deleteId);
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

  sample({
    clock: itemRemoveTriggered,
    source: sessionModel.$session,
    fn: (session, { deleteId }) => ({
      userId: session.id,
      deleteId,
    }),
    target: removeFromCartFx,
  });

  sample({
    clock: addToCartFx.doneData,
    source: cartModel.$cart,
    fn: (cart, newItem) => [...cart, newItem],
    target: cartModel.$cart,
  });
  sample({
    clock: removeFromCartFx.doneData,
    source: cartModel.$cart,
    fn: (_, newCart) => newCart,
    target: cartModel.$cart,
  });

  return {
    startAddingToCart,
    itemRemoveTriggered,
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
