import { FormCatalogueType } from "@/app/customHooks/useFormCatalogue/types";

export interface PropsFormCatalogue
  extends React.DetailedHTMLProps<
    React.FormHTMLAttributes<HTMLFormElement>,
    HTMLFormElement
  > {
  type: FormCatalogueType;
}
