"use client";
import Files, { FileInput, FilesList } from "@/app/molecule/files";
import React from "react";
import ui from "./styles.module.scss";
import Button from "@/app/atom/button";
import "react-quill/dist/quill.snow.css";
import FormCatalogue, {
  Title,
  SellPrice,
  CostPrice,
  StockAvailable,
  Description,
} from "@/app/structure/Forms/users/catalogue";
import useCatalogueCRUD from "@/app/customHooks/useCatalogueCRUD";

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
      <Button type="submit">Agregar producto</Button>

      <div className={ui.filesContainer}>
        <Files onChange={hook.setFiles}>
          <FileInput multiple={true} />
          <FilesList />
        </Files>
      </div>
    </FormCatalogue>
  );
}
