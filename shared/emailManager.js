"use strict";
const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
async function main(emailOptions) {
  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "marko.medic.rezerva@gmail.com",
      pass: "Tastatura117"
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: `App user ${emailOptions.name} 👻 <marko.medic.rezerva@gmail.com>`, // sender address
    to: "marko.medic.rezerva@gmail.com", // list of receivers
    subject: "BGS - Message ✔", // Subject line
    text: `Email from ${emailOptions.email}`, // plain text body
    html: `<b>Message from email: ${emailOptions.email} - ${emailOptions.message}</b>` // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

// main().catch(console.error);

module.exports = {
  main
};
