import * as yup from "yup";

const nombre = yup
  .string()
  .min(1, "Almenos 1 caracter")
  .max(256, "Máximo 256 catacteres")
  .required("Obligatorio");

const costo = yup
  .number()
  .positive("El costo tiene que ser mayor o igual a 0")
  .required("Obligatorio");

const precio = yup
  .number()
  .positive("El precio tiene que ser mayor o igual a 0")
  .required("Obligatorio")
  .test("Precio", "a", function (value) {
    const costo = this.parent.costo;
    return value >= costo;
  });

const stockDisponible = yup
  .number()
  .positive("El stock tiene que ser mayor o igual a 0")
  .required("Obligatorio");

const descripcion = yup.string().default('')

const id = yup.number().positive("ID inválido").required("Obligatorio");

const schemaAddProduct = yup.object().shape({
  nombre,
  costo,
  precio,
  stockDisponible,
  descripcion,
});

const schemaEditProduct = yup.object().shape({
  nombre,
  costo,
  precio,
  stockDisponible,
  descripcion,
  id,
});

export { schemaAddProduct, schemaEditProduct };

// nombre
// precio
// costo
// stockDisponible
// descripcion
