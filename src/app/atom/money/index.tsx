import { formatCurrency } from "@/app/helpers/numbers";
import React from "react";
import ui from "./styles.module.scss";

export default function Money({ children = 0 }) {
  return <span className={ui.money}>{formatCurrency(children)}</span>;
}
