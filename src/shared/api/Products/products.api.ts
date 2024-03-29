import { createEffect } from "effector";
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
  where,
} from "firebase/firestore";

import { db } from "../firebase";

import { Product } from "./types";

export const getProducts = async ({
  byPriceRange = {min: 1, max: 700},
  goodsLimit,
  filterByOrder = "asc",
}: {
  goodsLimit: number;
  byPriceRange?: { min: number; max: number };
  filterByOrder?: "asc" | "desc";
}) => {
  try {
    const goods = await getDocs(
      query(
        collection(db, "Goods"),
        orderBy("price", filterByOrder),
        limit(goodsLimit),
        where("price", ">=", byPriceRange.min),
        where("price", "<=", byPriceRange.max)
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

export const productsFx = createEffect(async ({
  productLimit = 10,
  filterByPriceRange = {min: 1, max: 700},
  filterByOrder = "asc",
}: {
  productLimit?: number;
  filterByPriceRange?: { min: number; max: number };
  filterByOrder?: "asc" | "desc";
}) => {
  try {
    const goods = await getDocs(
      query(
        collection(db, "Goods"),
        orderBy("price", filterByOrder),
        limit(productLimit),
        where("price", ">=", filterByPriceRange.min),
        where("price", "<=", filterByPriceRange.max)
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
})

export const getProductFx = createEffect(async ({ id }: { id: string }) => {
  try {
    const product = await getDoc(doc(db, "Goods", id));
    return { ...product.data(), id: product.id } as Product;
  } catch (error: any) {
    throw new Error(error);
  }
});