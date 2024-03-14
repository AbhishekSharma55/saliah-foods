import { NextApiRequest, NextApiResponse } from 'next';
import { Coupon, CouponSchema } from '@/lib/models/coupon.model';
import { connectToDB } from '@/config/mongoose.config';
import { calculateDiscount } from '@/lib/utils';

async function POST(req: Request) {
  try {
    await connectToDB();

    const { couponCode, totalAmount } = await req.json();
    const coupon = await Coupon.findOne({ coupon: couponCode });
    if (!coupon) {
      return Response.json({ error: "Invalid Coupon Code" });
    }

    const discountAmount = +calculateDiscount(coupon, totalAmount);

    return Response.json({ data: discountAmount, "message": "Coupon Applied" });

  } catch (error) {
    return Response.json({ error: "Internal Server Error" });
  }
}


export { POST };
