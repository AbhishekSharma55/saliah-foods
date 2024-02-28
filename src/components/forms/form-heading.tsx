"use client";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const FormHeading = () => {
  const searchParams = useSearchParams();
  const [isMounted, setIsMounted] = useState(false);
  const type =
    searchParams.get("type") === "email"
      ? "Email"
      : "Phone";

  useEffect(() => {
    setIsMounted(true);
    return () => {};
  }, []);

  if (!isMounted) return null;

  return (
    isMounted && (
      <h2  className="text-4xl text-primary-500 "> Check your {type}</h2>
    )
  );
};

export default FormHeading;
