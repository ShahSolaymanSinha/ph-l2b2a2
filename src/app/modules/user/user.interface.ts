/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export default interface TUser {
  userId: number;
  username: string;
  password: string;
  fullName: {
    firstName: string;
    lastName: string;
  };
  age: number;
  email: string;
  isActive?: boolean;
  hobbies: string[];
  address: TAddress;
  orders?: TOrders[];
}

// interface TFullName
interface TAddress {
  street: string;
  city: string;
  country: string;
}

type TOrders = {
  productName?: string;
  price?: number;
  quantity?: number;
};

export interface UserModel extends Model<TUser> {
  mIsUserExists(
    userId: number,
    username: string,
    email: string,
  ): Promise<boolean | null>;
}
