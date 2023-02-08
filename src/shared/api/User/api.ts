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
  const userRef = doc(db, "users", id);
  await updateDoc(userRef, {
    cart: arrayUnion(data),
  });
  return data;
};

export const removeFromCart = async (userId: string, deleteId: string) => {
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
};
