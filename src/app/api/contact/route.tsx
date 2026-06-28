import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);


  
export async function POST(req: Request) {
  console.log("API KEY:", process.env.RESEND_API_KEY);
  
  const { name, email, message } = await req.json();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "All fields are required." }, { status: 400 });
  }

  try {
    await resend.emails.send({
      from: "Rota Contact <onboarding@resend.dev>",
      to: ["ehiomhentreasureruth@gmail.com"],
      subject: `New message from ${name}`,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong><br/>${message}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.log("RESEND ERROR:", error);
    return NextResponse.json({ error: "Failed to send message." }, { status: 500 });
  }
}