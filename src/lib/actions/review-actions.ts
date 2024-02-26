"use server";

import { connectToDB } from "@/config/mongoose.config";
import { IProductReview, ProductReview } from "../models/review.model";
import mongoose from "mongoose";

export interface ProductReviewData {
  avgRating?: number;
  reviews?: Array<Record<string, unknown>>;
  error?: string;
}

export const getProductsReview = async (
  productId: string
): Promise<
  | {
      avgRating: number;
      totalReview: number;
      reviews: IProductReview[] | any[];
    }
  | { error: string }
> => {
  try {
    await connectToDB();
    // Perform aggregation to calculate average review value for the specified productId
    const [avgRating, latestReviews] = await Promise.all([
      ProductReview.aggregate([
        {
          $match: {
            productId: { $in: [new mongoose.Types.ObjectId(productId)] },
          },
        },
        {
          $group: {
            _id: null,
            avgRating: { $avg: "$rating" },
            totalReviews: { $sum: 1 }, // Calculate total number of reviews
          },
        },
      ]),
      ProductReview.find({ productId: productId })
        .sort({ createdAt: -1 })
        .limit(20)
        .lean(),
    ]);

    // Extract average rating value from aggregation result
    const avgRatingValue: number =
      avgRating.length > 0 ? avgRating[0].avgRating : 0;

    return {
      avgRating: avgRatingValue,
      reviews: JSON.parse(JSON.stringify(latestReviews)),
      totalReview: avgRating.length > 0 ? avgRating[0].totalReviews : 0,
    };
  } catch (error: any) {
    console.log(error);
    return { error: error.message };
  }
};

export const addProductReview = async (review: IProductReview) => {
  try {
    if (!review.userId) {
      return { error: "Please login to add a review" };
    }
    await connectToDB();
    const newReview = await ProductReview.create(review);
    return JSON.parse(JSON.stringify(newReview));
  } catch (error: any) {
    console.log(error);
    return { error: error.message };
  }
};

export const updateProductReview = async (
  review: IProductReview,
  type: "delete" | "update"
) => {
  try {
    if (!review.userId) {
      return { error: "Please login to update a review" };
    }

    await connectToDB();
    const findUserReview = await ProductReview.findOne({
      userId: review.userId,
      _id: review._id,
    });
    if (!findUserReview) {
      return { error: "You are not authorized to update this review" };
    }

    if (type === "delete") {
      const deletedReview = await ProductReview.findByIdAndDelete({
        userId: review.userId,
        _id: review._id,
      });

      return { message: "Review deleted successfully" };
    }

    if (type === "update") {
      const updatedReview = await ProductReview.findOneAndUpdate(
        { _id: review._id, userId: review.userId },
        review,
        {
          new: true,
        }
      );
      return updatedReview;
    }

    return { error: "Invalid operation" };
  } catch (error: any) {
    console.log(error);
    return { error: error.message };
  }
};
