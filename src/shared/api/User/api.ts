import { arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { CartItem, User } from "./types";

export const getSessionUser = async () => {
  const sessionUser = await getDoc(doc(db, "users", "xVoU1CfS4uLTgPz3gkJK"));
  return { ...sessionUser.data(), id: sessionUser.id } as User;
};

// export const getCart = () => {
//   const docRef = doc(db, "users", "SF");
// const docSnap = await getDoc(docRef);
// }

export const addToCard = async (data: CartItem, id: string) => {
  const usersRef = doc(db, "users", id);
  const cart = await updateDoc(usersRef, {
    cart: arrayUnion(data),
  });
  console.log(cart);
  return cart;
};
