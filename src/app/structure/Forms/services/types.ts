export type FormServiceType = "add" | "update";

export interface PropsFormServices
  extends React.DetailedHTMLProps<
    React.FormHTMLAttributes<HTMLFormElement>,
    HTMLFormElement
  > {
  idService?: number;
  onSubmited?: () => void;
  typeForm: FormServiceType;
}
