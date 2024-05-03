import Swal, { SweetAlertOptions, SweetAlertResult } from "sweetalert2";

export async function promptConfirmation(options?: SweetAlertOptions) {
  const res: SweetAlertResult<any> = await new Promise((resolve, reject) => {
    Swal.fire({
      icon:"question",
      showDenyButton: false,
      showConfirmButton: true,
      showCancelButton: true,
      cancelButtonText:"Usuario",
      confirmButtonText:"Administrador",
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
