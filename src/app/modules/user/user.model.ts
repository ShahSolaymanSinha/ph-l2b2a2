import { Schema, model } from 'mongoose';
import TUser from './user.interface';

const userSchema = new Schema<TUser>({
  userId: { type: Number, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fullName: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
  },
  isActive: { type: Boolean, required: true, default: true },
  age: { type: Number, required: true },
  email: { type: String, required: true, unique: true },
  hobbies: { type: [String], required: true },
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
  },
  orders: {
    productName: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
  },
});

const UserModel = model<TUser>('User', userSchema);
export default UserModel;
