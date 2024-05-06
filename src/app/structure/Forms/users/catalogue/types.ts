import {
  AddProduct,
  FormCatalogueType,
  UpdateProduct,
} from "@/app/customHooks/useFormCatalogue/types";

export interface DataCallback {
  add: AddProduct;
  udpate: UpdateProduct;
}

export interface PropsFormCatalogue
  extends React.DetailedHTMLProps<
    React.FormHTMLAttributes<HTMLFormElement>,
    HTMLFormElement
  > {
  type: FormCatalogueType;
  onSubmitedData?: (data: DataCallback[FormCatalogueType]|undefined) => void;
}
