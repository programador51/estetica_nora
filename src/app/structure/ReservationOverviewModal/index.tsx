import React, { Fragment, useEffect, useState } from "react";
import { Dialog, useDialog } from "rc-dialog-native";
import ReservationOverview from "../ReservationOverview";
import { PropsOverviewModal } from "./types";

export default function ReservationOverviewModal({
  id,
  children = <></>,
}: PropsOverviewModal) {
  const [isOpen, setIsOpen] = useState(false);

  const dialog = useDialog();

  useEffect(() => {
    if (isOpen) dialog.showModal();
    else dialog.close();
  }, [isOpen]);

  return (
    <Fragment>
      <div onClick={() => setIsOpen(true)}>{children}</div>

      <Dialog
        title={<p>Información cita</p>}
        forwardRef={dialog.forwardRef}
        closeCallback={() => setIsOpen(false)}
      >
        {isOpen ? <ReservationOverview id={id} /> : <></>}
      </Dialog>
    </Fragment>
  );
}
