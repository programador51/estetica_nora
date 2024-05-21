import Mailjet from "node-mailjet";

const mailjet = new Mailjet({
  apiKey: process.env.MAILJET_API_KEY || "your-api-key",
  apiSecret: process.env.MAILJET_SECRET_KEY || "your-api-secret",
});

const FROM = "jperezo98@hotmail.com";

async function sendCreationAccountEmail(email: string, name: string) {
  mailjet.post("send", { version: "v3.1" }).request({
    Messages: [
      {
        From: {
          Email: FROM,
          Name: "Estética Nora",
        },
        To: [
          {
            Email: email,
            Name: name,
          },
        ],
        TemplateID: 5906720,
        TemplateLanguage: true,
        Subject: "¡Bienvenido a Estética Unisex!",
        Variables: {},
      },
    ],
  });
}

const model = {
  sendCreationAccountEmail,
};

export default model;
