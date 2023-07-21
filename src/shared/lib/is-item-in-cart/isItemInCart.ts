import { CartItem } from "@/shared/api/user";

export function isItemInCart(cart: CartItem[], itemId: string) {
  return !!cart.find(({ id }) => id == itemId);
}
