import { notification } from "@/entities/notification";
import { createCartModel } from "@/features/cart/save-to-cart";
import { sample } from "effector";

export const featureCartModel = createCartModel();

sample({
  clock: featureCartModel.addToCartFx.done,
  target: featureCartModel.successAddedToCart,
});

notification({
  clock: featureCartModel.successAddedToCart,
  type: "success",
  message: "product successfully added to your cart",
});
