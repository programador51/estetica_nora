"use client";
import React from "react";
import Input from "@/app/atom/input";
import TypeAccount from "@/app/molecule/typeAccount";
import Button from "@/app/atom/button";
import Link from "next/link";
import layout from "@/app/iniciar-sesion/styles.module.scss";
import useRecoverPassword from "../customHooks/useRecoverPassword";

export default function ForgotPassword() {
  const hook = useRecoverPassword();

  if (!hook.canShowRecoverForm)
    return (
      <div className={layout.loginContainer}>
        <form className={layout.login}>
          <h1>Recuperar contraseña</h1>
          <Input placeholder="Escribe aquí" label="Correo" type="email" />
          <TypeAccount />
          <Button>Enviar contraseña</Button>
          <Link href={"/iniciar-sesion"}>
            <Button theme="secondary">Iniciar sesión</Button>
          </Link>
        </form>
      </div>
    );
}
