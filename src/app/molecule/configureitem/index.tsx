import React from "react";
import { configureItem as TypeConfigureItem } from "./types";
import Button from "@/app/atom/button";
import ui from "./styles.module.scss";
import useAccessUserRoles from "@/app/customHooks/useAccessUserRoles"; //
import HandledImage from "@/app/atom/image";
import { TypeAccount } from "../typeAccount/types";
import Spinner from "@/app/molecule/Spinner";

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
  onUpdated = () => {}
}: TypeConfigureItem) {
  const hook = useAccessUserRoles(onUpdated);
  return (
    <div className={ui.itemCard}>
      <div className={ui.overviewUser}>
        <HandledImage src={urlPicture} />
        <div>
          <b>
            <p>{name}</p>
          </b>
          <p>{INDEXED_ROLES[authentication]}</p>
        </div>
      </div>

      {hook.isPerformingUpdate ? (
        <Spinner text="Actualizando usuario" />
      ) : (
        <div className={ui.promotionActions}>
          {authentication !== "superAdministrador" && (
            <Button
              theme="primary"
              onClick={() =>
                hook.promptPromoteConfirmation(id, "superAdministrador")
              }
            >
              Promover a super administrador
            </Button>
          )}

          {authentication !== "administrador" && (
            <Button
              theme="secondary"
              onClick={() =>
                hook.promptPromoteConfirmation(id, "administrador")
              }
            >
              Promover a administrador
            </Button>
          )}

          {authentication !== "usuario" && (
            <Button
              theme="outline"
              onClick={() => hook.promptPromoteConfirmation(id, "usuario")}
            >
              Promover a usuario
            </Button>
          )}

          <Button theme="danger">Bloquear cuenta</Button>
        </div>
      )}
    </div>
  );
}
