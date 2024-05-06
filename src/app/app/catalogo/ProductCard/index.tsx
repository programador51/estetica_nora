import Button from "@/app/atom/button";
import Link from "next/link";
import React, { useState } from "react";
import { PropsProduct } from "./types";
import ui from "./styles.module.scss";

export default function ProductCard({ id, image, title, stock }: PropsProduct) {
  const [img, setImg] = useState(typeof image === "string" ? image : "");

  return (
    <article className={ui.productCard}>
      <div className={ui.productOverview}>
        <img
          src={img}
          alt={`producto_catalogo`}
          onError={() => setImg("/no_image.png")}
        />
        <div className={ui.productDetails}>
          <p>{title}</p>

          <div className={ui.stock}>
            <b>Stock</b>
            <span>{stock}</span>
          </div>
        </div>
      </div>

      <Link href={`/app/catalogo/${id}`}>
        <Button>Ver</Button>
      </Link>
    </article>
  );
}
