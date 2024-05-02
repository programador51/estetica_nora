"use client";
import Input from "@/app/atom/input";
import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { v4 } from "uuid";
import { ContextPassword, PropsPassword, StatePassword } from "./types";
import ui from './styles.module.scss';

const ContextPasswords = createContext<ContextPassword>({
  passA: "",
  passB: "",
  show: false,
  toggleShowPassword: () => {},
  setPassword: () => {},
});

export default function ConfirmPasswords({
  children,
  onChange = () => {},
}: PropsPassword) {
  const [state, setState] = useState<StatePassword>({
    passA: "",
    passB: "",
    show: false,
  });

  useEffect(()=>{
    if(state.passA===state.passB){
      onChange(state.passA)
      return
    }

    onChange("")
  },[state.passA,state.passB]);

  const setPassword = (type: "A" | "B", password: string) =>
    setState((current) => ({
      ...current,
      [`pass${type}`]: password,
    }));

  const toggleShowPassword = () =>
    setState((current) => ({ ...current, show: !current.show }));

  return (
    <ContextPasswords.Provider
      value={{ ...state, toggleShowPassword, setPassword }}
    >
      {children}
    </ContextPasswords.Provider>
  );
}

export function PasswordA() {
  const hook = useContext(ContextPasswords);

  return (
    <Input
      placeholder="Escribe aquí"
      label="Contraseña"
      onChange={(e) => hook.setPassword("A", e.target.value)}
      type={hook.show ? "text" : "password"}
    />
  );
}

export function ErrorPassword() {
  const hook = useContext(ContextPasswords);

  if (hook.passA !== hook.passB) return <p className={ui.passwordError}>Contraseñas no coinciden</p>;

  return <></>
}

export function PasswordB() {
  const hook = useContext(ContextPasswords);

  return (
    <Input
      placeholder="Escribe aquí"
      onChange={(e) => hook.setPassword("B", e.target.value)}
      label="Confirmar contraseña"
      type={hook.show ? "text" : "password"}
    />
  );
}

export function ShowPasswords() {
  const id = useRef(`${v4()}`);

  const hook = useContext(ContextPasswords);

  return (
    <div className={ui.showPasswords}>
      <label htmlFor={id.current}>Mostrar contraseñas</label>
      <input
        type="checkbox"
        name={id.current}
        id={id.current}
        onChange={hook.toggleShowPassword}
      />
    </div>
  );
}
