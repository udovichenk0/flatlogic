import { createEvent, createStore, sample, split, Store } from "effector";

import { notification } from "@/entities/notification";

import { createCartModel } from "@/features/cart/save-to-cart";
import { createModal } from "@/shared/lib/modal";
import { condition, debug } from "patronum";
import { cartModel } from "@/entities/cart";

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

const reset = createEvent();
const closeOnOverlayClick = createEvent<{
  ref: HTMLInputElement | null;
  target: EventTarget;
}>();
export const modal = createModal({ closeOnOverlayClick });

export const openModalById = createEvent<string>();
export const $openedModal = createStore<string>("").reset(reset);

export const check = createEvent<string>();

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
