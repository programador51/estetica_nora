"use client"
import TimePicker, { TimePickerProps } from "react-time-picker";
import React from "react";
import ui from "@/app/atom/input/styles.module.scss";
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';

export default function TimeField(props: TimePickerProps) {
  return (
    <div className={ui.timeField}>
      <label htmlFor={props.name}>Hora</label>
      <TimePicker {...props} clockIcon={false}/>
    </div>
  );
}
