import { Schema, model } from "mongoose";
const mongoose = require("mongoose");

export interface IOrder extends Document {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  state: string;
  city: string;
  pinCode: number;
  streetAddress: string;
  apartment?: string;
  note?: string;
  orderSummary: [
    {
      name?: string;
      image?: string;
      unit?: string;
      quantity: number;
      price?: number;
      subTotal?: number;
      total: number;
      productId: string;
      _id?: string;
    }
  ];
  paymentStatus: string;
  total: number;
  totalQuantity: number;
  status: string;
  createdId: string;
  paymentId?: string;
  orderId: string;
  createdAt?: string;
}

const orderSchema = new Schema<IOrder>(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    pinCode: {
      type: Number,
      required: true,
    },
    streetAddress: {
      type: String,
      required: true,
    },
    apartment: {
      type: String,
      required: false,
    },
    note: {
      type: String,
      required: false,
    },
    orderSummary: [
      {
        productId: {
          ref: "Product",
          type: mongoose.Schema.Types.ObjectId,
          required: true,
        },
        image: {
          type: String,
        },
        name: {
          type: String,
          required: false,
        },
        unit: {
          type: String,
          required: false,
        },
        quantity: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
          required: false,
        },

        subTotal: {
          type: Number,
          required: false,
        },
        total: {
          type: Number,
          required: true,
        },
      },
    ],
    // payment paymentStatus
    paymentStatus: {
      type: String,
      default: "Pending",
    },
    status: {
      type: String,
      default: "Pending",
    },

    createdId: { ref: "User", type: mongoose.Schema.Types.ObjectId },
    paymentId: {
      type: String,
      required: false,
    },
    total: {
      type: Number,
      required: true,
    },
    totalQuantity: {
      type: Number,
      required: true,
    },

    orderId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const OrderModel =
  mongoose.models.Order || mongoose.model("Order", orderSchema);
