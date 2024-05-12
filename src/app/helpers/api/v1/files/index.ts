export function retrieveFilesFromReq(req: ReqWithFiles) {
  let files = { ...req };
  delete files.dto;

  const filesToUpload = Object.entries(files).map(([key, value]) => value);

  const items = filesToUpload.filter((item) => typeof item !== "string");

  return items as File[];
}
