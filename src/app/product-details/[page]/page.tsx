import ProductDetails from '@/components/ProductDetails'
import React from 'react'


interface PageProps {
  params: { page: string };
  searchParams: { [key: string]: string | string[] | undefined };
}
export default async function Page({ params, searchParams }: PageProps) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products/${params?.page}`, {
    next: {
      revalidate: 3600,
    }
  })
  const data = await res.json();
  return (
    <>
      <ProductDetails product={data} />
    </>
  )
}

