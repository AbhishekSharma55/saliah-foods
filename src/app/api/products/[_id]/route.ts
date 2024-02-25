import { connectToDB } from "@/config/mongoose.config";
import { Product } from "@/lib/models/products.model";
import mongoose from "mongoose";

export async function GET(req: Request, res: any) {
  const { _id } = res.params;
  await connectToDB();

  if (_id) {
    const product = await Product.findById(_id);

    if (!product) {
      return Response.json({
        message: "Product not found",
        _id,
      });
    } else {
      return Response.json(product);
    }
  } else {
    return Response.json({ message: "Product not found" });
  }
}
