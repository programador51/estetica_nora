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
import { PropsFiles } from "./types";
import ui from "./styles.module.scss";
import { v4 } from "uuid";
import { fileToUrl } from "@/app/helpers/files";
import { filesize } from "filesize";

const ContextFiles = createContext<ReturnUseFiles | undefined>(undefined);

export default function Files({ children }: PropsFiles) {
  const files = useFiles();

  return (
    <ContextFiles.Provider value={files}>{children}</ContextFiles.Provider>
  );
}

export function FileInput() {
  const files = useContext(ContextFiles);

  if (files === undefined) return <></>;

  return (
    <Fragment>
      <Button theme="secondary" onClick={files.openFileBrowser}>
        Cargar fotos
      </Button>

      <input
        type="file"
        multiple
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
  }, []);

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

      <Button onClick={() => files.deleteFile(index)} theme="danger">
        Borrar
      </Button>
    </div>
  );
}
