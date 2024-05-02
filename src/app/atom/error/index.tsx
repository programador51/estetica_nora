import React from "react";
import ui from "./styles.module.scss";
import { PropsCustomError } from "./types";

export default function CustomError({ children }: PropsCustomError) {
  if (children === "") return <></>;

  return <p className={ui.error}>{children}</p>;
}
