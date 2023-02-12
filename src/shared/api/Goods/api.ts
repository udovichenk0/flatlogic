import {
  collection,
  collectionGroup,
  documentId,
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
  lastItemId,
  priceRange,
}: {
  goodsLimit: number;
  lastItemId?: string;
  priceRange?: number[];
}) => {
  try {
    const MIN = priceRange ? priceRange[0] : 0;
    const MAX = priceRange ? priceRange[1] : 100000;
    if (lastItemId) {
      //get last goods
      const nextGoods = await getDocs(
        query(
          collection(db, "Goods"),
          limit(goodsLimit),
          startAfter(lastItemId)
        )
      );
      return {
        goods: nextGoods.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        })) as Good[],
        total: 0,
      };
    } else {
      //get goods with limit
      const goods = await getDocs(
        query(
          collection(db, "Goods"),
          where("price", ">=", MIN),
          where("price", "<=", MAX),
          limit(goodsLimit)
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
    }
  } catch (error: any) {
    throw new Error(error);
  }
};
