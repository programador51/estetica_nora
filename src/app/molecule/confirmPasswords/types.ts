export interface PropsPassword {
  children?: JSX.Element | JSX.Element[];
  /**
   * Only returns a non-empty value when passwords match, otherwise empty string
   * @param password - Password typed
   * @returns Only returns a non-empty value when passwords match, otherwise empty string
   */
  onChange?: (password: string) => void;
}

export interface StatePassword {
  passA: string;
  passB: string;
  show: boolean;
}

export interface ContextPassword extends StatePassword {
  toggleShowPassword: () => void;
  setPassword: (type: "A" | "B", password: string) => void;
}
