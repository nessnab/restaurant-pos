export type CreateUserInput = {
  restaurantId: string;
  name: string;
  email: string;
  passwordHash: string;
  role: "OWNER" | "CASHIER";
};