import { z } from 'zod';

const OrderSchema = z.object({
  productName: z.string().optional(),
  price: z.number().optional(),
  quantity: z.number().optional(),
});

const AddressSchema = z.object({
  street: z.string({
    required_error: 'Street is required',
    invalid_type_error: 'Street must be string',
  }),
  city: z.string({
    required_error: 'City is required',
    invalid_type_error: 'City must be string',
  }),
  country: z.string({
    required_error: 'Country is required',
    invalid_type_error: 'Country must be string',
  }),
});

const FullNameSchema = z.object({
  firstName: z.string({
    required_error: 'First name is requires',
    invalid_type_error: 'First name  must be string',
  }),
  lastName: z.string({
    required_error: 'Last name is requires',
    invalid_type_error: 'Last name must be string',
  }),
});

const UserValidationSchema = z.object({
  userId: z.number({
    required_error: 'User Id is required',
    invalid_type_error: 'User Id must be number',
  }),
  username: z.string({
    required_error: 'User name is required',
    invalid_type_error: 'User name must be string',
  }),
  password: z.string({
    required_error: 'Password is required',
    invalid_type_error: 'Password must be string',
  }),
  fullName: FullNameSchema,
  isActive: z.boolean().default(true).optional(),
  age: z.number({
    required_error: 'Age is required',
    invalid_type_error: 'Age must be number',
  }),
  email: z.string({
    required_error: 'Email is required',
    invalid_type_error: 'Email must be string',
  }),
  hobbies: z.array(
    z.string({
      required_error: 'Hobbies is required',
      invalid_type_error: 'Hobbies must be string',
    }),
  ),
  address: AddressSchema,
  orders: z.array(OrderSchema).default([]),
});

export default UserValidationSchema;
