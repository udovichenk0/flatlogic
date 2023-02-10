import { createEvent, createStore, sample, Event } from "effector";
import { debug } from "patronum";

export const createModal = ({
  closeOnOverlayClick,
}: {
  closeOnOverlayClick?: Event<{
    ref: HTMLInputElement | null;
    target: EventTarget;
  }>;
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

  if (closeOnOverlayClick) {
    sample({
      clock: closeOnOverlayClick,
      filter: ({ ref, target }) => ref === target,
      target: close,
    });
  }
  return {
    $isOpened,
    close,
    open,
    closeOnOverlayClick,
  };
};
