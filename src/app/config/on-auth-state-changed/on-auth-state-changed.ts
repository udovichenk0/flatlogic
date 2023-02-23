import { createEffect, sample } from "effector";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import { cartModel } from "@/entities/cart";
import { sessionModel } from "@/entities/session";

const auth = getAuth();
export const onAuthStateChangedFx = createEffect(async () => {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      sessionModel.getUserFx({ uid: user.uid });
      sample({
        clock: sessionModel.getUserFx.doneData,
        source: cartModel.$cart,
        fn: (cartFromLs, user) => {
          return cartModel.mergeArrayOfObjects(user.cart, cartFromLs);
        },
        target: cartModel.$cart,
      });
    } else {
      sample({
        clock: sessionModel.authFailed,
        fn: () => JSON.parse(localStorage.getItem("products") || "[]"),
        target: cartModel.$cart,
      });
      sessionModel.authFailed();
    }
  });
});
