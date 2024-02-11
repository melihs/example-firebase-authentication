"use client";
import * as Yup from "yup";
import Link from "next/link";
import { useFormik } from "formik";
import { redirect } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { Button } from "@nextui-org/react";
import EmailInput from "@/components/emailInput/EmailInput";
import PasswordInput from "@/components/passwordInput/PasswordInput";
import { useAuthState } from "react-firebase-hooks/auth";
import { signInWithEmailAndPassword } from "firebase/auth";

import { auth } from "@/lib/firebaseConfig";

const Login = () => {
  const [user, loading] = useAuthState(auth);

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("invalid or incomplete email")
      .max(50, "email is too long")
      .required("required"),
    password: Yup.string()
      .min(6, "password is too short must be at least 6 characters")
      .required("required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
      const res = await signInWithEmailAndPassword(auth, email, password);
      if (res?.user) {
        sessionStorage.setItem("user", "true");
        redirect("/");
      } else {
        toast.error("Check your user information!");
      }
    },
  });

  const { errors, values, touched, handleSubmit, handleChange, isSubmitting } =
    formik;

  if (typeof window !== "undefined") {
    if (user && sessionStorage.getItem("user")) return redirect("/");
  }

  if (loading) return <p>Checking...</p>;

  return (
    <div className="flex min-h-screen items-center justify-center bg-black">
      <div className="flex w-full max-w-md flex-col rounded-lg bg-white p-8 shadow-md">
        <div className="text-black-1 mb-12 flex flex-col items-center justify-center gap-y-3">
          <p className="text-2xl font-bold">Example App</p>
        </div>
        <form
          noValidate
          onSubmit={handleSubmit}
          className="flex flex-col gap-y-6"
        >
          <Toaster position="top-right" />
          <EmailInput
            handleChange={handleChange}
            values={values}
            errors={errors}
            touched={touched}
          />
          <PasswordInput
            handleChange={handleChange}
            values={values}
            errors={errors}
            touched={touched}
          />
          <Button
            fullWidth={true}
            type="submit"
            color="success"
            className="bg-primary rounded-lg px-6 py-3.5 text-lg text-white hover:bg-blue-600"
            isLoading={isSubmitting}
          >
            Login
          </Button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          <Link href="/signup" className="text-blue-500">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
