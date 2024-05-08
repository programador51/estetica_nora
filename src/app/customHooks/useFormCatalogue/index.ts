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
import { useEffect, useState } from "react";
import { getById } from "@/app/helpers/api/v1/catalogue";
import { ProductI } from "../useCatalogue/types";

export default function useFormCatalogue(
  type: FormCatalogueType,
  id: number | null = null,
  onLoadedProduct: (product: ProductI) => void = () => {}
): ReturnUseForm {
  const schemaToUse = type === "add" ? schemaAddProduct : schemaEditProduct;

  const [state, setState] = useState({
    isLoading: false,
  });

  const form = useForm<AddProduct | UpdateProduct>({
    resolver: yupResolver(schemaToUse),
    mode: "all",
    shouldFocusError:true,
  });

  useEffect(() => {
    (async function () {
      if (typeof id !== "number") return;

      setState((current) => ({
        ...current,
        isLoading: true,
      }));

      const product = await getById(id);

      setState((current) => ({
        ...current,
        isLoading: false,
      }));

      if (product === null) return;

      onLoadedProduct(product);

      form.setValue("costo", +product.costo);
      form.setValue("descripcion", product.descripcion);
      form.setValue("titulo", product.titulo);
      form.setValue("precio", +product.venta);
      form.setValue("stockDisponible", product.stockDisponible);
    })();
  }, [id]);

  return {
    form,
    ...state,
  };
}
