export const isOkRes = (res: Response) =>
  res.ok && res.status >= 200 && res.status < 400;
