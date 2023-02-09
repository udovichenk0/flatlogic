import { createEvent, createStore, sample } from "effector";

export const createModal = () => {
  const $isOpened = createStore(false);
  const close = createEvent();
  const open = createEvent();

  sample({
    clock: open,
    fn: () => true,
    target: $isOpened,
  });
  sample({
    clock: close,
    fn: () => false,
    target: $isOpened,
  });

  return {
    $isOpened,
    close,
    open,
  };
};
