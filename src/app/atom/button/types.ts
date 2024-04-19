export interface PropsButton
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  theme?: ThemeButton;
  block?:boolean;
}

export type ThemeButton = "primary" | "secondary" | "outline"|"danger";

export type ThemeButtonCss = {
    [key in ThemeButton]:any;
}