import React from "react";
import ui from "./styles.module.scss";
import { PropsInput } from "./types";

export default function Input(props: PropsInput) {
  return (
    <div className={ui.inputContainer}>
      <label htmlFor={props.name}>{props.label}</label>
      <input type="text" {...props}/>
    </div>
  );
}
