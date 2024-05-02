"use client";
import CustomError from "@/app/atom/error";
import Input from "@/app/atom/input";
import useFormUsers from "@/app/customHooks/useFormUsers";
import { ErrorMessage } from "@hookform/error-message";
import React, { createContext, useContext, useEffect, useState } from "react";
import { PropsFormUsers, PropsInputProfilePic } from "./types";
import { ReturnUseFormUsers } from "@/app/customHooks/useFormUsers/types";
import { Controller } from "react-hook-form";
import PhoneInput from "@/app/atom/phone";
import ConfirmPasswords, {
  ErrorPassword,
  PasswordA,
  PasswordB,
} from "@/app/molecule/confirmPasswords";
import Files, { FileInput, FilesList } from "@/app/molecule/files";
import ui from "./styles.module.scss";

const FormUsersContext = createContext<ReturnUseFormUsers>({
  form: undefined,
});

export default function FormUsers(props: PropsFormUsers) {
  const hook = useFormUsers(props.type);

  return (
    <FormUsersContext.Provider value={hook}>
      <form
        {...props}
        noValidate
        onSubmit={hook.form?.handleSubmit(console.log, console.log)}
      >
        {props.children}
      </form>
    </FormUsersContext.Provider>
  );
}

export function ProfilePicture({
  id,
  onChange = () => {},
}: PropsInputProfilePic) {
  const [profilePicture, setProfilePicture] = useState<File | null>(
    null
  );

  useEffect(()=>{
    onChange(profilePicture)
  },[profilePicture])

  return (
    <div>
      <b>Foto de perfil</b>
      <Files onChange={(files) => setProfilePicture(files[0])}>
        {profilePicture === null || profilePicture === undefined ? (
          <div className={ui.noProfilePicture}>
            <img src="/no_image.png" alt="no_foto_de_perfil_registro" />
            <FileInput multiple={false}>Cargar foto de perfil</FileInput>
          </div>
        ) : (
          <></>
        )}

        <FilesList />
      </Files>
    </div>
  );
}

export function Email() {
  const hook = useContext(FormUsersContext);

  if (hook.form === undefined) return <></>;

  return (
    <Controller
      name="correo"
      control={hook.form.control}
      render={({ field }) => (
        <div>
          <Input
            {...field}
            placeholder="Escribe aquí"
            label="Correo"
            type="email"
            autoComplete="off"
          />

          <ErrorMessage
            errors={hook.form?.formState.errors}
            name="correo"
            render={({ message }) => <CustomError>{message}</CustomError>}
          />
        </div>
      )}
    />
  );
}

export function Phone() {
  const hook = useContext(FormUsersContext);

  if (hook.form === undefined) return <></>;

  return (
    <Controller
      name="telefono"
      control={hook.form.control}
      render={({ field }) => (
        <div>
          <PhoneInput
            {...field}
            placeholder="Escribe aquí (Opcional)"
            label="Teléfono"
            autoComplete="off"
          />

          <ErrorMessage
            errors={hook.form?.formState.errors}
            name="telefono"
            render={({ message }) => <CustomError>{message}</CustomError>}
          />
        </div>
      )}
    />
  );
}

export function FirstName() {
  const hook = useContext(FormUsersContext);

  if (hook.form === undefined) return <></>;

  return (
    <Controller
      name="primerNombre"
      control={hook.form.control}
      render={({ field }) => (
        <div>
          <Input
            {...field}
            placeholder="Escribe aquí"
            label="Primer nombre"
            type="text"
            autoComplete="off"
          />

          <ErrorMessage
            errors={hook.form?.formState.errors}
            name="primerNombre"
            render={({ message }) => <CustomError>{message}</CustomError>}
          />
        </div>
      )}
    />
  );
}

export function MiddleName() {
  const hook = useContext(FormUsersContext);

  if (hook.form === undefined) return <></>;

  return (
    <Controller
      name="segundoNombre"
      control={hook.form.control}
      render={({ field }) => (
        <div>
          <Input
            {...field}
            placeholder="Escribe aquí (Opcional)"
            label="Segundo nombre"
            type="text"
            autoComplete="off"
          />

          <ErrorMessage
            errors={hook.form?.formState.errors}
            name="segundoNombre"
            render={({ message }) => <CustomError>{message}</CustomError>}
          />
        </div>
      )}
    />
  );
}

export function ParentName() {
  const hook = useContext(FormUsersContext);

  if (hook.form === undefined) return <></>;

  return (
    <Controller
      name="apellidoPaterno"
      control={hook.form.control}
      render={({ field }) => (
        <div>
          <Input
            {...field}
            placeholder="Escribe aquí (Opcional)"
            label="Apellido paterno"
            type="text"
            autoComplete="off"
          />

          <ErrorMessage
            errors={hook.form?.formState.errors}
            name="apellidoPaterno"
            render={({ message }) => <CustomError>{message}</CustomError>}
          />
        </div>
      )}
    />
  );
}

export function MotherName() {
  const hook = useContext(FormUsersContext);

  if (hook.form === undefined) return <></>;

  return (
    <Controller
      name="apellidoMaterno"
      control={hook.form.control}
      render={({ field }) => (
        <div>
          <Input
            {...field}
            placeholder="Escribe aquí (Opcional)"
            label="Apellido materno"
            type="text"
            autoComplete="off"
          />

          <ErrorMessage
            errors={hook.form?.formState.errors}
            name="apellidoMaterno"
            render={({ message }) => <CustomError>{message}</CustomError>}
          />
        </div>
      )}
    />
  );
}

export function PasswordConfirmation() {
  const hook = useContext(FormUsersContext);

  if (hook.form === undefined) return <></>;

  return (
    <Controller
      name="contrasena"
      control={hook.form.control}
      render={({ field }) => (
        <div>
          <ConfirmPasswords {...field}>
            <PasswordA />
            <ErrorPassword />
            <PasswordB />

            <ErrorPassword />
          </ConfirmPasswords>

          <ErrorMessage
            errors={hook.form?.formState.errors}
            name="contrasena"
            render={({ message }) => <CustomError>{message}</CustomError>}
          />
        </div>
      )}
    />
  );
}
