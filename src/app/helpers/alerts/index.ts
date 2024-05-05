import Swal, { SweetAlertOptions, SweetAlertResult } from "sweetalert2";
import { CustomError } from "../errors/types";

export async function promptConfirmation(options?: SweetAlertOptions) {
  const res: SweetAlertResult<any> = await new Promise((resolve, reject) => {
    Swal.fire({
      icon: "question",
      showDenyButton: false,
      showConfirmButton: true,
      showCancelButton: true,
      cancelButtonText: "No, regresar",
      confirmButtonText: "Si",
      ...options,
    })
      .then((data) => {
        resolve(data);
      })
      .catch((e) => {
        reject(e);
      });
  });

  return res;
}

export function promptError(error: CustomError) {
  Swal.fire({
    icon: "error",
    title: "Error",
    titleText:`${error.errorCode}`,
    text: `${error.message}`,
  });
}
