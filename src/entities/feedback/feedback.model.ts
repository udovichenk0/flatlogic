import { createEvent, createStore, sample} from "effector";

import { Feedback, getReviewsFx } from "@/shared/api/feedback";

export const createFeedbackModel = () => {
  const reset = createEvent();
  const getReviewsTriggered = createEvent<{productId: string, userId: string}>()
  const $reviews = createStore<Feedback[]>([]);
  const $rates = createStore<number[]>([]);

  sample({
    clock: getReviewsTriggered,
    target: getReviewsFx
  })
  sample({
    clock: reset,
    target: $reviews.reinit!
  })
  sample({
    clock: getReviewsFx.doneData,
    fn: (reviews) => reviews.map(({ rate }) => rate),
    target: $rates,
  });

  sample({
    clock: getReviewsFx.doneData,
    target: $reviews,
  });
  
  return {
    $isPending: getReviewsFx.pending,
    $rates,
    $reviews,
    getReviewsTriggered,
    reset
  };
};
