import { createEvent, createStore } from "effector";
import { debug } from "patronum";

import { CartItem } from "@/shared/api/User";

export const cartReset = createEvent();

export const $cart = createStore<CartItem[]>([]);

$cart.reset(cartReset);
