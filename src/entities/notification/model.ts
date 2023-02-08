import { Store, Event, sample, attach, createEffect } from "effector";
import { toast } from "react-toastify";
type notificationType = "success" | "info" | "error";

const displayNotification = createEffect(
  ({ type, message }: { type: notificationType; message: string }) => {
    return toast(message, {
      type,
      pauseOnFocusLoss: false,
      pauseOnHover: false,
    });
  }
);
export const notification = <T, K>({
  store,
  clock,
  type,
  message,
}: {
  store?: Store<T>;
  clock: Event<K>;
  type: notificationType;
  message: string;
}) => {
  sample({
    clock,
    fn: () => ({
      type,
      message,
    }),
    target: displayNotification,
  });
};
