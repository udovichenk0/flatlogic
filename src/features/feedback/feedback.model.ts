import {
  combine,
  createEffect,
  createEvent,
  createStore,
  merge,
  sample,
} from "effector";
import {modelFactory} from "effector-factorio";

import { changeFeedbackFx, leaveFeedbackFx } from "@/shared/api/feedback";

import { notification } from "@/entities/notification";
import { $session } from "@/entities/session";

  export const feedbackFactory = modelFactory(() => {
    const rateChanged = createEvent<number>();
    const textareaChanged = createEvent<string>();
    const feedbackSubmitted = createEvent<{id: string, isCommented: boolean}>();
    const $starRate = createStore(1);
    const $textareaValue = createStore("");

    const $review = combine($starRate, $textareaValue, $session);

    
    sample({
      clock: rateChanged,
      target: $starRate,
    });
    sample({
      clock: textareaChanged,
      target: $textareaValue,
    });
    sample({
      clock: feedbackSubmitted,
      source: $review,
      fn: ([starRate, comment, session], {id}) => {
        return {
          id,
          feedback: {
            rate: starRate,
            fullname: `${session.name} ${session.surname}`,
            avatar_url: session.avatar_url,
            comment,
            date: new Date(),
            userId: session.id,
          },
        };
      },
      filter: (_, { isCommented }) => !isCommented,
      target: leaveFeedbackFx
    })
    
    sample({
      clock: feedbackSubmitted,
      source: $review,
      fn: ([starRate, comment, session], {id}) => {
        return {
          id,
          feedback: {
            rate: starRate,
            fullname: `${session.name} ${session.surname}`,
            avatar_url: session.avatar_url,
            comment,
            date: new Date(),
            userId: session.id,
          },
        };
      },
      filter: (_, { isCommented }) => isCommented,
      target: changeFeedbackFx
    })

// show notification on success
    notification({
      clock: merge([leaveFeedbackFx.done, changeFeedbackFx.done]),
      type: "success",
      message: "Feedback successfully left",
    });
    
    return {
      rateChanged,
      textareaChanged,
      feedbackSubmitted,
      $starRate,
      $textareaValue,
    }
  })
