import * as yup from "yup";

const costo = yup
  .number()
  .positive("El costo tiene que ser mayor o igual a 0")
  .required("Obligatorio")
  .typeError("El costo es obligatorio y debe ser un número");

const precio = yup
  .number()
  .positive("El precio tiene que ser mayor o igual a 0")
  .required("Obligatorio")
  .test(
    "Precio",
    "El precio de venta no puede ser menor al costo",
    function (value) {
      const costo = this.parent.costo;
      return value >= costo;
    }
  )
  .typeError("El precio de venta es obligatorio y debe ser un número");

const stockDisponible = yup
  .number()
  .positive("El stock tiene que ser mayor o igual a 0")
  .required("Obligatorio");

const descripcion = yup.string().default("").trim()

const titulo = yup
  .string()
  .min(1, "Almenos 1 caracter")
  .max(256, "Máximo  256 caracteres")
  .trim()
  .required("Obligatorio");

const schemaAddProduct = yup.object().shape({
  costo,
  precio,
  stockDisponible,
  descripcion,
  titulo,
});

const schemaEditProduct = yup.object().shape({
  costo,
  precio,
  stockDisponible,
  descripcion,
  titulo,
});

export { schemaAddProduct, schemaEditProduct };