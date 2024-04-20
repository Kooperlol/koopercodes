import { type NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import axios from "axios";

export async function POST(request: NextRequest) {
  const { gRecaptchaToken, email, firstname, lastname, message } =
    await request.json();

  let res: any;
  const formData = `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${gRecaptchaToken}`;
  try {
    res = await axios.post(
      "https://www.google.com/recaptcha/api/siteverify",
      formData,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
  } catch (e) {
    console.log("recaptcha error:", e);
  }

  if (res && res.data?.success && res.data?.score > 0.5) {
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MY_EMAIL,
        pass: process.env.MY_PASSWORD,
      },
    });

    const mailOptions: Mail.Options = {
      from: process.env.MY_EMAIL,
      to: process.env.MY_EMAIL,
      subject: `Message from ${firstname} ${lastname} (${email})`,
      text: message,
    };

    const sendMailPromise = () =>
      new Promise<string>((resolve, reject) => {
        transport.sendMail(mailOptions, function (err: Error | null) {
          if (!err) {
            resolve("Email sent");
          } else {
            reject(err.message);
          }
        });
      });

    try {
      await sendMailPromise();
      return NextResponse.json({ message: "Email sent" });
    } catch (err) {
      return NextResponse.json({ error: err }, { status: 500 });
    }
  } else {
    console.log("fail: res.data?.score:", res.data?.score);
    return NextResponse.json({ success: false, name, score: res.data?.score });
  }
}
