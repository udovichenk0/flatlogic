import { createEvent, createStore, sample } from "effector";

import { createCartModel } from "@/features/cart/toggle-favorite";
import { createModal } from "@/shared/lib/modal";
import { createRoute } from "atomic-router";
const reset = createEvent();
const closeOnOverlayClick = createEvent<{
  ref: HTMLInputElement | null;
  target: EventTarget;
}>();

export const openModalById = createEvent<string>();

//Factories
export const featureCartModel = createCartModel();
export const modal = createModal({ closeOnOverlayClick });

//active id of detailed cart product
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
