import React from "react";
import ui from "@/app/atom/input/styles.module.scss";
import { PropsSelect } from "./types";

export default function Select(props: PropsSelect) {
  return (
    <div className={ui.inputContainer}>
      <label htmlFor={props.name}>{props.label}</label>
      <select {...props} className={ui.inputContainer}></select>
    </div>
  );
}
