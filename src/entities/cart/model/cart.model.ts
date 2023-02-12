import { CartItem } from "@/shared/api/User";
import { createStore } from "effector";
import { debug } from "patronum";

export const $cart = createStore<CartItem[]>([]);
