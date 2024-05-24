import { CustomError } from "./types";

export function generateError(
  errorCode: string | number,
  message: string,
  error: any
): CustomError {
  const ERROR = {
    errorCode,
    message,
    error,
  };

  // console.log(ERROR);

  return ERROR;
}

export function parseError(error: any): CustomError {
  return error;
}
