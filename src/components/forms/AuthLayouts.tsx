import Image from "next/image";
import React, { ReactNode } from "react";

const AuthLayouts = ({ children }: { children: ReactNode }) => {
  return (
    <div className=" flex flex-col-reverse justify-center md:grid grid-cols-[60%_40%] bg-[url('/net.png')] bg-contain py-10 xl:p-0">
      {children}
      <div className="hidden md:block justify-self-end">
        <Image
          src={"/login.png"}
          alt="dates"
          width={850}
          height={800}
          className="md:w-fit mx-auto md:mx-0 w-[80%]"
        />
      </div>
    </div>
  );
};

export default AuthLayouts;
