"use client";
import Link from "next/link";
import Image from "next/image";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Button from "../button/Button";
import Menu from "../../public/menu.png";
import Cross from "../../public/cross.png";
import { ActionTypes, useCart } from "@/app/cart";
import React from "react";
import { useUser } from "@/components/Providers/user-provider";
import { logoutAction } from "@/lib/actions/user-actions";
import { Mulish } from "next/font/google";
const mulish = Mulish({ subsets: ["latin"] });
const Header = () => {
  const { isSidebarOpen, toggleSidebar } = useCart();
  const { user, dispatch } = useUser();

  const router = useRouter();
  const [menu, setMenu] = useState(false);
  const checkout = () => {
    router.push("/checkout");
    toggleSidebar();
  };
  const [sliderValue, setSliderValue] = useState(0);
  const handleSliderChange = (event: any) => {
    setSliderValue(parseInt(event.target.value, 10));
  };

  useEffect(() => {
    const disableScroll = (e: any) => {
      e.preventDefault();
    };
    document.body.addEventListener("scroll", disableScroll, { passive: false });
    return () => {
      document.body.removeEventListener("scroll", disableScroll);
    };
  }, []);

  const { cartState, cartDispatch } = useCart();

  const handleIncrement = (item: any) => {
    cartDispatch({ type: ActionTypes.INCREASE_QUANTITY, payload: item });
  };

  const handleDecrement = (item: any) => {
    cartDispatch({ type: ActionTypes.DECREASE_QUANTITY, payload: item });
  };

  const handleRemove = (item: any) => {
    cartDispatch({ type: ActionTypes.REMOVE_FROM_CART, payload: item });
  };

  // Calculate the total value and total quantity ...
  const { totalValue, totalQuantity } = cartState?.cartItems?.reduce(
    (accumulator, item) => {
      const { totalValue, totalQuantity } = accumulator;
      const itemTotal = item.quantity * item.product.price;
      return {
        totalValue: totalValue + itemTotal,
        totalQuantity: totalQuantity + item.quantity,
      };
    },
    { totalValue: 0, totalQuantity: 0 }
  );

  const productPage = () => {
    router.push("/product-list");
    toggleSidebar();
  };

  function redirect() {
    router.push("/login");
    setMenu(false);
  }

  return (
    <>
      <div
        className={`flex  relative justify-between bg-[#1A5632] text-primary-500 items-center py-4 px-4 sm:px-16 md:px-20 ${mulish.className}`}
      >
        <div className="md:flex gap-8 text-[1.25rem] hidden">
          <div
            className="cursor-pointer"
            onClick={() => router.push("/our-story")}
          >
            OUR STORY
          </div>
          <div
            className="cursor-pointer"
            onClick={() => router.push("/product-list")}
          >
            SHOP
          </div>

        </div>
        {menu ? (
          <div className="sidebar px-4 py-5  bg-[#F7F2ED] block md:hidden w-[70vw] h-screen fixed top-0 left-0 z-10">
            <div className="flex justify-end items-center">
              <Image
                src={Cross}
                alt="logo"
                className="w-[20px] mt-3 h-[20px]  flex sm:flex-col md:flex-row justify-center cursor-pointer  md:hidden"
                onClick={() => setMenu(!menu)}
              />
            </div>
            <div className="mt-10 flex flex-col text-xl">
              {user ? (
                <div
                  className="gap-2 items-center cursor-pointer flex"
                  onClick={() => {
                    setMenu(!menu), router.push("/account-info");
                  }}
                >
                  <span className="font-semibold text-[1.25rem]  ">
                 ``   {user.name}
                  </span>
                  <span>
                    <Image
                      src={"/svg/dropdown.svg"}
                      alt="dropdown"
                      width={16}
                      height={16}
                    />
                  </span>
                </div>
              ) : (
                <div
                  className="gap-2 items-center cursor-pointer flex"
                  onClick={() => {
                    setMenu(!menu), router.push("/login");
                  }}
                >
                  <span className="font-semibold text-[1.25rem]  ">LOGIN</span>
                  <span>
                    <Image
                      src={"/svg/dropdown.svg"}
                      alt="dropdown"
                      width={16}
                      height={16}
                    />
                  </span>
                </div>
              )}
              <ul className="flex flex-col gap-y-4 mt-6 text-[#ggg]">
                <div
                  className="cursor-pointer"
                  onClick={() => {
                    router.push("/product-list"), setMenu(!menu);
                  }}
                >
                  SHOP{" "}
                </div>
                <div
                  className="cursor-pointer"
                  onClick={() => {
                    router.push("/our-story"), setMenu(!menu);
                  }}
                >
                  OUR STORY
                </div>
              </ul>
            </div>
          </div>
        ) : null}
        <div>
          <Image
            src={Menu}
            alt="logo"
            onClick={() => setMenu(!menu)}
            className="w-[35px]  flex sm:flex-col md:flex-row justify-center h-full cursor-pointer  md:hidden"
          />
        </div>
        <div>
          <Image
            src="/svg/logo.svg"
            alt="logo"
            width={140}
            height={140}
            className="w-[120px] md:mr-44  md:w-[200px] h-full cursor-pointer"
            onClick={() => router.push("/")}
          />
        </div>
        <div className="flex gap-8 text-sm items-center">
          {user ? (
            <div>
              {/* <div className="text-primary-400 text-[13px]">Hi, Alex Carder</div> */}
              <div
                className="gap-2 items-center cursor-pointer hidden md:flex"
                onClick={() => router.push("/account-info")}
              >
                <span className="font-semibold text-[1.25rem] ">
                  {user.name}
                  {/* Alex */}
                </span>
                <span>
                  <Image
                    src={"/svg/dropdown.svg"}
                    alt="dropdown"
                    width={16}
                    height={16}
                  />
                </span>
              </div>
            </div>
          ) : (
            <div>
              {/* <div className="text-primary-400 text-[13px]">Hi, Alex Carder</div> */}
              <div
                className="gap-2 items-center cursor-pointer hidden md:flex"
                onClick={() => router.push("/login")}
              >
                <span className="font-semibold text-[1.25rem] ">LOGIN</span>
                <span>
                  <Image
                    src={"/svg/dropdown.svg"}
                    alt="dropdown"
                    width={16}
                    height={16}
                  />
                </span>
              </div>
            </div>
          )}
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={toggleSidebar}
          >
            <Link href={"#"} className="hidden md:block text-[1.25rem]">
              CART
            </Link>
            <div className="flex items-center">
              <Image src={"/svg/bag.svg"} alt="cart" width={28} height={28} />
              <div className="hidden md:block">
                {cartState?.cartItems?.length}
              </div>
            </div>
          </div>
        </div>
      </div>
      {isSidebarOpen === true && (
        <div className="fixed w-screen top-0 h-screen bg-black/75 z-10">
          <div className="text-left p-4 w-[400px] fixed right-0 bg-[#F0E5DB] h-screen">
            <div className="flex justify-between mb-4">
              <h2 className="text-primary-500 pl-2">
                SHOPPING CART ({cartState?.cartItems?.length})
              </h2>
              <div className="w-fit cursor-pointer" onClick={toggleSidebar}>
                <Image src={"/close.png"} alt="close" width={20} height={20} />
              </div>
            </div>
            <div className="grid gap-4 overflow-auto h-[65vh]">
              {cartState?.cartItems?.length > 0
                ? cartState?.cartItems?.map((item: any, index: number) => {
                  return (
                    <React.Fragment key={index}>
                      <div
                        className="bg-[#1A5632] rounded-md p-4 flex items-center gap-4"
                        key={index}
                      >
                        <div>
                          <Image
                            src={item?.product?.image}
                            alt="dates"
                            width={120}
                            height={120}
                          />
                        </div>
                        <div className="w-full">
                          <h3 className="text-primary-500 text-[18px]">
                            {item?.product?.name}
                          </h3>
                          <div className="flex items-center mt-[2px] mb-2 justify-between">
                            <div className="text-white text-sm">
                              <span>{item?.product?.unit} x</span>
                              <span>{item?.product?.price}</span>
                            </div>
                            <div className="w-fit text-white p-[2px] rounded-full border cursor-pointer">
                              {/* <Image
                                src={"/close.png"}
                                alt="close"
                                width={20}
                                height={20}
                              /> */}

                              <span
                                className="p-2 text-sm w-[20px] h-[40px] text-center rounded-full"
                                onClick={() => handleRemove(item)}
                              >
                                {" "}
                                X
                              </span>
                            </div>
                          </div>
                          <div>
                            <div className="flex gap-2 items-center w-[100px] border border-[#e5e5e9] px-2 py-[8px] bg-white rounded-full">
                              <button
                                className="text-2xl w-6 h-6 flex items-center justify-center bg-[#e5e5e5] rounded-full"
                                onClick={() => handleDecrement(item)}
                              >
                                -
                              </button>
                              <span className="text-md w-4">
                                {item?.quantity}
                              </span>
                              <button
                                className="text-2xl w-6 h-6 flex items-center justify-center bg-[#e5e5e5] rounded-full"
                                onClick={() => handleIncrement(item)}
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </React.Fragment>
                  );
                })
                : "No Item In Cart"}
            </div>
            <div className="bg-success-green-950 absolute flex flex-col justify-center items-center bottom-0 right-0 w-full p-4">
              <div className="text-white flex  w-11/12 relative md:w-auto justify-between my-4">
                <h3>Total {totalQuantity || ""}</h3>
                <span className="ml-2">₹{totalValue}</span>
              </div>
              <div className="w-11/12 relative md:w-auto">
                <Button
                  text="CHECKOUT"
                  className="rounded-md w-full justify-center text-sm font-semibold"
                  onClick={checkout}
                />
                <Button
                  onClick={productPage}
                  text="CONTINUE SHOPPING"
                  className="rounded-md w-full  justify-center !bg-[#03332c] text-primary-500 text-sm font-semibold"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default Header;
const cartCollection = [
  {
    imgUrl: "/cart/01.png",
    productName: "Black Dates",
    totalWeight: "2 kg",
    pricePerPiece: "500.00",
  },
  {
    imgUrl: "/cart/01.png",
    productName: "Black Dates",
    totalWeight: "2 kg",
    pricePerPiece: "500.00",
  },
  {
    imgUrl: "/cart/01.png",
    productName: "Black Dates",
    totalWeight: "2 kg",
    pricePerPiece: "500.00",
  },
];
