"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import OtpInputForm from "../forms/OtpInputForm";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
export default function OtpDialog({
  open = true,
  onClose,
  onSubmit,
}: {
  open: boolean;
  onClose: () => void;
  onSubmit: (otp: number, hash: string, phone: string) => void;
}) {
  const [otp, setOtp] = useState("");
  const searchParams = useSearchParams();
  const phone = searchParams.get("phone") || "";
  const hash = searchParams.get("hash") || "";

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md px-4">
        <DialogHeader className="px-4">
          <DialogTitle>Enter OTP</DialogTitle>
          <DialogDescription>
            We have just send you an otp to your number {phone}.
          </DialogDescription>
        </DialogHeader>
        <form
          id="otpForm"
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(+otp, hash, phone);
          }}
          className="flex items-center justify-center"
        >
          <OtpInputForm otp={otp} setOtp={setOtp} />
        </form>
        <DialogFooter className="sm:justify-end mr-6">
          <DialogClose asChild>
            <Button form="otpForm" type="submit">
              Verify
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
