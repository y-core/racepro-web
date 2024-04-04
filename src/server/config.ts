export const config = {
  jwt: {
    alg: <"HS256" | "HS384" | "HS512">"HS256",
    expires: Math.floor(20 * 1 * 1 * 1), // sec * min * hour * day
  },
  send: {
    api: {
      url: "https://api.sendgrid.com/v3/mail/send",
    },
    contact: {
      mailFrom: "contact@strengths.institute",
      mailTo: "contact@strengths.institute",
      nameFrom: "Strengths Institute Contact Form",
      nameTo: "Strengths Institute Contact",
      subject: "Contact message from strengths.institute",
      redirect: "https://strengths.institute/contact-us/",
    },
    otp: {
      mailFrom: "contact@strengths.institute",
      nameFrom: "Strengths Institute Contact",
      subject: "strengths.institute login OTP",
      redirect: "https://strengths.institute/auth/",
    },
  },
};
