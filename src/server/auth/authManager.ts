import { server$ } from "@builder.io/qwik-city";

import { config } from "~/server/config";
import { emailMessage } from "~/server/utils/emailMessage";
import { otpManager } from "~/server/utils/otpManager";

export const authManager = {
  serverAuth:server$(async function (email: string) {
    const otp = await otpManager.newOTP(email);

    const otpMessage = `A one-time passcode (OTP) completes the authentication process.
      Your one-time passcode is ${otp} .
      Click on ${config.send.otp.redirect}/${otp} to complete verification or
      paste the One-time passcode (OTP): ${otp} at ${config.send.otp.redirect}.
      Use this single use limited OTP code to complete account verification.
      If you did not request this OTP or have any concerns regarding your account security, please contact our support team immediately.`;

    const apiKey = this.platform.env["SEND_API_KEY"];

    const message = {
      requestUrl: config.send.api.url,
      requestToken: apiKey,
      body: emailMessage.format({
        mailFrom: config.send.otp.mailFrom,
        nameFrom: config.send.otp.nameFrom,
        mailTo: email,
        nameTo: "",
        subject: config.send.otp.subject,
        body: `${otpMessage}`,
      }),
    };

    console.log("Sending with", apiKey);
    console.log("using", config.send.api.url);

    // try {
      await emailMessage.send(message);
    // } catch (e) {
    //   return {
    //     error: {
    //       status: "error",
    //       message: "Email failed to send",
    //       error_details: e.message as string,
    //     },
    //     otp: ""
    //   };
    // }

    console.log("Sent OTP", otp);
    const ret = `${otp} : ${apiKey}`;

    return { otp: ret };

  }),
}
