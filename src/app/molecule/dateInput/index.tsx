"use client";
import React, { useState } from "react";
import Calendar, { CalendarProps } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Dialog, useDialog } from "rc-dialog-native";
import Button from "@/app/atom/button";
import ui from "./styles.module.scss";
import Input from "@/app/atom/input";
import { PropsDateInput } from "./types";
import { dateToText } from "@/app/helpers/dates";

export default function DateInput(props: CalendarProps) {
  const [state, setState] = useState({
    value: props.value || new Date(),
    operationData: props.value || new Date(),
  });
  const dialog = useDialog();

  const confirmDate = () => {
    dialog.close();
  };

  return (
    <div>
      <Input
        type="text"
        label="Día"
        onClick={() => dialog.showModal()}
        placeholder="Selecciona"
        value={props.value instanceof Date ? dateToText(props.value) : "ND"}
      />

      <Dialog
        closeCallback={dialog.close}
        forwardRef={dialog.forwardRef}
        title={<p>Día</p>}
        width={25}
        footer={<Button onClick={confirmDate}>Cerrar calendario</Button>}
      >
        <div className={ui.calendar}>
          <Calendar
            {...props}
            value={props.value}
            locale="es-MX"
          />
        </div>
      </Dialog>
    </div>
  );
}
