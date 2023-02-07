import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { User } from "./types";

export const getSessionUser = async () => {
  const sessionUser = await getDoc(doc(db, "users", "xVoU1CfS4uLTgPz3gkJK"));
  return sessionUser.data() as User;
};

// export const getCart = () => {
//   const docRef = doc(db, "users", "SF");
// const docSnap = await getDoc(docRef);
// }

export const addToCard = async (data: any) => {
  const sessionUser = await updateDoc(
    doc(db, "users", "xVoU1CfS4uLTgPz3gkJK"),
    {
      cart: [data],
    }
  );
};
