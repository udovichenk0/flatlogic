import { CartItem } from "@/shared/api/User";
import { createEvent, createStore } from "effector";

export const $cart = createStore<CartItem[]>([]);
