import { arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { CartItem, User } from "./types";

export const getSessionUser = async () => {
  const sessionUser = await getDoc(doc(db, "users", "xVoU1CfS4uLTgPz3gkJK"));
  return { ...sessionUser.data(), id: sessionUser.id } as User;
};

export const getCart = async () => {
  const docRef = doc(db, "users", "SF");
  const docSnap = await getDoc(docRef);
};
//TODO make catch errors
export const addToCart = async (data: CartItem, id: string) => {
  const usersRef = doc(db, "users", id);
  const cart = await updateDoc(usersRef, {
    cart: arrayUnion(data),
  });
  return cart;
};

export const updateCart = async (userId: string, cart: CartItem[]) => {
  const userRef = doc(db, "users", userId);
  const cartItems = updateDoc(userRef, { cart });
};
