import React from "react";
import ProductListProvider from "./ProductListProvider";
import axios from "axios";

const getData = async () => {
  ("use server");
  try {
    const { data } = await axios.get(`/api/products`);
    return data;
  } catch (error) {
    return [];
  }
};
const ProductListPage = async () => {

  const data = await getData();
  // const res = await fetch(
  //   `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products`
  // );
  // const data = await res.json();

  return <ProductListProvider data={data} />;
};

export default ProductListPage;
