import { createEvent, createStore, sample } from "effector";

export const rateChanged = createEvent<number>();

export const $starRate = createStore(0);

sample({
  clock: rateChanged,
  target: $starRate,
});
