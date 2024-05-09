import { PropsButton } from "@/app/atom/button/types";

export interface PropsFiles {
  children?: JSX.Element | JSX.Element[];
  onChange?:(files:File[])=>void;
  defaultFiles?:File[];
}

export interface PropsFileButton extends PropsButton{
  multiple?:boolean;
}