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

export function toQueryParams(params: string[]): string {
  const items = params.map((item, i) => {
    if (typeof item !== "string") return null;

    if (i === 0) return `?${item}`;

    return `${item}&`;
  });

  let parsedItems = items.filter((item) => item !== null) as string[];

  return parsedItems.reduce((query, item) => (query += item), "");
}

export async function downloadAndSaveFiles(urls: string[]) {
  const filePromises = urls.map(async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(
          `Failed to download ${url}. Status: ${response.status} ${response.statusText}`
        );
      }
      const blob = await response.blob();
      const fileName = extractFileNameFromUrl(url);

      return new File([blob], fileName, { type: blob.type });
    } catch (error) {
      return null;
    }
  });

  try {
    const files = await Promise.all(filePromises);

    return files.filter((file) => file !== null);
  } catch (error) {
    console.error("Failed to download and save files:", error);
    return [];
  }
}

function extractFileNameFromUrl(url: string) {
  const matches = url.match(/\/([^/]+)$/); // Extracts the part of the URL after the last "/"
  if (matches && matches.length > 1) {
    return matches[1]; // Returns the matched part as the file name
  } else {
    throw new Error(`Failed to extract file name from URL: ${url}`);
  }
}
