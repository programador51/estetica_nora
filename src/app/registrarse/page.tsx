"use client";
import React, { Fragment } from "react";
import Files, { FileInput, FilesList } from "@/app/molecule/files";
import Button from "@/app/atom/button";
import useRegisterUser from "../customHooks/useRegisterUser";
import FormUsers, {
  Email,
  FirstName,
  MiddleName,
  ParentName,
  Phone,
  MotherName,
  PasswordConfirmation,
  ProfilePicture,
} from "@/app/structure/Forms/users";
import ui from "./styles.module.scss";
import ContextRegisterUser from "../Contexts/RegisterContext";

export default function Register() {
  const hook = useRegisterUser();

  return (
    <ContextRegisterUser.Provider value={hook}>
      <FormUsers type="register" className={ui.containerRegister}>
        <h1>Registro cuenta</h1>

        <ProfilePicture onChange={hook.setProfilePicture}/>

        <Email />
        <Phone />
        <FirstName />
        <MiddleName />
        <MotherName />
        <ParentName />
        <PasswordConfirmation />
        <Button type="submit">Registrarse</Button>
      </FormUsers>
    </ContextRegisterUser.Provider>
  );
}
