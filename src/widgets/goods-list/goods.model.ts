import { createEvent, createStore, sample } from "effector";

import { notification } from "@/entities/notification";

import { createCartModel } from "@/features/cart/save-to-cart";
import { createModal } from "@/shared/lib/modal";
import { debug } from "patronum";

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

const closeOnOverlayClick = createEvent<{
  ref: HTMLInputElement | null;
  target: EventTarget;
}>();
export const modal = createModal({ closeOnOverlayClick });
export const openModalById = createEvent<string>();
const reset = createEvent();
export const $openedModal = createStore<string>("").reset(reset);
sample({
  clock: openModalById,
  target: $openedModal,
});

sample({
  clock: $openedModal,
  filter: (id) => !!id,
  target: modal.open,
});

sample({
  clock: modal.close,
  target: reset,
});
