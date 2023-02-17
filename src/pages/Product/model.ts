import { createProductModel } from "@/entities/product";
import { createFeedbackModel } from "@/entities/feedback";
import { sessionModel } from "@/entities/session";
import { createCartModel } from "@/features/cart/toggle-favorite";
import {
  feedbackReset,
  feedbackSubmitted,
  leaveReviewFx,
} from "@/features/feedback";
import { createModal } from "@/shared/lib/modal";
import { MainLayout } from "@/widgets/Layouts/main-layout";
import { createRoute } from "atomic-router";
import { combine, createEvent, sample } from "effector";
import { lazy } from "react";
import { combineEvents } from "patronum";
const ProductLazy = lazy(() => import("./ui"));

export const closeOnOverlayClick = createEvent<{
  ref: HTMLInputElement | null;
  target: EventTarget;
}>();

export const $$product = createProductModel();
export const $$feedback = createFeedbackModel();
const $sessionUser = sessionModel.$session;

export const $$modal = createModal({ closeOnOverlayClick });
export const featureCartModel = createCartModel();
const route = createRoute();

// close modal when leaveReviewFx success
sample({
  clock: leaveReviewFx.done,
  target: [feedbackReset, $$modal.close],
});

// fetch product on opened/updated page
sample({
  clock: [route.opened, route.updated],
  source: route.$params,
  fn: (id: any) => id,
  target: $$product.getProductFx,
});

// fetch reviews on opened/updated page
sample({
  clock: [route.opened, route.updated, $sessionUser, leaveReviewFx.done],
  source: combine(route.$params, $sessionUser),
  filter: ([_, session]) => !!session.id,
  fn: ([params, session]: any) => ({
    productId: params.id,
    userId: session.id,
  }),
  target: $$feedback.getReviewsFx,
});

// reset store on closed page
sample({
  clock: route.closed,
  target: $$product.reset,
});

export const productRoute = { route };
export const ProductPage = {
  route,
  view: ProductLazy,
  layout: MainLayout,
};
