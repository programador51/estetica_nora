import React from "react";
import { configureItem as TypeConfigureItem } from "./types";
import Button from "@/app/atom/button";
import ui from "./styles.module.scss";
import useAccessUserRoles from "@/app/customHooks/useAccessUserRoles"; //
import HandledImage from "@/app/atom/image";
import { TypeAccount } from "../typeAccount/types";

type IndexedLabel = {
  [key in TypeAccount]: string;
};

const INDEXED_ROLES: IndexedLabel = {
  administrador: "Administrador",
  superAdministrador: "Super administrador",
  usuario: "Usuario",
};

export default function ConfigureItem({
  name,
  authentication,
  urlPicture = null,
  id,
}: TypeConfigureItem) {
  const hook = useAccessUserRoles(1);
  return (
    <div className={ui.itemCard}>
      <div>
        <HandledImage src={urlPicture} />
        <div>
          <b>
            <p>{name}</p>
          </b>
          <p>{INDEXED_ROLES[authentication]}</p>
        </div>
      </div>

      <div className={ui.promotionActions}>
        {authentication !== "superAdministrador" && (
          <Button theme="primary" onClick={hook.promptCancelation}>
            Promover a super administrador
          </Button>
        )}

        {authentication !== "administrador" && (
          <Button theme="secondary" onClick={hook.promptCancelation}>
            Promover a administrador
          </Button>
        )}

        {authentication !== "usuario" && (
          <Button theme="outline" onClick={hook.promptCancelation}>
            Promover a usuario
          </Button>
        )}

        <Button theme="danger" onClick={hook.promptCancelation}>
          Bloquear cuenta
        </Button>
      </div>
    </div>
  );
}
