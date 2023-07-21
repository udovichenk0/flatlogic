import {createEffect, createEvent, createStore, sample} from "effector";

import { Feedback, getFeedbacks } from "@/shared/api/feedback";



export const createFeedbackModel = () => {
  const getReviewsTriggered = createEvent<{productId: string, userId: string}>()
  const $reviews = createStore<Feedback[]>([]);
  const $isPending = createStore(false);
  const $rates = createStore<number[]>([]);

  const getReviewsFx = createEffect(
    async ({ productId, userId }: { productId: string; userId: string }) => {
      return (await getFeedbacks(productId, userId)) as Feedback[];
    }
  );

  sample({
    clock: getReviewsTriggered,
    target: getReviewsFx
  })

  sample({
    clock: getReviewsFx.doneData,
    fn: (reviews) => {
      return reviews.map(({ rate }) => rate);
    },
    target: $rates,
  });

  sample({
    clock: getReviewsFx.doneData,
    target: $reviews,
  });

  sample({
    clock: getReviewsFx,
    fn: () => true,
    target: $isPending,
  });
  sample({
    clock: getReviewsFx,
    fn: () => false,
    target: $isPending,
  });
  
  return {
    $isPending,
    $rates,
    $reviews,
    getReviewsTriggered,
    getReviewsFx,
  };
};
