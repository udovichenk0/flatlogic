import { notification } from "@/entities/notification";
import { sessionModel } from "@/entities/session";
import { leaveProductReview } from "@/shared/api/Products";
import {
  combine,
  createDomain,
  createEffect,
  createEvent,
  sample,
} from "effector";

const $session = sessionModel.$session;

const domain = createDomain();
domain.onCreateStore((st) => {
  st.reset(feedbackReset);
});

export const feedbackReset = createEvent();
export const rateChanged = createEvent<number>();
export const textareaChanged = createEvent<string>();
export const feedbackSubmitted = createEvent<string>();

export const $starRate = domain.createStore(1);
export const $textareaValue = domain.createStore("");

const $review = combine($starRate, $textareaValue, $session);

export const leaveReviewFx = createEffect(
  async ({
    id,
    review,
  }: {
    id: string;
    review: {
      rate: number;
      fullname: string;
      avatar_url: string;
      comment: string;
      date: Date;
    };
  }) => {
    const response = await leaveProductReview({ id, review });
    return response;
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
        fullname: `${session.name} ${session.second_name}`,
        avatar_url: session.avatar_url,
        comment,
        date: new Date(),
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
