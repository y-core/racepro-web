// import { sign as jwtSign, verify as jwtVerify } from "hono/jwt";

import { config } from "~/server/config";

export interface Auth {
  newOTP: (email: string) => Promise<string>;
  validateOTP: (email: string, otp: string) => Promise<boolean>;
  // sign: typeof jwtSign;
  // verify: typeof jwtVerify;
}

export const otpManager: Auth = {
  newOTP: async (email) => {
    // const { env } = await getPlatformProxy();
    // const keystore = env.KV_OTP as KVNamespace;

    const array = new Uint32Array(1);
    crypto.getRandomValues(array);
    const otp = parseInt(String(array))
      .toString(36)
      .toUpperCase()
      .padEnd(5, String(Math.floor(Math.random() * 10)))
      .slice(0, 5);

    // await keystore.put(email, otp);
    return otp;
  },
  validateOTP: async (email, otp) => {
    // const { env } = await getPlatformProxy();
    // const keystore = env.KV_OTP as KVNamespace;

    const value = null; //TODO: remove
    // const value = await keystore.get(email);
    // await keystore.delete(email);

    return value === null || value === otp;
  },
  // sign: async (payload, secret, alg = config.jwt.alg) => {
  //   // TODO:
  //   // check payload not empty
  //   // also store a new refresh token with  longer expiry
  //   //
  //   const expiry = Math.floor(Date.now() / 1000 + config.jwt.expires);
  //   const token = await jwtSign({ payload, exp: expiry }, secret, alg);

  //   return token;
  // },

  // verify: async (token, secret, alg = config.jwt.alg) => {
  //   const payload = await jwtVerify(token, secret, alg);
  //   // TODO:
  //   // load and check if a valid restore token exists, and issue new auth token
  //   //
  //   return payload;
  // },
};


// export const fetchOtp = (async (otp: string, email: string) => {
//   const result = `Hello ${otp} ${email}`;
//   console.log("Prints in the server", result);

//   const { env } = await getPlatformProxy();
//   console.log(`MY_VARIABLE = ${env.MY_VARIABLE}`);

//   await env.KV_OTP.put(email, otp);
//   const value = await env.KV_OTP.get(email);

//   console.log(`value = ${value}`);

//   return result;
// });
