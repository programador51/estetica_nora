"use client";
import Files, { FileInput, FilesList } from "@/app/molecule/files";
import FormCatalogue, {
  CostPrice,
  Description,
  SellPrice,
  StockAvailable,
  Title,
} from "@/app/structure/Forms/users/catalogue";
import React, { useRef } from "react";
import ui from "@/app/app/catalogo/agregar/styles.module.scss";
import useCatalogueCRUD from "@/app/customHooks/useCatalogueCRUD";
import Spinner from "@/app/molecule/Spinner";
import Button from "@/app/atom/button";

import { usePathname } from "next/navigation";

export default function UpdateCatalogue() {
  const params = usePathname();
  const id = useRef(+params.split("/").reverse()[0]).current;

  const hook = useCatalogueCRUD(id);

  return (
    <FormCatalogue
      type="udpate"
      id="updateCatalogue"
      idItemCatalogue={id}
      onLoadedProduct={(product) => hook.setSavedFiles(product.imagen)}
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
        <Button form="updateCatalogue" type="submit">
          Actualizar producto
        </Button>
      )}

      {hook.filesLoadedFromApi ? (
        <div className={ui.filesContainer}>
          <Files
            defaultFiles={hook.files}
            onChange={(files) => hook.setFiles(files)}
          >
            <FileInput multiple={true} disabled={hook.isLoading} />
            <FilesList />
          </Files>
        </div>
      ) : null}
    </FormCatalogue>
  );
}
