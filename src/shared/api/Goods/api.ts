import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { Good } from "./types";
export const getGoods = async () => {
  const goods = await getDocs(collection(db, "Goods"));
  return goods.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as Good[];
};
