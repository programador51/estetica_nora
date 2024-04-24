import { formatTime } from "@/app/helpers/dates";
import React from "react";

export default function Time({ children }: { children: number }) {
  if (children <= 0) return <span>No disponible</span>;

  return <time>{formatTime(children)}</time>;
}
