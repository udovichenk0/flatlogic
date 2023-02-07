import { CartItem } from "@/shared/api/User";

export function isItemInCart(cart: CartItem[], itemId: string) {
  cart.find(({ id }) => id == itemId);
}
