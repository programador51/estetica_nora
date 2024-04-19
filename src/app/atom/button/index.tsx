import React from "react";
import { PropsButton, ThemeButtonCss } from "./types";
import ui from "./styles.module.scss";

const THEMES: ThemeButtonCss = {
  primary: ui.primary,
  outline: "",
  secondary: ui.secondary,
  danger:ui.cancel
};

export default function Button(props: PropsButton) {
  const { theme = "primary" , block = true } = props;

  return (
    <button
      style={{
        width:block ? "100%" : "auto"
      }}
      className={`${props.className} ${THEMES[theme]} ${ui.button}`}
      {...props}
    ></button>
  );
}
