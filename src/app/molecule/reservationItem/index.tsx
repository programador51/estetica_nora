import React from "react";
import { ReservationItem as TypeReservationItem } from "./types";
import Button from "@/app/atom/button";

export default function ReservationItem({
  name,
  reservation,
  urlPicture = null,
}: TypeReservationItem) {
  return (
    <div>
      <div>
        <img src="" alt="" />
        <div>
          <p>{name}</p>
          <p>{new Intl.DateTimeFormat('es',{
            dateStyle:"long"
          }).format(reservation)}</p>
          <p>{new Intl.DateTimeFormat('es',{
            
            timeStyle:"medium",
            hour12:true
          }).format(reservation)}</p>
        </div>
      </div>

      <div>
        <Button>Cancelar reservación</Button>
        <Button theme="secondary">Ver detalle</Button>
      </div>
    </div>
  );
}
