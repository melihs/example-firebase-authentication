"use client";
import * as Yup from "yup";
import Link from "next/link";
import { useFormik } from "formik";
import { redirect } from "next/navigation";
import { auth } from "@/lib/firebaseConfig";
import { updateProfile } from "firebase/auth";
import toast, { Toaster } from "react-hot-toast";
import { Button, Input } from "@nextui-org/react";
import { useAuthState } from "react-firebase-hooks/auth";
import { createUserWithEmailAndPassword } from "@firebase/auth";

import EmailInput from "@/components/emailInput/EmailInput";
import PasswordInput from "@/components/passwordInput/PasswordInput";

const Signup = () => {
  const [user, loading] = useAuthState(auth);

  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required("required"),
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
      fullName: "",
      password: "",
    },
    validationSchema,
    onSubmit: async ({
      email,
      password,
      fullName,
    }: {
      email: string;
      password: string;
      fullName: string;
    }) => {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth?.currentUser as any, {
        displayName: fullName,
        photoURL: "https://i.pravatar.cc/150?u=a04258114e29026302d",
      });

      res?.user ? sessionStorage.setItem("user", "true") : toast.error("error");
    },
  });

  const { errors, values, touched, handleSubmit, handleChange, isSubmitting } =
    formik;

  if (typeof window !== "undefined") {
    if (user && sessionStorage.getItem("user")) return redirect("/login");
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
          <div>
            <Input
              size="lg"
              type="text"
              label="User name"
              name="fullName"
              labelPlacement="outside"
              placeholder="Enter your name"
              onChange={handleChange}
              value={values?.fullName}
              errorMessage={errors?.fullName}
              isInvalid={(errors?.fullName && touched?.fullName) as boolean}
            />
          </div>
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
            className="green-1 rounded-lg px-6 py-3.5 text-lg text-white hover:bg-green-600"
            isLoading={isSubmitting}
          >
            Sign up
          </Button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          <Link href="/login" className="text-blue-500">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
