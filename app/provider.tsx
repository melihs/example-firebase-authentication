"use client";
import { ReactNode } from "react";
import { NextUIProvider } from "@nextui-org/react";

const Provider = ({ children }: Readonly<{ children: ReactNode }>) => {
  return <NextUIProvider>{children}</NextUIProvider>;
};

export default Provider;
