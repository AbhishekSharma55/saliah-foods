"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import RatingStar from "../../../components/rating-star/rating-star";
import { getProductsReview } from "@/lib/actions/review-actions";
import { IProductReview } from "@/lib/models/review.model";
import moment from "moment";
import { UserCircle } from "lucide-react";
import RatingForm from "./RatingForm";

const ProductReview = ({
  productId,
  type = "totalReview",
}: {
  productId?: string;
  type?: "totalReview" | "allReview";
}) => {
  const [productReviews, setProductReviews] = useState<{
    avgRating: number;
    reviews: IProductReview[] | any[];
    totalReview: number;
  }>();

  useEffect(() => {
    const getRev = async () => {
      const data = await getProductsReview(productId || "");
      if ("avgRating" in data) {
        setProductReviews(data);
      }
    };

    if (productId) {
      getRev();
    }
    return () => {};
  }, [productId]);

  const onReviewAdded = (data: IProductReview) => {
    if (data) {
      setProductReviews((prev) => {
        return {
          avgRating: prev?.avgRating ?? 0, // Provide a default value if avgRating is undefined
          totalReview: prev?.totalReview ? prev.totalReview + 1 : 1, // Increment totalReview by 1
          reviews: prev?.reviews ? [data, ...prev.reviews] : [data], // Initialize reviews as an array with the new review
        };
      });
    }
  };

  return type === "totalReview" ? (
    <div className="grid gap-8 mb-8">
      {(productReviews?.reviews || []).map((review, index) => {
        return (
          <div key={review?._id}>
            <div className="flex justify-between">
              <div className="flex items-center gap-2">
                <div>
                  {review?.image ? (
                    <Image
                      src={review.image}
                      alt="user"
                      width={32}
                      height={32}
                    />
                  ) : (
                    <UserCircle className="w-8 h-8 text-gray-500" />
                  )}
                </div>
                <div>
                  <h4>{review?.userName || "Generic user"}</h4>
                  <RatingStar rating={Number(review.rating)} />
                </div>
              </div>
              <div className="text-light-500">
                {moment(review.createAt).format("DD-MM-YYYY")}
              </div>
            </div>
            <p className="text-light-500 mt-2">{review.review}</p>
          </div>
        );
      })}
      <RatingForm productId={productId || ""} onReviewAdded={onReviewAdded} />
    </div>
  ) : (
    <>
      {productReviews?.totalReview || 0} Reviews
      <RatingStar rating={productReviews?.avgRating || 0} />
      <span className="text-light-500"> </span>
    </>
  );
};

export default ProductReview;

const reviewCollection = [
  {
    imageUrl: "/reviewUser.png",
    name: "Kristin Watson",
    time: "2 min ago",
    comment: "Duis at ullamcorper nulla, eu dictum eros.",
  },
  {
    imageUrl: "/reviewUser.png",
    name: "Jane Cooper",
    time: "30 Apr, 2021",
    comment:
      "Keep the soil evenly moist for the healthiest growth. If the sun gets too hot, Chinese cabbage tends to 'bolt' or go to seed; in long periods of heat, some kind of shade may be helpful. Watch out for snails, as they will harm the plants.",
  },
  {
    imageUrl: "/reviewUser.png",
    name: "Jacob Jones",
    time: "2 min ago",
    comment:
      " Vivamus eget euismod magna. Nam sed lacinia nibh, et lacinia lacus.",
  },
  {
    imageUrl: "/reviewUser.png",
    name: "Ralph Edwards",
    time: "2 min ago",
    comment:
      "200+ Canton Pak Choi Bok Choy Chinese Cabbage Seeds Heirloom Non-GMO Productive Brassica rapa VAR. chinensis, a.k.a. Canton's Choice, Bok Choi, from USA",
  },
];
