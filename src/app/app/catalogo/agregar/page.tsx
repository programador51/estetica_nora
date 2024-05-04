"use client";
import Input from "@/app/atom/input";
import Files, { FileInput, FilesList } from "@/app/molecule/files";
import React from "react";
import ui from "./styles.module.scss";
import Button from "@/app/atom/button";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
});

export default function AddProduct() {
  return (
    <div className={ui.container}>
      <h1>Alta producto</h1>

      <Input type="text" placeholder="Escribe aquí" label="Nombre" />

      <Input type="number" placeholder="Escribe aquí" label="Precio" min={0} />

      <Input
        type="number"
        placeholder="Escribe aquí"
        label="Costo"
        min={0}
        step="0.01"
      />

      <Input
        type="number"
        placeholder="Escribe aquí"
        label="Stock disponible"
        min={1}
        step="1"
      />

      <ReactQuill placeholder="Escribe aquí" />

      <div className={ui.filesContainer}>
        <Files>
          <FileInput />
          <Button>Agregar producto</Button>
          <FilesList />
        </Files>
      </div>
    </div>
  );
}
