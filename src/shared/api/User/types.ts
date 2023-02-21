export type CartItem = {
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
  cart: CartItem[];
  email: string;
  name: string;
  second_name: string;
  id: string;
};
