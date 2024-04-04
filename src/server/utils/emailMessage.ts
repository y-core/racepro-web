export const emailMessage = {
  format: (request: { mailTo: string; nameTo: string; mailFrom: string; nameFrom: string; subject: string; body: string; }) => {
    return JSON.stringify({
      personalizations: [{ to: [{ email: request.mailTo, name: request.nameTo }] }],
      from: { email: request.mailFrom, name: request.nameFrom },
      subject: request.subject,
      content: [{ type: "text/plain", value: request.body }],
    });
  },
  send: async (message: { requestUrl: URL | RequestInfo; requestToken: string; body: string; }) => {
    console.log("sending mail via:", message.requestUrl)
    return fetch(
      new Request(message.requestUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${message.requestToken}` },
        body: message.body,
      }),
    );
  },
};
