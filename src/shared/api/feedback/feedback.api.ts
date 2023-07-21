import { createEffect } from "effector";
import { getDoc, doc, updateDoc } from "firebase/firestore";

import { db } from "../firebase";
import { Product } from "../products";

import { Feedback } from "./types";

export const getReviewsFx = createEffect(
  async ({ 
    productId, 
    userId 
  }: { 
    productId: string; 
    userId: string 
  }) => {
    const productRef = await getDoc(doc(db, "Goods", productId));
    const product = productRef.data() as Product;
    const usersFeedback = product.reviews.find((review) => review.userId == userId);
    const feedbacks = product.reviews.filter((review) => review.userId != userId);
  return usersFeedback ? [usersFeedback, ...feedbacks] : [...feedbacks];
  }
);
export const changeFeedbackFx = createEffect(async ({id, feedback}: {id: string, feedback: Feedback}) => {
  const productRef = await getDoc(doc(db, "Goods", id));
  const product = productRef.data() as Product;
  const filteredFeedbacks = product.reviews.filter(
    ({ userId }) => userId != feedback.userId
  );
  await updateDoc(doc(db, "Goods", id), {
    reviews: [feedback, ...filteredFeedbacks],
  });
})
export const leaveFeedbackFx = createEffect(async ({id, feedback}:{id: string, feedback: Feedback}) => {
  try {
    const productRef = await getDoc(doc(db, "Goods", id));
    const product = productRef.data() as Product;
    const oldReviews = product.reviews;
    await updateDoc(doc(db, "Goods", id), {
      reviews: [...oldReviews, feedback],
    });
  } catch (error: any) {
    throw new Error(error);
  }
})