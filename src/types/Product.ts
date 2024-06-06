export type ProductType = {
  id: number;
  title: string;
  price: string;
  category: string;
  description: string;
  image: string;
  quantity: number;
  rating: { rate: number; count: number };
};
