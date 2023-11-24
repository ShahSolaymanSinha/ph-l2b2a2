import { Schema, model } from 'mongoose';
import TUser, { UserModel } from './user.interface';

const userSchema = new Schema<TUser, UserModel>(
  {
    userId: { type: Number, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    fullName: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
    },
    isActive: { type: Boolean, default: true },
    age: { type: Number, required: true },
    email: { type: String, required: true, unique: true },
    hobbies: { type: [String], required: true },
    address: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      country: { type: String, required: true },
    },
    orders: {
      type: [
        {
          productName: { type: String },
          price: { type: Number },
          quantity: { type: Number },
        },
      ],
      default: [],
    },
  },
  {
    id: false,
    toJSON: {
      virtuals: true,
    },
    statics: {
      async mIsUserExists(userId, username, email) {
        if (
          (await User.findOne({ userId })) ||
          (await User.findOne({ username })) ||
          (await User.findOne({ email }))
        ) {
          return true;
        } else {
          return null;
        }
      },
    },
  },
);

userSchema.virtual('vFullName').get(function () {
  return `${this.fullName.firstName} ${this.fullName.lastName}`;
});

const User = model<TUser, UserModel>('User', userSchema);
export default User;
