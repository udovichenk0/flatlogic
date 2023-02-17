export type Product = {
  description: string;
  id: string;
  price: number;
  reviews: any[];
  title: string;
  type: string;
  url: string;
};

export type Feedback = {
  rate: number;
  fullname: string;
  avatar_url: string;
  comment: string;
  date: Date;
  userId: string;
};
