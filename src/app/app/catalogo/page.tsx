"use client";
import ContextCatalogue from "@/app/Contexts/CatalogueContext";
import useCatalogue from "@/app/customHooks/useCatalogue";
import React, { Fragment } from "react";
import ProductCards from "@/app/app/catalogo/ProductCards";
import Button from "@/app/atom/button";
import Link from "next/link";
import ui from "./styles.module.scss";
import Pagination from "@/app/molecule/pagination";

export default function Catalogue() {
  const hook = useCatalogue();

  return (
    <ContextCatalogue.Provider value={hook}>
      <div className={ui.container}>
        <div className={ui.header}>
          <h1>Catálogo</h1>
          <Link href={"/app/catalogo/agregar"}>
            <Button>Agregar producto</Button>
          </Link>
        </div>

        <ProductCards />
        <Pagination/>
      </div>
    </ContextCatalogue.Provider>
  );
}
