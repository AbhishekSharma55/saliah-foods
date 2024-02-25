"use server";

import { connectToDB } from "@/config/mongoose.config";
import { Product, ProductSchema } from "../models/products.model";

export const getProductsData = async (): Promise<ProductSchema[] | any[]> => {
  await connectToDB();
  const data = await Product.find({}).lean();
  return data || [];
};
