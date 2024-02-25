import React from "react";
import ProductListProvider from "./ProductListProvider";

const ProductListPage = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products`)
  const data = await res.json();
  return (
    <ProductListProvider data={data} />
  );
};

export default ProductListPage;
