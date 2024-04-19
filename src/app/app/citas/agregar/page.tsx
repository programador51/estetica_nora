"use client";
import React, { useState } from "react";
import ui from "./styles.module.scss";
import DateInput from "@/app/molecule/dateInput";
import Input from "@/app/atom/input";
import UsersSelect from "@/app/molecule/usersSelect";
import Money from "@/app/atom/money";

export default function AddReservation() {
  return (
    <div>
      <h1 className={ui.header}>Alta cita</h1>
      <DateInput />
      <Input type="time" label="Hora" />
      <UsersSelect />

      <div>
        <b>Tiempo total</b>
        <span>30min</span>
      </div>

      <div>
        <b>Precio</b>
        <Money>{300}</Money>
      </div>
    </div>
  );
}
