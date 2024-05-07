"use client";
import Files, { FileInput, FilesList } from "@/app/molecule/files";
import FormCatalogue, {
  CostPrice,
  Description,
  SellPrice,
  StockAvailable,
  Title,
} from "@/app/structure/Forms/users/catalogue";
import React from "react";
import ui from "@/app/app/catalogo/agregar/styles.module.scss";
import useCatalogueCRUD from "@/app/customHooks/useCatalogueCRUD";
import Spinner from "@/app/molecule/Spinner";
import Button from "@/app/atom/button";

export default function UpdateCatalogue() {
  const hook = useCatalogueCRUD();

  return (
    <FormCatalogue
      type="add"
      onSubmitedData={(data) => hook.setDto(data)}
      className={ui.container}
    >
      <h1>Actualización producto</h1>
      <Title label="Título" />
      <SellPrice label="Precio" />
      <CostPrice label="Costo" />
      <StockAvailable label="Stock disponible" />
      <Description />

      {hook.isLoading ? (
        <Spinner text="Actualizando" />
      ) : (
        <Button type="submit">Actualizar producto</Button>
      )}

      <div className={ui.filesContainer}>
        <Files>
          <FileInput multiple={true} disabled={hook.isLoading} />
          <FilesList />
        </Files>
      </div>
    </FormCatalogue>
  );
}
