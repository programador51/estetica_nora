"use client";
import React, { Fragment } from "react";
import Button from "@/app/atom/button";
import ui from "./styles.module.scss";
import TypeAccount from "@/app/molecule/typeAccount";
import Link from "next/link";
import useLogin from "@/app/customHooks/useLogin";
import FormUsers, { Email, Password } from "@/app/structure/Forms/users";
import Spinner from "@/app/molecule/Spinner";

export default function Login() {
  const hook = useLogin();

  return (
    <div className={ui.loginContainer}>
      <FormUsers
        type="login"
        className={ui.login}
        onSubmitedForm={(data) => hook.attemptLoginUser(data)}
      >
        <h1>Iniciar sesión</h1>

        <Email
          label={
            hook.type === "usuario" ? "Correo usuario" : "Correo administrador"
          }
        />
        <Password label="Contraseña" placeholder="Escribe aquí" />

        <TypeAccount onChange={hook.setTypeAccount} value={hook.type} />

        {hook.isLoging ? (
          <Spinner text="Iniciando sesión" />
        ) : (
          <Fragment>
            <Button type="submit">Ingresar</Button>

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
          </Fragment>
        )}
      </FormUsers>
    </div>
  );
}
