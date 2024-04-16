"use client"
import React, { createContext } from "react";
import useApp, { INITIAL_STATE } from "@/app/customHooks/useApp";
import { ReturnUseApp } from "../customHooks/useApp/types";

export const ContextApp = createContext<ReturnUseApp>(INITIAL_STATE);

export default function App({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const hook = useApp();

  return <ContextApp.Provider value={hook}>{children}</ContextApp.Provider>;
}
