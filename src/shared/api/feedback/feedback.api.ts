import { getDoc, doc, updateDoc } from "firebase/firestore";

import { db } from "../firebase";
import { Product } from "../products";

import { Feedback } from "./types";

export const leaveFeedback = async ({
  id,
  review,
}: {
  id: string;
  review: Feedback;
}) => {
  try {
    const productRef = await getDoc(doc(db, "Goods", id));
    const product = productRef.data() as Product;
    const oldReviews = product.reviews;
    await updateDoc(doc(db, "Goods", id), {
      reviews: [...oldReviews, review],
    });
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getFeedbacks = async (id: string, userId: string) => {
  const productRef = await getDoc(doc(db, "Goods", id));
  const product = productRef.data() as Product;
  const usersReview = product.reviews.find((review) => review.userId == userId);
  const reviews = product.reviews.filter((review) => review.userId != userId);
  return usersReview ? [usersReview, ...reviews] : [...reviews];
};
export const getUsersFeedback = async (productId: string, userId: string) => {
  const productRef = await getDoc(doc(db, "Goods", productId));
  const product = productRef.data() as Product;
  const usersReview = product.reviews.find((review) => review.userId == userId);

  return usersReview;
};

export const updateFeedback = async (id: string, review: Feedback) => {
  const productRef = await getDoc(doc(db, "Goods", id));
  const product = productRef.data() as Product;
  const filteredFeedbacks = product.reviews.filter(
    ({ userId }) => userId != review.userId
  );
  await updateDoc(doc(db, "Goods", id), {
    reviews: [review, ...filteredFeedbacks],
  });
};
