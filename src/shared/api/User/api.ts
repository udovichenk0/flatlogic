import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";

import { db } from "../firebase";

import { CartItem, User } from "./types";

export const getSessionUser = async () => {
  const sessionUser = await getDoc(doc(db, "users", "xVoU1CfS4uLTgPz3gkJK"));
  return { ...sessionUser.data(), id: sessionUser.id } as User;
};

//TODO make catch errors
export const addToCart = async (id: string, data: CartItem) => {
  try {
    const userRef = doc(db, "users", id);
    await updateDoc(userRef, {
      cart: arrayUnion(data),
    });
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const removeFromCart = async (userId: string, deleteId: string) => {
  try {
    const userRef = doc(db, "users", userId);
    const user = await getDoc(userRef);
    const userData = user.data() as User;
    await updateDoc(userRef, {
      cart: userData.cart.filter(({ id }) => id !== deleteId),
    });
    const response = await getDoc(userRef).then((cart) => {
      const cartData = (cart.data() as User).cart;
      return cartData;
    });
    return response;
  } catch (error: any) {
    throw new Error(error);
  }
};
