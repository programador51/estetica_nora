"use client";
import Files, { FileInput, FilesList } from "@/app/molecule/files";
import React from "react";
import ui from "./styles.module.scss";
import Button from "@/app/atom/button";
import FormCatalogue, {
  Title,
  SellPrice,
  CostPrice,
  StockAvailable,
  Description,
} from "@/app/structure/Forms/users/catalogue";
import useCatalogueCRUD from "@/app/customHooks/useCatalogueCRUD";
import Spinner from "@/app/molecule/Spinner";

export default function AddProduct() {
  const hook = useCatalogueCRUD();

  return (
    <FormCatalogue
      type="add"
      onSubmitedData={(data) => hook.setDto(data)}
      className={ui.container}
    >
      <h1>Alta producto</h1>
      <Title label="Título" />
      <SellPrice label="Precio" />
      <CostPrice label="Costo" />
      <StockAvailable label="Stock disponible" />
      <Description />

      {hook.isLoading ? (
        <Spinner text="Agregando" />
      ) : (
        <Button type="submit">Agregar producto</Button>
      )}

      <div className={ui.filesContainer}>
        <Files onChange={hook.setFiles}>
          <FileInput multiple={true} disabled={hook.isLoading} />
          <FilesList />
        </Files>
      </div>
    </FormCatalogue>
  );
}
