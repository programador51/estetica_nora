import * as yup from "yup";

const correo = yup
  .string()
  .email("Ingresa un correo válido")
  .max(256, "Máximo 256 caracteres")
  .min(1, "Almenos 1 caracter")
  .required("Campo obligatorio");

const primerNombre = yup
  .string()
  .min(1, "Almenos 1 caracter")
  .max(256, "Máximo 256 caracteres")
  .required("Campo obligatorio");

const segundoNombre = yup
  .string()
  .min(1, "Almenos 1 caracter")
  .max(256, "Máximo 256 caracteres");

const apellidoPaterno = yup
  .string()
  .min(1, "Almenos 1 caracter")
  .max(256, "Máximo 256 caracteres");

const apellidoMaterno = yup
  .string()
  .min(1, "Almenos 1 caracter")
  .max(256, "Máximo 256 caracteres");

const contrasena = yup
  .string()
  .min(1, "Almenos 1 caracter")
  .max(256, "Máximo 256 caracteres")
  .required("Campo obligatorio");

const telefono = yup.string();

export const schemaRegisterUsers = yup.object().shape({
  correo,
  primerNombre,
  segundoNombre,
  apellidoPaterno,
  apellidoMaterno,
  contrasena,
  telefono
});

export const schemaLoginUsers = yup.object().shape({
  correo,
  contrasena,
});
