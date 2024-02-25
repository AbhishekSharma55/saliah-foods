import React from "react";
import ProductListProvider from "./ProductListProvider";

const ProductListPage = async () => {
  console.log(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products`);
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products`
  );
  const data = await res.json();

  if (!data) {
    return <div>Something went wrong</div>;
  } else {
    return (
      <>
        <ProductListProvider data={data} />
      </>
    );
  }
};

export default ProductListPage;
