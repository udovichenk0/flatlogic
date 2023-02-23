import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

import { auth, db } from "../firebase";

import { CartItem, User } from "./types";

//TODO make catch errors
export const addToCart = async (id: string, data: CartItem) => {
  try {
    const userRef = doc(db, "users", id);
    const user = await getDoc(userRef);
    await updateDoc(userRef, {
      cart: arrayUnion(data),
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

export const createAccountWithEmail = async (
  email: string,
  password: string
) => {
  return await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredentials) => {
      const user = userCredentials.user;
      return {
        email: user.email,
        uid: user.uid,
      };
    })
    .catch((err) => {
      throw new Error(err);
    });
};

export const loginWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  return await signInWithEmailAndPassword(auth, email, password)
    .then((userCredentials) => {
      const user = userCredentials.user;
      return {
        email: user.email,
        uid: user.uid,
      };
    })
    .catch((err) => {
      throw new Error(err);
    });
};

export const logout = async () => {
  return signOut(auth).catch((error) => {
    throw new Error(error);
  });
};

export const saveUserToBD = async (data: User) => {
  const user = await setDoc(doc(db, "users", data.id), data);
  return user;
};

export const getUser = async (id: string) => {
  const userRef = await getDoc(doc(db, "users", id));
  const user = userRef.data() as User;
  return user;
};
