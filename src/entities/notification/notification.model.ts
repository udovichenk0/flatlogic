import { Event, sample, createEffect } from "effector";
import { toast } from "react-toastify";
type notificationType = "success" | "info" | "error";

const displayNotification = createEffect(
  ({ type, message }: { type: notificationType; message: string }) => {
    return toast(message, {
      type,
      pauseOnFocusLoss: false,
      pauseOnHover: false,
      icon: false,
    });
  }
);
export const notification = <K>({
  clock,
  type,
  message,
}: {
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
