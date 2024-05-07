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
import { useEffect } from "react";

export default function useFormCatalogue(
  type: FormCatalogueType,
  id: number | null = null
): ReturnUseForm {
  const schemaToUse = type === "add" ? schemaAddProduct : schemaEditProduct;

  const form = useForm<AddProduct | UpdateProduct>({
    resolver: yupResolver(schemaToUse),
    mode: "all",
  });

  useEffect(() => {
    (async function () {

      console.log(id)

      if (typeof id !== "number") return;

      console.log("LOGICA PARA CONSULTAR API");
    })();
  }, [id]);

  return {
    form,
  };
}
