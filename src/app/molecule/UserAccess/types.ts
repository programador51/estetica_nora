import { MultiValue } from "react-select";
import { UserOptionsSelect } from "../usersSelect/types";


export interface StateuserAccess {
  isLoading: boolean;
  options: UserOptionsSelect[];
  selected: UserOptionsSelect | null | MultiValue<UserOptionsSelect>;
}

export interface PropsuserAccess {
  onChange?: (user: UserOptionsSelect) => void;
  value?: number | null;
}
