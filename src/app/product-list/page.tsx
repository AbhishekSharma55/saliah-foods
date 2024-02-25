import React from "react";
import ProductListProvider from "./ProductListProvider";
import axios from "axios";
import { getProductsData } from "@/lib/actions/product-actions";

const ProductListPage = async () => {
  const data = await getProductsData();

  return <ProductListProvider data={data} />;
};

export default ProductListPage;
