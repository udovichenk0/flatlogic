type CartProduct = {
  description: string;
  id: string;
  price: number;
  title: string;
  type: string;
  url: string;
};

export type User = {
  avatar_url: string;
  billing_address: string;
  delivery_address: string;
  payment_method: string;
  cart: CartProduct[];
  email: string;
  name: string;
  surname: string;
  id: string;
  role: string;
}