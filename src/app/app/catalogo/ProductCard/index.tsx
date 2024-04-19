import Button from "@/app/atom/button";
import Link from "next/link";
import React from "react";
import { PropsProduct } from "./types";
import ui from "./styles.module.scss";

export default function ProductCard({ id, image, title }: PropsProduct) {
  return (
    <article className={ui.productCard}>
      <div className={ui.productOverview}>
        <img
          src={typeof image === "string" ? image : ""}
          alt={`producto_catalogo`}
        />
        <p>{title}</p>
      </div>

      <Link href={`/app/catalogo/${id}`}>
        <Button>Ver</Button>
      </Link>
    </article>
  );
}
