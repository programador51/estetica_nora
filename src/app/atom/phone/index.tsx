import React, { useState } from "react";
import Input from "@/app/atom/input";
import { PropsInput } from "../input/types";

export default function Phone(props: PropsInput) {
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputPhoneNumber = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
    let formattedPhoneNumber = "";

    // Format the phone number
    if (inputPhoneNumber.length <= 2) {
      formattedPhoneNumber = inputPhoneNumber;
    } else if (inputPhoneNumber.length <= 6) {
      formattedPhoneNumber = `${inputPhoneNumber.slice(
        0,
        2
      )}-${inputPhoneNumber.slice(2)}`;
    } else {
      formattedPhoneNumber = `${inputPhoneNumber.slice(
        0,
        2
      )}-${inputPhoneNumber.slice(2, 6)}-${inputPhoneNumber.slice(6)}`;
    }

    setPhoneNumber(formattedPhoneNumber);
  };
  return (
    <Input
      placeholder="Escribe aquí"
      {...props}
      label="Teléfono"
      type="tel"
      value={phoneNumber}
      onChange={(e) => handleChange(e)}
      title="Número telefonico en formato xx-xxxx-xxxx"
      pattern="[0-9]{2}-[0-9]{4}-[0-9]{4}"
    />
  );
}
