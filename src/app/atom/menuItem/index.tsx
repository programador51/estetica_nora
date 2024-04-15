import React from "react";
import { PropsMenuItem } from "./types";
import Link from "next/link";
import ui from "./styles.module.scss";

export default function MenuItem({ link, children }: PropsMenuItem) {
  return (
    <Link className={ui.menuItem} href={link}>
      {children}
    </Link>
  );
}
