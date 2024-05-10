import * as yup from "yup";
import {
  costo,
  descripcion,
  precio,
  titulo,
} from "@/app/helpers/validations/catalogue";

const duracion = yup
  .number()
  .positive("La duración debe ser un número mayor o igual a 1")
  .required("La duración es requerida")
  .typeError("Ingresa una duración de tiempo valida");

const schemaAddService = yup.object().shape({
  titulo,
  costo,
  precio,
  descripcion,
  duracion,
  tolerancia: duracion,
});

export { schemaAddService };
