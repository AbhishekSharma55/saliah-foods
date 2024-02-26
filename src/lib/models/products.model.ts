import mongoose, { Document, Schema } from "mongoose";



// Define product schema interface
export interface ProductSchema extends Document {
  _id: string;
  product: string;
  price_range: {
    min_price: number;
    max_price: number;
  };
  shipping_info?: string;
  quantity?: number;
  unit?: string;
  category: string;
  varient?: {
    unit?: string;
    price_range?: {
      min_price: number;
      max_price: number;
    };
  }[];
  homePageType?: string;
  description?: string;
  images: string[];
  main_description: string;
  additional_information?: {
    brand: string;
    origin: string;
    nutritional_info: {
      calories: string;
      protein: string;
      carbohydrates: string;
      fat: string;
      weight: string;
      health_benefits_details: string;
    };
    health_benefits_details: string;
    nutritional_content: string;
    recommended_intake: string;
    weight: string;
    storage_instructions: string;
    healthy_alternative: string;
    flavor: string;
    benefits: string;
    delivery_info: string;
  };
}

// Define product schema
const productSchemaFields: Record<string, any> = {
  product: { type: String, required: true },
  price_range: {
    min_price: { type: Number, required: true },
    max_price: { type: Number, required: true },
  },
  shipping_info: {
    type: String,
    default: "Eligible for Shipping Across India",
  },
  quantity: { type: Number, required: true, default: 0 },
  unit: { type: String },
  category: { type: String, required: true },
  varient: [
    {
      unit: { type: String },
      price_range: {
        min_price: { type: Number },
        max_price: { type: Number },
      },
    },
  ],
  homePageType: { type: String, default: "" },
  description: { type: String },
  images: [{ type: String, required: true }],
  main_description: { type: String, default: "" },
  additional_information: {
    brand: { type: String, default: "" },
    health_benefits_details: { type: String, default: "" },
    nutritional_content: { type: String, default: "" },
    recommended_intake: { type: String, default: "" },
    origin: { type: String, default: "" },
    nutritional_info: {
      calories: { type: String, default: "" },
      protein: { type: String, default: "" },
      carbohydrates: { type: String, default: "" },
      fat: { type: String, default: "" },
      weight: { type: String, default: "" },
    },
    weight: { type: String, default: "" },
    storage_instructions: { type: String },
    healthy_alternative: { type: String },
    flavor: { type: String },
    benefits: { type: String },
    delivery_info: { type: String },
  },
};

const productSchema = new Schema<ProductSchema>(productSchemaFields);


// Create and export Product model
export const Product =
  mongoose.models.Product ||
  mongoose.model<ProductSchema>("Product", productSchema);
