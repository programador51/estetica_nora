"use client";
import React from "react";
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
import { DtoRegisterUser } from "../customHooks/useRegisterUser/types";
import Spinner from "../molecule/Spinner";

export default function Register() {
  const hook = useRegisterUser();

  return (
    <ContextRegisterUser.Provider value={hook}>
        <FormUsers
          type="register"
          className={ui.containerRegister}
          onSubmitedForm={(data) =>
            hook.attemptRegisterUser(data as DtoRegisterUser)
          }
        >
          <h1>Registro cuenta</h1>

          <ProfilePicture onChange={hook.setProfilePicture} />

          <Email />
          <Phone />
          <FirstName />
          <MiddleName />
          <MotherName />
          <ParentName />
          <PasswordConfirmation />

          {hook.isRegistering ? (
            <Spinner text="Creando cuenta" />
          ) : (
            <Button type="submit" disabled={hook.isRegistering}>
              Registrarse
            </Button>
          )}
        </FormUsers>
      </ContextRegisterUser.Provider>
  );
}
