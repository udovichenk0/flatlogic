import {createEffect, createEvent, createStore, sample} from "effector";

import { getFeedbacks, Feedback } from "@/shared/api/Products";

export const createFeedbackModel = () => {
  const getReviews = createEvent<{productId: string, userId: string}>()
  const $reviews = createStore<Feedback[]>([]);
  const $isPending = createStore(false);
  const $rates = createStore<number[]>([]);
  // get all reviews
  const getReviewsFx = createEffect(
    async ({ productId, userId }: { productId: string; userId: string }) => {
      const reviews = (await getFeedbacks(productId, userId)) as Feedback[];
      return reviews;
    }
  );

  sample({
    clock: getReviews,
    target: getReviewsFx
  })

  sample({
    clock: getReviewsFx.doneData,
    fn: (reviews) => {
      return reviews.map(({ rate }) => rate);
    },
    target: $rates,
  });

  //TODO Delete feedback
  //fill the store
  sample({
    clock: getReviewsFx.doneData,
    target: $reviews,
  });

  //toggle pending state
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
    getReviews,
    getReviewsFx,
  };
};
