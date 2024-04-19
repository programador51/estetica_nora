"use client";
import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Dialog, useDialog } from "rc-dialog-native";
import Button from "@/app/atom/button";
import ui from "./styles.module.scss";
import Input from "@/app/atom/input";
import { PropsDateInput } from "./types";
import { dateToText } from "@/app/helpers/dates";

export default function DateInput({
  onChange = () => {},
  value = new Date(),
}: PropsDateInput) {
  const [state, setState] = useState({
    value,
    operationData: value,
  });
  const dialog = useDialog();

  const confirmDate = () => {
    dialog.close();
    onChange(state.value);
    setState((current) => ({
      ...current,
      value: state.operationData,
    }));
  };

  return (
    <div>
      <Input
        type="text"
        label="Día"
        onClick={() => dialog.showModal()}
        placeholder="Selecciona"
        value={dateToText(state.value)}
      />

      <Dialog
        closeCallback={dialog.close}
        forwardRef={dialog.forwardRef}
        title={<p>Día</p>}
        width={25}
        footer={<Button onClick={confirmDate}>Confirmar fecha</Button>}
      >
        <div className={ui.calendar}>
          <Calendar
            onChange={(data) =>
              setState((current) => ({
                ...current,
                operationData: data as Date,
              }))
            }
            value={state.value}
            minDate={new Date()}
            locale="es-MX"
          />
        </div>
      </Dialog>
    </div>
  );
}
