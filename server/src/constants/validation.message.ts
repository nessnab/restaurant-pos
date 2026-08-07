export const ValidationMessages = {
  required: (field: string) => `${field} is required`,

  invalidEmail: "Invalid email address",

  invalidPhone: "Invalid phone number",

  passwordMin: "Password must be at least 8 characters",

  usernameMin: "Username must be at least 3 characters",

  usernameMax: "Username must be at most 20 characters",

  usernameFormat:
    "Username can only contain letters, numbers, dots, underscores, and hyphens",

  slugFormat:
    "Slug can only contain lowercase letters, numbers, and hyphens",

  nameMin: (field: string) =>
    `${field} must be at least 2 characters`,

  nameMax: (field: string) =>
    `${field} must be at most 50 characters`,

  descriptionMax:
    "Description must be at most 255 characters",

  addressMax:
    "Address must be at most 255 characters",

  receiptFooterMax:
    "Receipt footer must be at most 150 characters",

  pricePositive:
    "Price must be greater than 0",

  quantityPositive:
    "Quantity must be greater than 0",

  uuid:
    "Invalid ID",

  orderEmpty:
    "Order must contain at least one item",

  atLeastOne:
    "At least one field must be provided",
};