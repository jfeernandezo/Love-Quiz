"use server"

export async function sendContactEmail(formData: FormData) {
  const name = formData.get("name") as string
  const phone = formData.get("phone") as string
  const instagram = formData.get("instagram") as string
  const score = formData.get("score") as string

  // Simular envio de email (em produção, você usaria um serviço como Resend, SendGrid, etc.)
  try {
    // Aqui você integraria com um serviço de email real
    // Por exemplo, usando Resend:
    /*
    await resend.emails.send({
      from: 'noreply@seudominio.com',
      to: 'contato@contrastmkt.com',
      subject: 'Novo Pretendente Qualificado - Vanessa',
      html: `
        <h2>Novo Pretendente Qualificado!</h2>
        <p><strong>Nome:</strong> ${name}</p>
        <p><strong>Telefone:</strong> ${phone}</p>
        <p><strong>Instagram:</strong> ${instagram}</p>
        <p><strong>Pontuação:</strong> ${score}%</p>
        <p>Este pretendente foi aprovado no teste de qualificação da Vanessa!</p>
      `
    })
    */

    // Simulação de delay para mostrar loading
    await new Promise((resolve) => setTimeout(resolve, 2000))

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
