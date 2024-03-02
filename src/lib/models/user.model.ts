import mongoose, { Document, Schema} from "mongoose";

// Define role enum
export enum UserRole {
  USER = "USER",
  ADMIN = "ADMIN",
}

// Define user schema
export interface UserSchema extends Document {
  email?: string;
  phone?: string;
  name?: string;
  role: UserRole;
}

const userSchemaFields = {
  email: { type: String },
  phone: { type: String },
  name: { type: String },
  role: {
    type: String,
    required: true,
    enum: Object.values(UserRole),
    default: UserRole.USER,
  },
};

const userSchema = new Schema<UserSchema>(userSchemaFields, {
  timestamps: true,
});

export const UserModel =
  mongoose.models?.User || mongoose.model("User", userSchema);

// export const UserModel = mongoose.model<UserSchema>("User", userSchema);
