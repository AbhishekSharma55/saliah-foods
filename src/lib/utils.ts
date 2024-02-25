import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { IOrder } from "./models/order.model";
import { TransformedOrderDataType } from "./types";
import moment from "moment";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const transformedOrderData = async (
  inputData: IOrder[]
): Promise<TransformedOrderDataType[]> => {
  const data = inputData.flatMap((item) => {
    return item.orderSummary.map((orderItem) => ({
      name: orderItem.name || "",
      createdAt: moment(item.createdAt).format("DD/MM/YYYY"), // Format createdAt using Moment.js
      total: orderItem.total,
      status: item.status,
      orderId: item.orderId,
      _id: orderItem?._id || "",
    }));
  });

  return data;
};
