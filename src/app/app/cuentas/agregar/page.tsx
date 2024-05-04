"use client";
import React, { useState } from "react";
import ui from "./styles.module.scss";
import UserAcess from "@/app/molecule/UserAccess";//
import Button from "@/app/atom/button";

//import useReservation from "@/app/customHooks/useReservation";//
import useAccessUserRoles  from "@/app/customHooks/useAccessUserRoles";

export default function AddRoles() {

  const hook = useAccessUserRoles();

  return (
    <div className={ui.container}>
      <h1 className={ui.header}>Cuentas</h1>
      
    <UserAcess onChange={user=>console.log(user.id)}/>
    

      <Button>Acceder</Button>

      

      
      </div>
    
  );
}
