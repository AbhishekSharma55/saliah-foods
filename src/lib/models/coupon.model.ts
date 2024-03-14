import mongoose, { Document, Schema } from "mongoose";

// Define coupon schema interface
export interface CouponSchema extends Document {
  _id: string;
  discount: number;
  coupon: string;
  maximum_discount: number;
}

// Define coupon schema
const couponSchemaFields: Record<string, any> = {
  discount: { type: String, required: true },
  coupon: { type: String, required: true ,unique:true},
  maximum_discount: { type: String, required: true },
};

const couponSchema = new Schema<CouponSchema>(couponSchemaFields);

// Create and export Coupon model
export const Coupon =
  mongoose.models.Coupon ||
  mongoose.model<CouponSchema>("Coupon", couponSchema);
