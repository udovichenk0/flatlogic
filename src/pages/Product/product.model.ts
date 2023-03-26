import { combine, createEvent, sample } from "effector";
import {spread} from "patronum";

import { createModal } from "@/shared/lib/modal";
import { productRoutes } from "@/shared/routing";

import {createFeedbackModel} from "@/entities/feedback";
import { createProductModel } from "@/entities/product";
import { sessionModel } from "@/entities/session";

import {feedbackFactory} from "@/features/feedback";
import { createCartModel } from "@/features/toggle-favorite";


const pageOpened = createEvent();

export const $$product = createProductModel();
export const $$feedback = createFeedbackModel();
export const $$modal = createModal({});
export const $$featureCartModel = createCartModel();

export const feedbackModel = feedbackFactory.createModel()


// fetch product on opened/updated page
sample({
  clock: [productRoutes.route.opened, productRoutes.route.updated, pageOpened],
  source: productRoutes.route.$params,
  fn: (id: any) => id,
  target: $$product.getProductFx,
});

// fetch reviews on opened/updated page and when we leave new feedback(to update view)
sample({
  clock: [
    productRoutes.route.opened,
    productRoutes.route.updated,
    sessionModel.$session,
    feedbackModel.leaveReviewFx.done,
    pageOpened,
  ],
  source: combine(productRoutes.route.$params, sessionModel.$session),
  fn: ([params, session]: any) => ({
    productId: params.id,
    userId: session.id,
  }),
  target: $$feedback.getReviewsTriggered,
});

// after we get feedbacks we need to take that one user left, then restore $starRate, $textareaValue with values from that feedback
sample({
  clock: $$feedback.getReviewsFx.doneData,
  source: sessionModel.$session,
  fn: (user, data) => {
    const usersFeedback = data.find(({ userId }) => userId == user.id);
    return {
      rate: usersFeedback?.rate || 1,
      comment: usersFeedback?.comment || ""
    }
  },
  target: spread({
    targets: {
      rate: feedbackModel.$starRate,
      comment: feedbackModel.$textareaValue
    }
  }),
});

//on close events
// reset store on closed page
sample({
  clock: productRoutes.route.closed,
  target: $$product.reset,
});

// close modal when leaveReviewFx success
sample({
  clock: feedbackModel.leaveReviewFx.done,
  target: [$$modal.close],
});

pageOpened();
