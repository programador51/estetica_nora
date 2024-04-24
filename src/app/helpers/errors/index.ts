export function generateError(
  errorCode: string | number,
  message: string,
  error: any
) {
  return {
    errorCode,
    message,
    error,
  };
}
