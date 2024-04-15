import Link from "next/link";
import React from "react";

export default function Menu() {
  return (
    <div>
      <Link href={"/"}>Inicio</Link>
      <Link href={"/citas"}>Citas</Link>
      <Link href={"/#catalogo"}>Catálogo</Link>
      <Link href={"/#servicios"}>Servicios</Link>
    </div>
  );
}
