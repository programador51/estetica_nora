import React from "react";
import Select from "@/app/atom/select";
import { PropsSelect } from "@/app/atom/select/types";

export default function WeekDay(props: PropsSelect) {
  return (
    <Select {...props}>
      <option value="1">Lunes </option>
      <option value="2">Martes </option>
      <option value="3">Miercoles </option>
      <option value="4">Jueves </option>
      <option value="5">Viernes </option>
      <option value="6">Sabado</option>
      <option value="7">Domingo</option>
    </Select>
  );
}
