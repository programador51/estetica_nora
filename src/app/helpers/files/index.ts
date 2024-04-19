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
