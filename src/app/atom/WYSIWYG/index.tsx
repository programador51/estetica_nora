const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
});

import dynamic from "next/dynamic";
import React from "react";
import { ReactQuillProps } from "react-quill";

export default function WYSIWYG(props: ReactQuillProps) {
  return <ReactQuill placeholder="Escribe aquí" {...props}  />;
}
