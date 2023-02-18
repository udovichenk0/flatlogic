import {
  collection,
  collectionGroup,
  doc,
  getCountFromServer,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import { Product, Feedback } from "./types";

//get all products, with filters(optional)

export const getProducts = async ({
  goodsLimit,
  priceRange,
  filterByOrder = "asc",
}: {
  goodsLimit: number;
  priceRange: { min: number; max: number };
  filterByOrder?: "asc" | "desc";
}) => {
  try {
    const goods = await getDocs(
      query(
        collection(db, "Goods"),
        orderBy("price", filterByOrder),
        limit(goodsLimit),
        where("price", ">=", priceRange.min),
        where("price", "<=", priceRange.max)
      )
    );
    const snap = await getCountFromServer(collectionGroup(db, "Goods"));
    const count = snap.data().count;
    return {
      total: count,
      goods: goods.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      })) as Product[],
    };
  } catch (error: any) {
    throw new Error(error);
  }
};

//get single product by id

export const getProduct = async (id: string) => {
  try {
    const product = await getDoc(doc(db, "Goods", id));
    return { ...product.data(), id: product.id } as Product;
  } catch (error: any) {
    throw new Error(error);
  }
};

//update reviews in single product

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
