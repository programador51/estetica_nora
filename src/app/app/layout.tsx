"use client"
import React from "react";
import useApp from "@/app/customHooks/useApp";
import { ContextApp } from "@/app/Contexts/AppContext";


export default function App({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const hook = useApp();

  return <ContextApp.Provider value={hook}>{children}</ContextApp.Provider>;
}
