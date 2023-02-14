import {
  collection,
  collectionGroup,
  getCountFromServer,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import { Good } from "./types";

//get all products, with filters(optional)

export const getGoods = async ({
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
      })) as Good[],
    };
  } catch (error: any) {
    throw new Error(error);
  }
};

//get single product by id

export const getProduct = async (id: string) => {
  try {
    const product = await getDocs(
      query(collection(db, "Goods"), where("id", "==", id))
    );
    return product.docs;
  } catch (error: any) {
    throw new Error(error);
  }
};
