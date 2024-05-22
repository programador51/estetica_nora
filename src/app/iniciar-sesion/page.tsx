"use client";
import React from "react";
import Input from "@/app/atom/input";
import Button from "@/app/atom/button";
import ui from "./styles.module.scss";
import TypeAccount from "@/app/molecule/typeAccount";
import Link from "next/link";
import useLogin from "@/app/customHooks/useLogin";

export default function Login() {
  const hook = useLogin();

  return (
    <div className={ui.loginContainer}>
      <form className={ui.login}>
        <h1>Iniciar sesión</h1>

        <Input
          placeholder="Escribe aquí"
          label={
            hook.type === "usuario" ? "Correo usuario" : "Correo administrador"
          }
          type="email"
        />

        <Input placeholder="Escribe aquí" label="Contraseña" type="password" />

        <TypeAccount onChange={hook.setTypeAccount} value={hook.type} />

        <Link href={"/app/citas"}>
          <Button type="button">Ingresar</Button>
        </Link>

        <Link href={"/olvide-cuenta"}>
          <Button type="button" theme="secondary">
            Olvide mi contraseña
          </Button>
        </Link>

        <Link href={"/registrarse"}>
          <Button type="button" theme="secondary">
            Crear cuenta
          </Button>
        </Link>
      </form>
    </div>
  );
}
