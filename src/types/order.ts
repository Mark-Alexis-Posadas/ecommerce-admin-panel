export type OrderResponse = {
  _id: string;
  orderItems: { _id?: string; image?: string }[];
  totalPrice: number;
  isPaid: boolean;
  isDelivered: boolean;
  createdAt: string;
};
