"use client";
import { getReservation } from "@/app/helpers/api/v1/reservation";
import React, { useEffect, useRef, useState } from "react";
import { StateReservation } from "./types";
import Spinner from "@/app/molecule/Spinner";
import { parseNameOfUser } from "@/app/helpers/api/v1/accounts";
import { formatNumberPhone } from "@/app/helpers/numbers";
import HandledImage from "@/app/atom/image";
import ui from "./styles.module.scss";
import Money from "@/app/atom/money";
import { parseDateWithTime } from "@/app/helpers/dates";
import ServiceItem from "@/app/molecule/serviceItem";
import { v4 } from "uuid";

export default function ReservationOverview({ id }: { id: number }) {
  const [state, setState] = useState<StateReservation>({
    isLoading: true,
    reservation: undefined,
  });

  const key = useRef(`${v4()}`);
  useEffect(() => {
    (async function () {
      const reservation = await getReservation(id);

      setState((current) => ({
        ...current,
        isLoading: false,
        reservation,
      }));
    })();
  }, []);

  if (state.isLoading) return <Spinner text="Cargando cita" />;

  if (state.reservation === undefined) return <></>;

  return (
    <div className={ui.containerOverview}>
      <h2>Reservación</h2>

      <div className={ui.overviewReservation}>
        <p>
          <b>Fecha inicio: </b>
          <span>
            {parseDateWithTime(
              new Date(state.reservation.reservation.fechaReservacion)
            )}
          </span>
        </p>

        <p>
          <b>Fecha fin: </b>
          <span>
            {parseDateWithTime(new Date(state.reservation.reservation.hasta))}
          </span>
        </p>

        <p>
          <b>Total: </b>
          <Money>{+state.reservation.reservation.total}</Money>
        </p>
      </div>

      <hr />
      <h2>Cliente</h2>

      <div className={ui.accountInfo}>
        <HandledImage
          src={state.reservation.customer.fotoPerfil}
          alt="foto_de_perfil_del_usuario"
        />

        <div className={ui.overviewAccount}>
          <p>
            <b>Nombre: </b>
            <span>
              {parseNameOfUser(
                state.reservation.customer.primerNombre,
                state.reservation.customer.segundoNombre,
                state.reservation.customer.apellidoPaterno,
                state.reservation.customer.apellidoMaterno
              )}
            </span>
          </p>

          <p>
            <b>Teléfono: </b>
            <span>
              {formatNumberPhone(state.reservation.customer.telefono)}
            </span>
          </p>

          <p>
            <b>Correo: </b>
            <span>{state.reservation.customer.correo}</span>
          </p>
        </div>
      </div>

      <hr />
      <h2>Servicios</h2>

      {state.reservation.services.map((service, i) => (
        <ServiceItem
          costPrice={+service.costPrice}
          durationOnMinutes={service.durationOnMinutes}
          id={service.id}
          key={`${key.current}-${i}`}
          name={service.name}
          picture={service.imagen[0]}
          imagen={service.imagen}
          sellPrice={+service.sellPrice}
          susceptibleToChange={service.susceptibleToChange}
          toleranceOnMinutes={service.toleranceOnMinutes}
          renderView={false}
        />
      ))}
    </div>
  );
}
