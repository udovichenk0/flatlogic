import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

import { auth, db } from "../firebase";

import { UserDto } from "./types";

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

export const saveUserToBD = async (data: UserDto) => {
  const user = await setDoc(doc(db, "users", data.id), data);
  return user;
};

export const getUser = async (id: string) => {
  const userRef = await getDoc(doc(db, "users", id));
  const user = userRef.data() as UserDto;
  return user;
};
