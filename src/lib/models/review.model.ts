import mongoose, { Schema, Document, Types } from "mongoose";
// Define the interface for a single product review
export interface IProductReviewWithoutId {
  productId: Types.ObjectId | string;
  userId?: Types.ObjectId | string;
  email?: string;
  userName: string;
  rating: number;
  review: string;
}

export interface IProductReview extends IProductReviewWithoutId {
  _id?: string | Types.ObjectId;
}

// Define the interface for the ProductReview document
export interface IProductReviewSchema
  extends Document,
    IProductReviewWithoutId {}

// Define the schema for the ProductReview document
const ProductReviewSchema: Schema = new Schema(
  {
    productId: { type: mongoose.Types.ObjectId, required: true },
    userId: { type: mongoose.Types.ObjectId, ref: "User" },
    email: { type: String },
    userName: { type: String },
    rating: { type: Number, min: 1, max: 5, default: 4 },
    review: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

// Define the ProductReview model
export const ProductReview =
  mongoose.models.ProductReview ||
  mongoose.model<IProductReview>("ProductReview", ProductReviewSchema);
