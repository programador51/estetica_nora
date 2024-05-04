"use client";
import React, { createContext, useContext } from "react";
import { PropsFormCatalogue } from "./types";
import useFormCatalogue from "@/app/customHooks/useFormCatalogue";
import { ReturnUseForm } from "@/app/customHooks/useFormCatalogue/types";
import CustomError from "@/app/atom/error";
import Input from "@/app/atom/input";
import { ErrorMessage } from "@hookform/error-message";
import { Controller } from "react-hook-form";
import { PropsInput } from "@/app/atom/input/types";
import WYSIWYG from "@/app/atom/WYSIWYG";
import { ReactQuillProps } from "react-quill";

const ContextFormCatalogue = createContext<ReturnUseForm>({
  form: undefined,
});

export default function FormCatalogue(props: PropsFormCatalogue) {
  const hook = useFormCatalogue(props.type);

  return (
    <ContextFormCatalogue.Provider value={hook}>
      <form
        {...props}
        onSubmit={hook.form?.handleSubmit(console.log, console.log)}
        noValidate
      >
        {props.children}
      </form>
    </ContextFormCatalogue.Provider>
  );
}

export function Title(props: PropsInput) {
  const hook = useContext(ContextFormCatalogue);

  if (hook.form === undefined) return <></>;

  return (
    <Controller
      name="titulo"
      control={hook.form.control}
      render={({ field }) => (
        <div>
          <Input
            {...field}
            type="text"
            placeholder="Escribe aquí"
            autoComplete="off"
            {...props}
          />

          <ErrorMessage
            errors={hook.form?.formState.errors}
            name="titulo"
            render={({ message }) => <CustomError>{message}</CustomError>}
          />
        </div>
      )}
    />
  );
}

export function SellPrice(props: PropsInput) {
  const hook = useContext(ContextFormCatalogue);

  if (hook.form === undefined) return <></>;

  return (
    <Controller
      name="precio"
      control={hook.form.control}
      render={({ field }) => (
        <div>
          <Input
            {...field}
            placeholder="Escribe aquí (Obligatorio)"
            min={0}
            type="number"
            {...props}
          />

          <ErrorMessage
            errors={hook.form?.formState.errors}
            name="precio"
            render={({ message }) => <CustomError>{message}</CustomError>}
          />
        </div>
      )}
    />
  );
}

export function CostPrice(props: PropsInput) {
  const hook = useContext(ContextFormCatalogue);

  if (hook.form === undefined) return <></>;

  return (
    <Controller
      name="costo"
      control={hook.form.control}
      render={({ field }) => (
        <div>
          <Input
            {...field}
            placeholder="Escribe aquí (Obligatorio)"
            min={0}
            type="number"
            {...props}
          />

          <ErrorMessage
            errors={hook.form?.formState.errors}
            name="costo"
            render={({ message }) => <CustomError>{message}</CustomError>}
          />
        </div>
      )}
    />
  );
}

export function StockAvailable(props: PropsInput) {
  const hook = useContext(ContextFormCatalogue);

  if (hook.form === undefined) return <></>;

  return (
    <Controller
      name="stockDisponible"
      control={hook.form.control}
      render={({ field }) => (
        <div>
          <Input
            {...field}
            placeholder="Escribe aquí (Obligatorio)"
            type="number"
            min={1}
            step="1"
            {...props}
          />

          <ErrorMessage
            errors={hook.form?.formState.errors}
            name="stockDisponible"
            render={({ message }) => <CustomError>{message}</CustomError>}
          />
        </div>
      )}
    />
  );
}

export function Description(props: ReactQuillProps) {
  const hook = useContext(ContextFormCatalogue);

  if (hook.form === undefined) return <></>;

  return (
    <Controller
      name="descripcion"
      control={hook.form.control}
      render={({ field }) => (
        <div>
          <WYSIWYG
            {...field}
            placeholder="Escribe aquí (Obligatorio)"
            {...props}
          />

          <ErrorMessage
            errors={hook.form?.formState.errors}
            name="descripcion"
            render={({ message }) => <CustomError>{message}</CustomError>}
          />
        </div>
      )}
    />
  );
}
