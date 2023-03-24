import { createEvent, createStore, sample } from "effector";

export const createModal = ({
  closeOnOverlayClick = true,
}: {
  closeOnOverlayClick?:boolean
}) => {
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

  const closeOnOverlayClickTriggered = createEvent<{
    ref: HTMLInputElement | null;
    target: EventTarget;
  }>();

  if (closeOnOverlayClick) {
    sample({
      clock: closeOnOverlayClickTriggered,
      filter: ({ ref, target }) => ref === target,
      target: close,
    });
  }
  return {
    $isOpened,
    close,
    open,
    closeOnOverlayClickTriggered,
  };
};
