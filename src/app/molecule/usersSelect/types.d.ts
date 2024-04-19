export interface UserOption {
  name: string;
  id: number;
  profilePicture: null | string;
}

export interface UserOptionsSelect extends UserOption {
  value: number;
  label: string;
}
