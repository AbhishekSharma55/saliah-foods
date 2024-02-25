"use client"
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react'

const ProductCollections = () => {
    const router = useRouter();
    return (
        <>
            {productsCollection?.map((item, ind) => {
                return (
                    <div
                        key={ind}
                        className="cursor-pointer w-[200px] mx-3"
                        onClick={() =>
                            router.push(`/product-list?category=${item.productName}`)
                        }
                    >
                        <div className="md:w-[300px] w-[140px]  ">
                            <Image
                                src={item.imageUrl}
                                alt="product"
                                width={160}
                                height={160}
                                className="md:w-[200px] "
                            />
                        </div>
                        <div className="text-primary-500 mt-4 text-center">
                            {item.productName}
                        </div>
                    </div>
                );
            })}</>
    )
}

export default ProductCollections


const productsCollection = [
    {
        imageUrl: "/Date01.png",
        productName: "Dates",
    },
    {
        imageUrl: "/date02.png",
        productName: "Fusion",
    },
    {
        imageUrl: "/date03.png",
        productName: "Mini Bytes",
    },
    {
        imageUrl: "/date04.png",
        productName: "Honey",
    },
    {
        imageUrl: "/date05.png",
        productName: "Date Syrup",
    },
];
