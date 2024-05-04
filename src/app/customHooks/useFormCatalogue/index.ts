import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import {
  AddProduct,
  FormCatalogueType,
  ReturnUseForm,
  UpdateProduct,
} from "./types";
import {
  schemaAddProduct,
  schemaEditProduct,
} from "@/app/helpers/validations/catalogue";

export default function useFormCatalogue(
  type: FormCatalogueType
): ReturnUseForm {
  const schemaToUse = type === "add" ? schemaAddProduct : schemaEditProduct;

  const form = useForm<AddProduct | UpdateProduct>({
    resolver: yupResolver(schemaToUse),
    mode: "onChange",
  });

  return {
    form,
  };
}
