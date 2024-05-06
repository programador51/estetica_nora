import { MultiValue } from "react-select";

export interface UserOption {
  rol: string;
  id: number;
  profilePicture: null | string;
}

export interface UserOptionsSelect extends UserOption {
  value: number;
  label: string;
  rol?: string; // Ahora 'rol' es opcional
}

export interface StateuserAccess {
  isLoading: boolean;
  options: UserOptionsSelect[];
  selected: UserOptionsSelect | null | MultiValue<UserOptionsSelect>;
}

export interface PropsuserAccess {
  onChange?: (user: UserOptionsSelect) => void;
  value?: number | null;
}
