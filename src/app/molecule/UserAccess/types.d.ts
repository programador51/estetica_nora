import { MultiValue } from "react-select";

export interface UserOption {
  rol: string;
  id: number;
  profilePicture: null | string;
}

export interface UserOptionsSelect extends UserOption {
  value: number;
  label: string;
}

export interface StateUserAccess {
  isLoading: boolean;
  options: UserOptionsSelect[];
  selected: UserOptionsSelect | null | MultiValue<UserOptionsSelect>;
}

export interface PropsUsersSelect {
  onChange?: (user: UserOptionsSelect) => void;
  value?: number | null;
}
