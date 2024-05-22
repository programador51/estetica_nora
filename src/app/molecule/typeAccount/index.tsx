import React from "react";
import ui from "./styles.module.scss";
import { v4 } from "uuid";
import { PropsTypeAccount, TypeAccount as IntTypeAccount } from "./types";

export default function TypeAccount({
  onChange = () => {},
  value = "usuario",
}: PropsTypeAccount) {
  const idUser = v4();
  const idAdmin = v4();

  return (
    <div className={ui.typeAccount}>
      <p>Tipo de cuenta</p>

      <div className={ui.radioButtonTypeAccount}>
        <input
          type="radio"
          name={"typeUser"}
          id={idUser}
          value="usuario"
          onChange={(e) => onChange(e.target.value as IntTypeAccount)}
          checked={value === "usuario"}
        />
        <label htmlFor={idUser}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
              clipRule="evenodd"
            />
          </svg>
          Usuario
        </label>

        <input
          type="radio"
          name={"typeUser"}
          id={idAdmin}
          value={"administrador"}
          onChange={(e) => onChange(e.target.value as IntTypeAccount)}
          checked={value === "administrador"}
        />
        <label htmlFor={idAdmin}>
          <svg
            version="1.0"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512.000000 512.000000"
            preserveAspectRatio="xMidYMid meet"
          >
            <g
              transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
              fill="#000000"
              stroke="none"
            >
              <path
                d="M2240 4770 c-217 -47 -390 -140 -540 -290 -135 -135 -229 -301 -281
-497 -33 -122 -37 -346 -9 -483 82 -400 379 -713 778 -821 119 -32 356 -37
483 -11 400 83 720 389 831 795 20 71 23 106 23 262 -1 154 -4 192 -23 262
-109 404 -421 701 -819 782 -131 27 -321 28 -443 1z"
              />
              <path
                d="M1825 2435 c-451 -62 -890 -359 -1115 -752 -136 -238 -213 -525 -214
-803 -1 -139 0 -147 27 -202 78 -158 293 -267 589 -298 243 -25 1180 -39 1368
-20 205 21 317 67 351 146 40 90 -14 167 -140 200 -140 36 -186 75 -217 182
-28 96 -1 184 94 298 27 32 54 69 61 81 29 56 4 120 -99 250 -44 55 -45 58
-44 127 1 98 28 182 73 228 40 40 76 52 196 68 170 22 205 53 205 180 0 82 20
139 61 177 52 47 174 93 248 93 19 0 32 3 29 6 -6 5 -1235 54 -1333 53 -27 -1
-90 -7 -140 -14z"
              />
              <path
                d="M3181 2251 c-90 -31 -95 -41 -102 -189 -6 -148 -19 -181 -79 -212
-34 -18 -57 -20 -153 -19 -61 1 -124 -3 -138 -9 -55 -22 -109 -115 -109 -186
0 -44 24 -79 101 -147 88 -78 114 -128 104 -197 -10 -69 -40 -119 -93 -155
-26 -18 -62 -46 -79 -64 -30 -28 -33 -37 -33 -90 0 -122 71 -210 158 -198 172
25 270 -16 303 -125 11 -35 7 -59 -27 -176 -19 -68 195 -176 298 -151 14 4 45
35 73 72 66 87 116 117 198 118 78 1 118 -19 160 -80 67 -96 75 -103 124 -103
67 0 216 69 230 107 4 9 -1 54 -11 99 -27 131 -4 186 99 238 55 28 59 29 166
22 67 -4 117 -3 128 3 38 21 92 188 78 243 -4 16 -27 36 -68 58 -95 54 -129
107 -129 203 0 77 26 113 145 194 38 27 78 63 88 80 19 32 18 34 -3 100 -25
78 -53 121 -86 133 -16 7 -54 3 -118 -10 -105 -22 -141 -19 -203 16 -63 36
-83 87 -83 208 0 149 -27 187 -155 221 -103 26 -106 25 -163 -64 -58 -91 -87
-111 -172 -118 -97 -9 -151 18 -221 113 -63 86 -119 102 -228 65z m609 -499
c108 -43 199 -136 245 -252 23 -58 31 -208 16 -282 -38 -183 -183 -325 -373
-364 -188 -39 -389 59 -482 235 -151 288 -33 591 264 677 72 21 262 13 330
-14z"
              />
            </g>
          </svg>
          Administrador
        </label>
      </div>
    </div>
  );
}
