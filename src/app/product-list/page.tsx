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


  return <ProductListProvider data={data} />;
};

export default ProductListPage;
