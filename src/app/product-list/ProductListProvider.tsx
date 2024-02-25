"use client"
import Loading from '@/components/Loading'
import ProductListComponent from '@/components/ProductListComponent'
import { ProductSchema } from '@/lib/models/products.model'
import React, { Suspense } from 'react'

const ProductListProvider = ({data}:{data:ProductSchema[]}) => {
    return (
        <div>
            <Suspense fallback={<Loading />}>
                <ProductListComponent products={data} />
            </Suspense>
        </div>
    )
}

export default ProductListProvider