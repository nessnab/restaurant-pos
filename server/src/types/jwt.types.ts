export interface AuthPayload {
  userId: string;
  restaurantId: string;
  role: "OWNER" | "CASHIER";
}