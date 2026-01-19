import nodemailer from "nodemailer";



export async function sendEmail(to: string, subject: string, html: string) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "rubenzubicoatic@gmail.com",
      pass: "vbrr pwhs wkjc nbjk"
    }
  });
    const info = await transporter.sendMail({
        from: '"Tienda artesanal" <rubenzubicoatic@gmail.com>',
        to: to,
        subject: subject,
        html: html,
    });
    console.log("Message sent:", info.messageId, to);
    return info;
}