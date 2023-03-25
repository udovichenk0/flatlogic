import { createEvent, createStore, sample } from "effector";

import { createModal } from "@/shared/lib/modal";

import { createCartModel } from "@/features/toggle-favorite";
const reset = createEvent();

export const openModalById = createEvent<string>();

//Factories
export const featureCartModel = createCartModel();
export const modal = createModal({ });

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
