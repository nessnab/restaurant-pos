export type RegisterInput = {
  restaurantName: string;
  ownerName: string;
  email: string;
  password: string;
};

export type CashierRegisterInput = {
  name: string;
  username: string;
  email?: string;
  password: string;
  restaurantSlug: string;
}