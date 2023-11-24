import { z } from 'zod';

const OrderSchema = z.object({
  productName: z.string().optional(),
  price: z.number().optional(),
  quantity: z.number().optional(),
});

const AddressSchema = z.object({
  street: z.string(),
  city: z.string(),
  country: z.string(),
});

const FullNameSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
});

const UserValidationSchema = z.object({
  userId: z.number(),
  username: z.string(),
  password: z.string(),
  fullName: FullNameSchema,
  isActive: z.boolean().default(true),
  age: z.number(),
  email: z.string(),
  hobbies: z.array(z.string()),
  address: AddressSchema,
  orders: z.array(OrderSchema).default([]),
});

export default UserValidationSchema;
