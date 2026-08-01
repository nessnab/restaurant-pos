export interface CreateUserInput {
  restaurantId: string;
  name: string;
  email: string;
  passwordHash: string;
  role: "OWNER" | "CASHIER";
};

export interface AuthUser {
  id: string;
  restaurantId: string;
  name: string;
  email: string | null;
  role: "OWNER" | "CASHIER";
  isActive: boolean;
}