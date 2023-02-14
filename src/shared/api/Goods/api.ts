import {
  collection,
  collectionGroup,
  documentId,
  endBefore,
  getCountFromServer,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import { Good } from "./types";
export const getGoods = async ({
  goodsLimit,
  priceRange,
  pagination,
  filterByOrder = "asc",
}: // orderBy
{
  goodsLimit: number;
  priceRange: { min: number; max: number };
  pagination?: { id: string; direction: "prev" | "next" };
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
      })) as Good[],
    };
  } catch (error: any) {
    throw new Error(error);
  }
};
