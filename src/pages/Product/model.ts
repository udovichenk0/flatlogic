import { combine, createEvent, sample } from "effector";

import { createModal } from "@/shared/lib/modal";
import { productRoutes } from "@/shared/routing";

import { createFeedbackModel } from "@/entities/feedback";
import { createProductModel } from "@/entities/product";
import { sessionModel } from "@/entities/session";

import { createCartModel } from "@/features/cart/toggle-favorite";
import { $starRate, $textareaValue, leaveReviewFx } from "@/features/feedback";

const pageOpened = createEvent();

const closeOnOverlayClick = createEvent<{
  ref: HTMLInputElement | null;
  target: EventTarget;
}>();

export const $$product = createProductModel();
export const $$feedback = createFeedbackModel();
const $sessionUser = sessionModel.$session;

export const $$modal = createModal({ closeOnOverlayClick });
export const featureCartModel = createCartModel();

// fetch product on opened/updated page
sample({
  clock: [productRoutes.route.opened, productRoutes.route.updated, pageOpened],
  source: productRoutes.route.$params,
  fn: (id: any) => id,
  target: $$product.getProductFx,
});

// fetch reviews on opened/updated page and when we leave new feedback(to update veiw)
sample({
  clock: [
    productRoutes.route.opened,
    productRoutes.route.updated,
    $sessionUser,
    leaveReviewFx.done,
    pageOpened,
  ],
  source: combine(productRoutes.route.$params, $sessionUser),
  fn: ([params, session]: any) => ({
    productId: params.id,
    userId: session.id,
  }),
  target: $$feedback.getReviews,
});

// after we get feedbacks we need to take that one user left, then restore $starRate, $textareaValue with values from that feedback
sample({
  clock: $$feedback.getReviewsFx.doneData,
  source: $sessionUser,
  fn: (user, data) => {
    const usersFeedback = data.find(({ userId }) => userId == user.id);
    return usersFeedback ? usersFeedback.rate : 1;
  },
  target: $starRate,
});

sample({
  clock: $$feedback.getReviewsFx.doneData,
  source: $sessionUser,
  fn: (user, data) => {
    const usersFeedback = data.find(({ userId }) => userId == user.id);
    return usersFeedback ? usersFeedback.comment : "";
  },
  target: $textareaValue,
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
