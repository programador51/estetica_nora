import jwt from "jsonwebtoken";
import { DtoUser } from "../users/types";
import { NextResponse } from "next/server";

/**
 * Generate the tokens for login in users
 * @param user - Information of the user
 * @returns {string[]}
 * @example
 *
 * const userData = {}; // Information of the user
 *
 * const [accessToken, refreshToken] = generateTokens(userData);
 */
export function generateTokens(user: DtoUser) {
  let unrefAccounted = { ...user };

  delete unrefAccounted.contrasena_hash;
  delete unrefAccounted.contrasena_hash_temporal;

  const accessToken = jwt.sign(
    unrefAccounted,
    process.env.JWT_ACCESS_TOKEN || "ND"
  );
  const refreshToken = jwt.sign(
    unrefAccounted,
    process.env.JWT_REFRESH_TOKEN || "ND",
    {
      expiresIn: "1h",
    }
  );

  return [accessToken, refreshToken];
}

export function setCookiesTokens(
  res: NextResponse,
  accessToken: string,
  refreshToken: string
) {
  res.cookies.set({
    name: "nora_access",
    value: accessToken,
    httpOnly: true,
    sameSite: "strict",
  });

  res.cookies.set({
    name: "nora_refresh",
    value: refreshToken,
    httpOnly: true,
    sameSite: "strict",
  });
}

const model = {
  generateTokens,
  setCookiesTokens
};

export default model;
