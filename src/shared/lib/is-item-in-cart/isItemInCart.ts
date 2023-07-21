type CartProduct = {
    description: string;
    id: string;
    price: number;
    title: string;
    type: string;
    url: string;
}
export function isProductInCart(cart: CartProduct[], productId: string) {
  return Boolean(cart.find(({ id }) => id == productId));
}
