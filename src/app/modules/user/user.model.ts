import { Schema, model } from 'mongoose'
import { IUser, UserModel } from './user.interface'

export const userSchema = new Schema<IUser>(
  {
    id: { type: String, required: true, unique: true },
    role: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
)

// export const User = model<IUser>('User', userSchema)
export const User = model<IUser, UserModel>('User', userSchema)
