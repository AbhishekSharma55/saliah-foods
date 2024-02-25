import { connectToDB } from "@/config/mongoose.config";
import { Product } from "@/lib/models/products.model";

export async function GET(req: Request) {
  await connectToDB();
  const data = await Product.find({}).lean();
  return Response.json(data||[]);
}