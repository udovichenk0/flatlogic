import { createStore } from "effector";
import { debug } from "patronum";

import { CartItem } from "@/shared/api/User";

export const $cart = createStore<CartItem[]>([]);
