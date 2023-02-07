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
  cart: CartItem[];
  email: string;
  name: string;
  second_ame: string;
  id: string;
};
