import { createEffect, sample } from "effector";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import { $cart, mergeArrayOfObjects } from "@/entities/cart";
import { authFailed, authSuccessed, getUserFx } from "@/entities/session";

const auth = getAuth();
export const onAuthStateChangedFx = createEffect(async () => {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      getUserFx({ uid: user.uid });
      sample({
        clock: getUserFx.doneData,
        source: $cart,
        fn: (cartFromLs, user) => {
          return mergeArrayOfObjects(user.cart, cartFromLs);
        },
        target: [$cart, authSuccessed],
      });
    } else {
      sample({
        clock: authFailed,
        fn: () => JSON.parse(localStorage.getItem("products") || "[]"),
        target: $cart,
      });
      authFailed();
    }
  });
});
