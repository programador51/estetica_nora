import { MultiValue } from "react-select";

export interface ServiceOption {
  name: string;
  id: number;
  picture: string | null;
  costPrice: number;
  sellPrice: number;
  durationOnMinutes: number;
  toleranceOnMinutes: number;
  susceptibleToChange: boolean;
}

export interface ServiceOptionsSelect extends ServiceOption {
  value: number;
  label: string;
}

export interface StateUsersSelect {
  isLoading: boolean;
  options: ServiceOptionsSelect[];
  selected: ServiceOptionsSelect | null | MultiValue<ServiceOptionsSelect>;
}

export interface PropsUsersSelect {
  onChange?: (user: ServiceOptionsSelect) => void;
  value?: number | null;
}
