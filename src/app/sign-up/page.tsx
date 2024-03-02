import Image from "next/image";
import SignUpForm from "@/components/forms/signup-form";
import Link from "next/link";
import AuthLayouts from "@/components/forms/AuthLayouts";

const SignUp = () => {
  return (
    <>
      <AuthLayouts>
        <SignUpForm />
      </AuthLayouts>
    </>
  );
};
export default SignUp;
