import { createEvent, sample } from "effector";
import { spread } from "patronum";

import { changeFeedbackFx, getReviewsFx, leaveFeedbackFx } from "@/shared/api/feedback";
import { createModal } from "@/shared/lib/modal";
import { productRoutes } from "@/shared/routing";

import { createFeedbackModel } from "@/entities/feedback";
import { createProductModel } from "@/entities/product";
import { $session, User } from "@/entities/session";

import { feedbackFactory } from "@/features/feedback";
import { createCartModel } from "@/features/toggle-favorite";

const pageOpened = createEvent();

export const $$product = createProductModel();
export const $$feedback = createFeedbackModel();
export const $$modal = createModal({});
export const $$featureCartModel = createCartModel();

export const feedbackModel = feedbackFactory.createModel()

sample({
  clock: [productRoutes.route.opened, productRoutes.route.updated, pageOpened],
  source: productRoutes.route.$params,
  fn: (id: any) => id,
  target: $$product.getProductTriggered,
});
sample({
  clock: [
    productRoutes.route.opened,
    productRoutes.route.updated,
    $session,
    leaveFeedbackFx.done,
    changeFeedbackFx,
    pageOpened,
  ],
  source: {params: productRoutes.route.$params, session: $session},
  fn: ({ params, session }: {params: any, session: User}) => ({
    productId: params.id,
    userId: session.id,
  }),
  target: $$feedback.getReviewsTriggered,
});
sample({
  clock: getReviewsFx.doneData,
  source: $session,
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
sample({
  clock: productRoutes.route.closed,
  target: [$$product.reset, $$feedback.reset],
});

sample({
  clock: [leaveFeedbackFx.done, changeFeedbackFx.done],
  target: [$$modal.close],
});

pageOpened();
