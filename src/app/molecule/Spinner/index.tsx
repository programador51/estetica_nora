import React from "react";
import MoonLoader from "react-spinners/MoonLoader";
import ui from "./styles.module.css";

export default function Spinner({ text = "Cargando" }) {
  return (
    <div className={ui.spinner}>
      <MoonLoader />
      <p className={ui.loadingText}>{text}</p>
    </div>
  );
}
