"use client";
import React, { useState } from "react";
import ui from "./styles.module.scss";
import DateInput from "@/app/molecule/dateInput";
import Input from "@/app/atom/input";
import UsersSelect from "@/app/molecule/usersSelect";
import Money from "@/app/atom/money";
import Button from "@/app/atom/button";
import ServicesSelect from "@/app/molecule/servicesSelect";
import useReservation from "@/app/customHooks/useReservation";

export default function AddReservation() {

  const hook = useReservation();

  return (
    <div className={ui.container}>
      <h1 className={ui.header}>Alta cita</h1>
      <DateInput />
      <Input type="time" label="Hora" />
      <UsersSelect onChange={user=>console.log(user.id)}/>
      <ServicesSelect onChange={hook.appendService}/>

      <Button>Crear reservación</Button>

      <div className={ui.time}>
        <b>Tiempo total</b>
        <span>{hook.durationOnMinutes}</span>
      </div>

      <div className={ui.subtotal}>
        <b>Precio</b>
        <Money>{hook.total}</Money>
      </div>
    </div>
  );
}
