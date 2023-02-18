import { createProductModel } from "@/entities/product";
import { createFeedbackModel } from "@/entities/feedback";
import { sessionModel } from "@/entities/session";
import { createCartModel } from "@/features/cart/toggle-favorite";
import {
  $starRate,
  $textareaValue,
  feedbackReset,
  leaveReviewFx,
} from "@/features/feedback";
import { createModal } from "@/shared/lib/modal";
import { MainLayout } from "@/widgets/Layouts/main-layout";
import { createRoute } from "atomic-router";
import { combine, createEvent, sample } from "effector";
import { lazy } from "react";
import { debug } from "patronum";
const ProductLazy = lazy(() => import("./ui"));

export const closeOnOverlayClick = createEvent<{
  ref: HTMLInputElement | null;
  target: EventTarget;
}>();

export const loaded = createEvent();

export const $$product = createProductModel();
export const $$feedback = createFeedbackModel();
const $sessionUser = sessionModel.$session;

export const $$modal = createModal({ closeOnOverlayClick });
export const featureCartModel = createCartModel();
const route = createRoute();

// fetch product on opened/updated page
sample({
  clock: [route.opened, route.updated],
  source: route.$params,
  fn: (id: any) => id,
  target: $$product.getProductFx,
});

// fetch reviews on opened/updated page and when we leave new feedback(to update veiw)
sample({
  clock: [route.opened, route.updated, loaded, leaveReviewFx.done],
  source: combine(route.$params, $sessionUser),
  filter: ([_, session]) => !!session.id,
  fn: ([params, session]: any) => ({
    productId: params.id,
    userId: session.id,
  }),
  target: $$feedback.getReviewsFx,
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
  clock: route.closed,
  target: $$product.reset,
});

// close modal when leaveReviewFx success
sample({
  clock: leaveReviewFx.done,
  target: [$$modal.close],
});
export const productRoute = { route };
export const ProductPage = {
  route,
  view: ProductLazy,
  layout: MainLayout,
};
