import { AddService } from "@/app/customHooks/useFormServices/types";

export type FormServiceType = "add" | "update";

export interface PropsFormServices
  extends React.DetailedHTMLProps<
    React.FormHTMLAttributes<HTMLFormElement>,
    HTMLFormElement
  > {
  idService?: number;
  onSubmited?: (data: AddService|undefined) => void;
  typeForm: FormServiceType;
}
