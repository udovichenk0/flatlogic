import { CartItem } from "@/shared/api/User";

export function isItemInCart(cart: CartItem[], itemId: string) {
  return !!cart.find(({ id }) => id == itemId);
}
