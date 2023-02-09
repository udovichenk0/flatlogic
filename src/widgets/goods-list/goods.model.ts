import { notification } from "@/entities/notification";
import { createCartModel } from "@/features/cart/save-to-cart";
import { sample } from "effector";

export const featureCartModel = createCartModel();
sample({
  clock: featureCartModel.addToCartFx.done,
  target: featureCartModel.successAddedToCart,
});
sample({
  clock: featureCartModel.removeFromCartFx,
  target: featureCartModel.successRemovedFromCart,
});

notification({
  clock: featureCartModel.successAddedToCart,
  type: "success",
  message: "product added to your cart",
});

notification({
  clock: featureCartModel.successRemovedFromCart,
  type: "success",
  message: "product removed from your cart",
});
