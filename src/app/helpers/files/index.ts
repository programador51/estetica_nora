export async function fileToUrl(file: File): Promise<string> {
  return await new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = function (event: ProgressEvent<FileReader>) {
      if (event.target === null) return;

      const imageDataUrl = event.target.result;

      if (typeof imageDataUrl === "string") resolve(imageDataUrl);
    };

    reader.readAsDataURL(file);
  });
}

export function findDeleteImages(
  object: { [key: string]: string },
  array: string[]
) {
  const missingRecords = [];
  for (const [key, value] of Object.entries(object)) {
    if (!array.includes(key)) {
      missingRecords.push(value);
    }
  }
  return missingRecords;
}
