export interface CreateUserInput {
  restaurantId: string;
  name: string;
  email?: string;
  passwordHash: string;
  role: "OWNER" | "CASHIER";
  username?: string;
};

export interface AuthUser {
  id: string;
  restaurantId: string;
  name: string;
  email: string | null;
  role: "OWNER" | "CASHIER";
  isActive: boolean;
}