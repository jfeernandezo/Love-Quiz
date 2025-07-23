"use server"

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendContactEmail(formData: FormData) {
  const name = formData.get("name") as string
  const phone = formData.get("phone") as string
  const instagram = formData.get("instagram") as string
  const score = formData.get("score") as string

  try {
    await resend.emails.send({
      from: "Love Quiz <onboarding@resend.dev>",
      to: "contato@contrastmkt.com",
      subject: "Novo Pretendente Qualificado - Vanessa",
      html: `
        <h2>Novo Pretendente Qualificado!</h2>
        <p><strong>Nome:</strong> ${name}</p>
        <p><strong>Telefone:</strong> ${phone}</p>
        <p><strong>Instagram:</strong> ${instagram}</p>
        <p><strong>Pontuação:</strong> ${score}%</p>
        <p>Este pretendente foi aprovado no teste de qualificação da Vanessa!</p>
      `
    })

    console.log("Email enviado:", { name, phone, instagram, score })

    return {
      success: true,
      message: "Dados enviados com sucesso! A Vanessa entrará em contato em breve.",
    }
  } catch (error) {
    console.error("Erro ao enviar email:", error)
    return {
      success: false,
      message: "Erro ao enviar dados. Tente novamente.",
    }
  }
}
