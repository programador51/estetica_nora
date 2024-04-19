"use client";
import Input from "@/app/atom/input";
import Files, { FileInput, FilesList } from "@/app/molecule/files";
import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import ui from "./styles.module.scss";
import Button from "@/app/atom/button";

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

      <ReactQuill />

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
