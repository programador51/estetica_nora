import { MultiValue } from "react-select";
import { TypeAccount } from "../typeAccount/types";

export interface UserOption {
  name: string;
  id: number;
  profilePicture: null | string;
  type:TypeAccount;
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
