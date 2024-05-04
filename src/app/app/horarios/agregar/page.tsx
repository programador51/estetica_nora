"use client";
import React, { useState } from "react";
import ui from "./styles.module.scss";
import DateInput from "@/app/molecule/dateInput";
import Input from "@/app/atom/input";
import Money from "@/app/atom/money";
import Button from "@/app/atom/button";

import useSchedules from "@/app/customHooks/useSchedules";

export default function Schedules() {

  const hook = useSchedules();

  return (
    <div className={ui.container}>
      <h1 className={ui.header}>Horario Estética</h1>

      <DateInput />
      <Input type="time" label="Desde" />
      <Input type="time" label="Hasta" />

      <Button>Agregar</Button>
      </div>
  
  );
}
