import { z } from "zod";
import { ValidationMessages } from "../constants/validation.message";

export const nameSchema = z
  .string()
  .trim()
  .min(2, ValidationMessages.nameMin("Name"))
  .max(50, ValidationMessages.nameMax("Name"));

export const restaurantNameSchema = z
  .string()
  .trim()
  .min(1, ValidationMessages.required("Restaurant name"))
  .max(100, ValidationMessages.nameMax("Restaurant name"));

export const restaurantSlugSchema = z
  .string()
  .trim()
  .min(1, ValidationMessages.required("Restaurant slug"))
  .regex(
    /^[a-z0-9-]+$/,
    ValidationMessages.slugFormat
  );

export const categoryNameSchema = z
  .string()
  .trim()
  .min(1, ValidationMessages.required("Category name"))
  .max(50, ValidationMessages.nameMax("Category name"));

export const menuNameSchema = z
  .string()
  .trim()
  .min(1, ValidationMessages.required("Menu name"))
  .max(100, ValidationMessages.nameMax("Menu name"));

export const descriptionSchema = z
  .string()
  .trim()
  .max(255, ValidationMessages.descriptionMax);

export const addressSchema = z
  .string()
  .trim()
  .min(1, ValidationMessages.required("Address"))
  .max(255, ValidationMessages.addressMax);

export const phoneSchema = z
  .string()
  .trim()
  .regex(
    /^(\+62|62|0)8[1-9][0-9]{6,11}$/,
    ValidationMessages.invalidPhone
  );

export const receiptFooterSchema = z
  .string()
  .trim()
  .max(150, ValidationMessages.receiptFooterMax);

export const emailSchema = z
  .string()
  .trim()
  .email(ValidationMessages.invalidEmail)
  .transform(email => email.toLowerCase());

export const passwordSchema = z
  .string()
  .min(8, ValidationMessages.passwordMin);

export const usernameSchema = z
  .string()
  .trim()
  .min(3, ValidationMessages.usernameMin)
  .max(20, ValidationMessages.usernameMax)
  .regex(
    /^[a-zA-Z0-9._-]+$/,
    ValidationMessages.usernameFormat
  )
  .transform(username => username.toLowerCase());

export const uuidSchema = z
  .string()
  .uuid(ValidationMessages.uuid);

export const categoryIdSchema = uuidSchema;

export const priceSchema = z
  .number()
  .positive(ValidationMessages.pricePositive);

export const quantitySchema = z
  .number()
  .int()
  .positive(ValidationMessages.quantityPositive);