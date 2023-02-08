import { CartItem } from "@/shared/api/User";
import { createStore } from "effector";

export const $cart = createStore<CartItem[]>([]);
