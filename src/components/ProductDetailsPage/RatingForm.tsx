"use client";
import React, { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Star } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";
import { useUser } from "../Providers/user-provider";
import { addProductReview } from "@/lib/actions/review-actions";
import { toast } from "sonner";
import { IProductReview } from "@/lib/models/review.model";

// Define Zod schema
const reviewSchema = z.object({
  userName: z.string().min(1).max(50),
  email: z.string().email({ message: "Invalid email" }).optional(),
  review: z.string().min(1).max(500),
});
const RatingForm = ({
  productId,
  onReviewAdded,
}: {
  productId: string;
  onReviewAdded?: (data: IProductReview) => void;
}) => {
  const [inputRating, setInputRating] = useState(4);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUser();
  const ratingArr = Array.from({ length: 5 });
  const form = useForm<z.infer<typeof reviewSchema>>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      review: "",
      userName: "",
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof reviewSchema>) {
    const data = await addProductReview({
      email: values.email,
      productId,
      rating: inputRating,
      review: values.review,
      userId: String(user?._id) || "",
      userName: values.userName,
    });

    if (!data?.error) {
      toast.success("Review added successfully");
      if (onReviewAdded) {
        onReviewAdded(data);
      }
    } else {
      toast.error(data.error);
    }
  }

  return (
    <div className="md:w-[50%] w-full">
      <h3 className="text-2xl font-semibold mb-4">Post your review</h3>
      <div className="flex gap-4 items-center">
        {ratingArr.map((_, i) => {
          return inputRating > i ? (
            <Image
              src={"/svg/Star.svg"}
              alt="star"
              className="cursor-pointer"
              width={31}
              height={31}
              key={i}
              onClick={() => setInputRating(i + 1)}
            />
          ) : (
            <Star
              key={i}
              className="cursor-pointer text-orange-500"
              onClick={() => setInputRating(i + 1)}
            />
          );
        })}
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-8">
          <FormField
            control={form.control}
            name="userName"
            disabled={isLoading}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-black-800 ">Name </FormLabel>
                <FormControl>
                  <Input
                    className="text-primary"
                    placeholder="Enter your name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            disabled={isLoading}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-black-800 ">Email </FormLabel>
                <FormControl>
                  <Input
                    className="text-primary"
                    placeholder="Enter your email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="review"
            disabled={isLoading}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-black-800 "></FormLabel>
                <FormControl>
                  <Textarea
                    className="text-primary border-[#C4C4C4]"
                    placeholder="Enter your review"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button className="rounded-full px-6 font-bold">Submit</Button>
        </form>
      </Form>
    </div>
  );
};

export default RatingForm;
