import {
  AddProduct,
  FormCatalogueType,
  UpdateProduct,
} from "@/app/customHooks/useFormCatalogue/types";

export interface PropsFormCatalogue
  extends React.DetailedHTMLProps<
    React.FormHTMLAttributes<HTMLFormElement>,
    HTMLFormElement
  > {
  type: FormCatalogueType;
  onValidData?: FormCatalogueType extends "add"
    ? (data: AddProduct) => void
    : (data: UpdateProduct) => void;
}