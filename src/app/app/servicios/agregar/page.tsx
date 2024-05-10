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

export default function AddService() {
  return (
    <FormServices typeForm="add" className={ui.container}>
      <h1>Alta servicio</h1>
      <Title label="Título" />
      <SellPrice label="Precio" />
      <CostPrice label="Costo" />
      <Duration label="Duración" />
      <Tolerance label="Tolerancia" />
      <Description />

      <Button type="submit">Agregar servicio</Button>

      <Files>
        <FileInput />
        <FilesList />
      </Files>
    </FormServices>
  );
}
