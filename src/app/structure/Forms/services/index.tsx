import React, { createContext, useContext } from "react";
import { PropsFormServices } from "./types";
import useFormServices from "@/app/customHooks/useFormServices";
import WYSIWYG from "@/app/atom/WYSIWYG";
import Spinner from "@/app/molecule/Spinner";
import CustomError from "@/app/atom/error";
import Input from "@/app/atom/input";
import { ErrorMessage } from "@hookform/error-message";
import { Controller } from "react-hook-form";
import { PropsInput } from "@/app/atom/input/types";
import { ReturnUseFormServices } from "@/app/customHooks/useFormServices/types";
import { ReactQuillProps } from "react-quill";

const ContextFormServices = createContext<ReturnUseFormServices>({
  form: undefined,
});

export default function FormServices(props: PropsFormServices) {
  const hook = useFormServices(props.typeForm);

  const { onSubmited = () => {} } = props;

  return (
    <ContextFormServices.Provider value={hook}>
      <form
        {...props}
        onSubmit={hook.form?.handleSubmit(
          (data) => onSubmited(data),
          (e) => onSubmited(undefined)
        )}
        noValidate
      >
        {props.children}
      </form>
    </ContextFormServices.Provider>
  );
}

export function Title(props: PropsInput) {
  const hook = useContext(ContextFormServices);

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
  const hook = useContext(ContextFormServices);

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
  const hook = useContext(ContextFormServices);

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

export function Duration(props: PropsInput) {
  const hook = useContext(ContextFormServices);

  if (hook.form === undefined) return <></>;

  return (
    <Controller
      name="duracion"
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
            name="duracion"
            render={({ message }) => <CustomError>{message}</CustomError>}
          />
        </div>
      )}
    />
  );
}

export function Tolerance(props: PropsInput) {
  const hook = useContext(ContextFormServices);

  if (hook.form === undefined) return <></>;

  return (
    <Controller
      name="tolerancia"
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
            name="tolerancia"
            render={({ message }) => <CustomError>{message}</CustomError>}
          />
        </div>
      )}
    />
  );
}

export function Description(props: ReactQuillProps) {
  const hook = useContext(ContextFormServices);

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
