import sgMail from "@sendgrid/mail";

type sendValidationMessageProps = {
  email: string;
  resetGUID: string;
};

export const sendResetPasswordEmail = async ({
  email,
  resetGUID,
}: sendValidationMessageProps) => {
  console.log("here");
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  let isSuccess = false;

  const msg = {
    from: "hannibalrabit@gmail.com", // Change to your verified sender
    to: email,
    template_id: "d-5e5df9400d724e3ea3331a2120f73eaf",
    personalizations: [
      {
        to: [
          {
            email: email,
          },
        ],
        dynamic_template_data: {
          resetGUID: resetGUID,
          toEmail: email,
          emailResponse: "hannibalrabit@gmail.com",
        },
      },
    ],
  };
  await sgMail
    .send(msg as any)
    .then(() => {
      console.log("success");
      isSuccess = true;
    })
    .catch((error: any) => {
      console.log(error);
      isSuccess = false;
    });
  return isSuccess;
};
