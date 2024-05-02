export type TypeFormUser = "register" | "login";

export interface PropsFormUsers extends React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement> {
  type: TypeFormUser;
  children?: JSX.Element | JSX.Element[];
}

export interface PropsInputProfilePic{
  id?:number;
  onChange?:(picture:File|null)=>void;
}