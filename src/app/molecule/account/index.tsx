"use client";
import Link from "next/link";
import React, { useContext } from "react";
import ui from "./styles.module.scss";
import { ContextNavigation } from "../navigation";
import HandledImage from "@/app/atom/image";
import { formatNumberPhone } from "@/app/helpers/numbers";

export default function Account() {
  const navigation = useContext(ContextNavigation);

  if (navigation.displayGuestProfile)
    return (
      <div className={ui.accountOverview}>
        {navigation.app.profile === undefined ? (
          <div className={ui.guestProfile}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        ) : (
          <div className={ui.profileSigned}>
            <HandledImage src={navigation.app.profile.picture} />
            <div className={ui.profileInfo}>
              <p>{navigation.app.profile.fullName}</p>
              <p>{navigation.app.profile.email}</p>
              <p>{formatNumberPhone(navigation.app.profile.phone)}</p>
            </div>
          </div>
        )}

        {navigation.app.profile === undefined ? (
          <Link className={ui.loginLink} href={"/iniciar-sesion"}>
            Iniciar sesión
          </Link>
        ) : !navigation.app.isClossingSession ? (
          <p
            className={ui.logoutLink}
            onClick={navigation.app.attemptCloseSession}
          >
            Cerrar sesión
          </p>
        ) : (
          <></>
        )}
      </div>
    );
}
