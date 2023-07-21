import { CartProductDto } from "../cart/type";

export type UserDto = {
  avatar_url: string;
  billing_address: string;
  delivery_address: string;
  payment_method: string;
  cart: CartProductDto[];
  email: string;
  name: string;
  surname: string;
  id: string;
  role: string;
};
