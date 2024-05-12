"use client";
import FormServices, {
  CostPrice,
  SellPrice,
  Title,
  Duration,
  Tolerance,
  Description,
} from "@/app/structure/Forms/services";
import ui from "./styles.module.scss";
import React from "react";
import Files, { FileInput, FilesList } from "@/app/molecule/files";
import Button from "@/app/atom/button";
import useService from "@/app/customHooks/useService";
import Spinner from "@/app/molecule/Spinner";

export default function AddService() {
  const hook = useService("add");

  return (
    <FormServices
      typeForm="add"
      className={ui.container}
      onSubmited={(data) => hook.setDto(data)}
    >
      <h1>Alta servicio</h1>
      <Title label="Título" />
      <SellPrice label="Precio" />
      <CostPrice label="Costo" />
      <Duration label="Duración" />
      <Tolerance label="Tolerancia" />
      <Description />

      {hook.isUpdating ? (
        <Spinner text="Agregando servicio" />
      ) : (
        <Button type="submit">Agregar servicio</Button>
      )}

      <Files onChange={(files) => hook.setCurrentFiles(files)}>
        <FileInput />
        <FilesList />
      </Files>
    </FormServices>
  );
}
