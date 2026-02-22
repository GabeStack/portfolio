import type { APIRoute } from "astro";
export const prerender = false;
import { contactSchema } from "@/validators/contact";
import nodemailer from "nodemailer";

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();

    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      message: formData.get("message") as string,
      honey: formData.get("honey") as string,
    };

    console.log("Dados recebidos:", data);

    // Validação com Zod (igual ao Next)
    const parsed = contactSchema.safeParse(data);
    if (!parsed.success) {
      const errorMessage =
        parsed.error.errors[0]?.message || "Erro de validação";
      return new Response(
        JSON.stringify({ message: errorMessage }),
        { status: 400 }
      );
    }

    // Honeypot
    if (parsed.data.honey) {
      return new Response(
        JSON.stringify({ message: "SPAM detectado" }),
        { status: 400 }
      );
    }

    // Transporter Nodemailer (igual ao Next)
    const transporter = nodemailer.createTransport({
      host: import.meta.env.EMAIL_HOST,
      port: Number(import.meta.env.EMAIL_PORT),
      secure: false,
      auth: {
        user: import.meta.env.EMAIL_USER,
        pass: import.meta.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Contato do site" <${import.meta.env.EMAIL_USER}>`,
      to: import.meta.env.EMAIL_USER_PROPRIETY,
      subject: `Novo contato de ${parsed.data.name}`,
      html: `
        <p><strong>Nome:</strong> ${parsed.data.name}</p>
        <p><strong>Email:</strong> ${parsed.data.email}</p>
        <p><strong>Mensagem:</strong><br/>${parsed.data.message}</p>
      `,
    });

    return new Response(
      JSON.stringify({ ok: true }),
      { status: 200 }
    );
  } catch (err: any) {
    console.error("Erro ao enviar email:", err);

    return new Response(
      JSON.stringify({
        message: err?.message || "Erro ao enviar mensagem.",
      }),
      { status: 500 }
    );
  }
};
