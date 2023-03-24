import { combine, createEvent, sample } from "effector";
import {spread} from "patronum";

import { createModal } from "@/shared/lib/modal";
import { productRoutes } from "@/shared/routing";

import {createFeedbackModel} from "@/entities/feedback";
import { createProductModel } from "@/entities/product";
import { sessionModel } from "@/entities/session";

import { createCartModel } from "@/features/cart/toggle-favorite";
import { leaveReviewFx, $starRate, $textareaValue} from "@/features/feedback";


const pageOpened = createEvent();

export const $$product = createProductModel();
export const $$feedback = createFeedbackModel();
export const $$modal = createModal({});
export const $$featureCartModel = createCartModel();


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
    leaveReviewFx.done,
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
      rate: $starRate,
      comment: $textareaValue
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
  clock: leaveReviewFx.done,
  target: [$$modal.close],
});

pageOpened();
