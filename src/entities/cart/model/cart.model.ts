import { CartItem } from "@/shared/api/User";
import { createEvent, createStore } from "effector";
import { debug } from "patronum";

export const $cart = createStore<CartItem[]>([]);
