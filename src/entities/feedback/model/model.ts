import { getFeedbacks, Feedback } from "@/shared/api/Products";
import { createEffect, createStore, sample } from "effector";
import { debug } from "patronum";

export const createFeedbackModel = () => {
  const $reviews = createStore<Feedback[]>([]);
  const $isPending = createStore(false);

  // get all reviews
  const getReviewsFx = createEffect(
    async ({ productId, userId }: { productId: string; userId: string }) => {
      const reviews = await getFeedbacks(productId, userId);
      return reviews;
    }
  );
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
    $reviews,
    getReviewsFx,
  };
};
