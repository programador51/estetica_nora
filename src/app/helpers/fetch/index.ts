export const isOkRes = (res: Response) =>
  res.ok && res.status >= 200 && res.status < 400;

export async function readFormData<T>(req: Request): Promise<T> {
  const formData = await req.formData();

  let indexedData = {};

  formData.forEach((value, key) => {
    indexedData = {
      ...indexedData,
      [key]: value,
    };
  });

  return indexedData as T;
}
