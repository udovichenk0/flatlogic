import {
  combine,
  createEffect,
  createEvent,
  createStore,
  sample,
} from "effector";
import {modelFactory} from "effector-factorio";

import {
  Feedback,
  getUsersFeedback,
  leaveFeedback,
  updateFeedback,
} from "@/shared/api/Products";

import { notification } from "@/entities/notification";
import { sessionModel } from "@/entities/session";

  export const feedbackFactory = modelFactory(() => {
    const $session = sessionModel.$session;
    const rateChanged = createEvent<number>();
    const textareaChanged = createEvent<string>();
    const feedbackSubmitted = createEvent<string>();
    const $starRate = createStore(1);
    const $textareaValue = createStore("");

    const $review = combine($starRate, $textareaValue, $session);

    const leaveReviewFx = createEffect(
        async ({ id, review }: { id: string; review: Feedback }) => {
          const feedbacks = await getUsersFeedback(id, review.userId);
          if (feedbacks) {
            return await updateFeedback(id, review);
          }
          return await leaveFeedback({ id, review });
        }
    );

    sample({
      clock: rateChanged,
      target: $starRate,
    });
    sample({
      clock: textareaChanged,
      target: $textareaValue,
    });
// leave a feedback about product

    sample({
      clock: feedbackSubmitted,
      source: $review,
      fn: ([starRate, comment, session], id) => {
        return {
          id,
          review: {
            rate: starRate,
            fullname: `${session.name} ${session.surname}`,
            avatar_url: session.avatar_url,
            comment,
            date: new Date(),
            userId: session.id,
          },
        };
      },
      target: leaveReviewFx,
    });


// show notification on success
    notification({
      clock: leaveReviewFx.done,
      type: "success",
      message: "Feedback successfully left",
    });
    
    return {
      rateChanged,
      textareaChanged,
      feedbackSubmitted,
      $starRate,
      $textareaValue,
      leaveReviewFx
    }
  })


  const $session = sessionModel.$session;

  export const rateChanged = createEvent<number>();
  export const textareaChanged = createEvent<string>();
  export const feedbackSubmitted = createEvent<string>();
  export const $starRate = createStore(1);
  export const $textareaValue = createStore("");
  const $review = combine($starRate, $textareaValue, $session);

  export const leaveReviewFx = createEffect(
      async ({ id, review }: { id: string; review: Feedback }) => {
        const feedbacks = await getUsersFeedback(id, review.userId);
        if (feedbacks) {
          return await updateFeedback(id, review);
        }
        return await leaveFeedback({ id, review });
      }
  );

  sample({
    clock: rateChanged,
    target: $starRate,
  });
  sample({
    clock: textareaChanged,
    target: $textareaValue,
  });
// leave a feedback about product

  sample({
    clock: feedbackSubmitted,
    source: $review,
    fn: ([starRate, comment, session], id) => {
      return {
        id,
        review: {
          rate: starRate,
          fullname: `${session.name} ${session.surname}`,
          avatar_url: session.avatar_url,
          comment,
          date: new Date(),
          userId: session.id,
        },
      };
    },
    target: leaveReviewFx,
  });


// show notification on success
  notification({
    clock: leaveReviewFx.done,
    type: "success",
    message: "Feedback successfully left",
  });
