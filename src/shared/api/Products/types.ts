import { Feedback } from "../feedback";

export type Product = {
  description: string;
  id: string;
  price: number;
  reviews: Feedback[];
  title: string;
  type: string;
  url: string;
};