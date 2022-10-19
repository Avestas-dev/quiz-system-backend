import sgMail from "@sendgrid/mail";

type sendValidationMessageProps = {
  email: string;
};

export const sendResetPasswordEmail = ({
  email,
}: sendValidationMessageProps) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: "hannibalrabit@gmail.com", // Change to your recipient
    from: "kamilporeba@hotmail.com", // Change to your verified sender
    subject: "Sending with SendGrid is Fun",
    text: "and easy to do anywhere, even with Node.js",
    html: "<strong>and easy to do anywhere, even with Node.js</strong>",
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error: any) => {
      console.error(error);
    });
};
