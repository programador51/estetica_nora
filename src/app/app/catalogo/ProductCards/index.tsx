import ContextCatalogue from "@/app/Contexts/CatalogueContext";
import Spinner from "@/app/molecule/Spinner";
import React, { useContext, useRef } from "react";
import ProductCard from "@/app/app/catalogo/ProductCard";
import { v4 } from "uuid";

export default function ProductCards() {
  const hook = useContext(ContextCatalogue);

  const key = useRef(`${v4()}`);

  if (hook.isLoading) return <Spinner text="Cargando productos" />;

  return hook.products.map((product, i) => (
    <ProductCard
      key={`${key.current}-${i}`}
      id={product.id}
      image={product.imagen[0]}
      stock={product.stockDisponible}
      title={product.titulo}
    />
  ));
}
