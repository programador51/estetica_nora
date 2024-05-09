import Button from "@/app/atom/button";
import useFiles from "@/app/customHooks/useFiles";
import { ReturnUseFiles } from "@/app/customHooks/useFiles/types";
import React, {
  Fragment,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { PropsFileButton, PropsFiles } from "./types";
import ui from "./styles.module.scss";
import { v4 } from "uuid";
import { fileToUrl } from "@/app/helpers/files";
import { filesize } from "filesize";

const ContextFiles = createContext<ReturnUseFiles | undefined>(undefined);

export default function Files({
  children,
  onChange = () => {},
  defaultFiles = [],
}: PropsFiles) {
  const files = useFiles(onChange,defaultFiles);

  return (
    <ContextFiles.Provider value={files}>{children}</ContextFiles.Provider>
  );
}

export function FileInput(props: PropsFileButton): JSX.Element | JSX.Element[] {
  const files = useContext(ContextFiles);

  if (files === undefined) return <></>;

  return (
    <Fragment>
      <Button
        {...props}
        theme="secondary"
        onClick={files.openFileBrowser}
        type="button"
      >
        {props.children || "Cargar fotos"}
      </Button>

      <input
        accept="image/*"
        type="file"
        multiple={props.multiple}
        ref={files.fileInput}
        style={{ display: "none" }}
        onChange={(e) => files.appendFiles(e.target.files)}
      />
    </Fragment>
  );
}

export function FilesList() {
  const files = useContext(ContextFiles);

  const key = useRef(`${v4()}`);

  if (files === undefined) return <></>;

  return files.files.map((fileInfo, i) => (
    <FileItem key={`${key.current}-${i}`} file={fileInfo} index={i} />
  ));
}

function FileItem({ file, index }: { file: File; index: number }) {
  const files = useContext(ContextFiles);

  const [srcImg, setSrcImg] = useState<string | null>(null);

  useEffect(() => {
    (async function () {
      const url = await fileToUrl(file);

      setSrcImg(url);
    })();
  }, [file]);

  if (files === undefined) return <></>;

  return (
    <div className={ui.fileItem}>
      <div className={ui.fileOverview}>
        <img src={srcImg === null ? "" : srcImg} alt={`previa_${file.name}`} />
        <div className={ui.detailInfoOverview}>
          <p>{file.name}</p>
          <p>{filesize(file.size, { standard: "jedec" })}</p>
        </div>
      </div>

      <Button onClick={() => files.deleteFile(index)} theme="danger" type="button">
        Borrar
      </Button>
    </div>
  );
}
