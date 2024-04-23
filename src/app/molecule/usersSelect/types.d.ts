import { MultiValue } from "react-select";

export interface UserOption {
  name: string;
  id: number;
  profilePicture: null | string;
}

export interface UserOptionsSelect extends UserOption {
  value: number;
  label: string;
}

export interface StateUsersSelect {
  isLoading: boolean;
  options: UserOptionsSelect[];
  selected: UserOptionsSelect | null | MultiValue<UserOptionsSelect>;
}

export interface PropsUsersSelect {
  onChange?: (user: UserOptionsSelect) => void;
  value?: number | null;
}
