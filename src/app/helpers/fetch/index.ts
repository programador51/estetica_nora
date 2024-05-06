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

export function toQueryParams(params: string[]):string {
  const items = params.map((item, i) => {
    if (typeof item !== "string") return null;

    if (i === 0) return `?${item}`;

    return `${item}&`;
  });

  let parsedItems = items.filter(item=>item!==null) as string[];

  return parsedItems.reduce((query,item)=>query+=item,"");
}
