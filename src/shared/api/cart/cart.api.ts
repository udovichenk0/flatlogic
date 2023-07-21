import { doc, updateDoc, arrayUnion, getDoc } from "firebase/firestore";

import { db } from "../firebase";
import { UserDto } from "../session";

import { CartProductDto } from "./type";

export const addToCart = async (id: string, data: CartProductDto) => {
  try {
    const userRef = doc(db, "users", id);
    await updateDoc(userRef, {
      cart: arrayUnion(data),
    });
    const response = await getDoc(userRef).then((cart) => {
      const cartData = (cart.data() as UserDto).cart;
      return cartData;
    });
    return response;
  } catch (error: any) {
    throw new Error(error);
  }
};


export const removeFromCart = async (userId: string, deleteId: string) => {
  try {
    const userRef = doc(db, "users", userId);
    const user = await getDoc(userRef);
    const userData = user.data() as UserDto;
    await updateDoc(userRef, {
      cart: userData.cart.filter(({ id }) => id !== deleteId),
    });
    const response = await getDoc(userRef).then((cart) => {
      const cartData = (cart.data() as UserDto).cart;
      return cartData;
    });
    return response;
  } catch (error: any) {
    throw new Error(error);
  }
};
