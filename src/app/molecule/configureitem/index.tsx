import React from "react";
import { configureItem as TypeConfigureItem } from "./types";
import Button from "@/app/atom/button";
import ui from "./styles.module.scss";
import useAccessUserRoles from "@/app/customHooks/useAccessUserRoles";//

export default function ConfigureItem({
  name,
  authentication,
  urlPicture = null,
}: TypeConfigureItem) {
  const hook = useAccessUserRoles(1);
  return (
    <div className={ui.itemCard}>
      <div>
        <img
          src={
            typeof urlPicture === "string"
              ? urlPicture
              : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
          }
          alt={`foto_de_perfil_${name}`}
        />
        <div>
          <b>
            <p>{name}</p>
          </b>
          <p>{authentication}</p> {/* Mostrar el rol del usuario */}
        </div>
      </div>

      <div>
        <Button theme="secondary" onClick={hook.promptCancelation}>
          Configurar
        </Button>
      </div>
    </div>
  );
}
