import React from "react";
import { PropsLandingItems } from "./types";
import ui from "./styles.module.scss";
import Money from "@/app/atom/money";

export default function LandingItems(props: PropsLandingItems) {
  return (
    <section className={ui.itemsLandingPage}>
      {props.item.map((item, i) => (
        <article key={`item-${i}`}>
          <img src={item.image} alt="servicio_estética_nora" />
          <div className={ui.title}>
            <h2>{item.title}</h2>
            <Money>{item.price}</Money>
          </div>
          <p className={ui.content}>{item.description}</p>
        </article>
      ))}
    </section>
  );
}
