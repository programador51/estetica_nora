"use client"
import { useState } from "react";
import { ReturnRecoverPassword, StateRecoverPassword } from "./types";

const INITIAL_STATE: StateRecoverPassword = {
  email: "",
  canShowRecoverForm: false,
};

export default function useRecoverPassword(): ReturnRecoverPassword {
  const [state, setState] = useState(INITIAL_STATE);

  return {
    ...state,
  };
}
