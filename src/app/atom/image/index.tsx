"use client";
import React, { useState } from "react";
import { PropsHandledImage } from "./types";

export default function HandledImage(props: PropsHandledImage) {
  const [image, setImage] = useState(props?.src || "/no_image.png");

  return (
    <img {...props} src={image} onError={(e) => setImage("/no_image.png")} />
  );
}
