"use client"

import { useSearchParams } from "next/navigation"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { sendContactEmail } from "@/app/actions/send-email"
import {
  FrownIcon,
  SmileIcon,
  CalendarCheckIcon,
  UtensilsCrossedIcon,
  SendIcon,
  CheckCircle2Icon,
  LoaderIcon,
} from "lucide-react"

export default function ResultPage() {
  const searchParams = useSearchParams()
  const score = Number.parseInt(searchParams.get("score") || "0")
  const [showForm, setShowForm] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState("")
  const [formSubmitted, setFormSubmitted] = useState(false)

  const isQualified = score >= 90

  const handleFormSubmit = async (formData: FormData) => {
    setIsSubmitting(true)
    formData.append("score", score.toString())

    const result = await sendContactEmail(formData)

    setIsSubmitting(false)
    setSubmitMessage(result.message)

    if (result.success) {
      setFormSubmitted(true)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-primary-rose-50 to-secondary-cream-100 flex flex-col items-center justify-center p-4 sm:p-8">
      <Card className="w-full max-w-2xl bg-white/95 backdrop-blur-sm shadow-2xl border-primary-rose-200 animate-fade-in">
        <CardHeader className="text-center">
          <CardTitle className="text-primary-rose-700 text-3xl font-bold">Em busca do príncipe encantado</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-center">
          {isQualified ? (
            <>
              <SmileIcon className="w-24 h-24 text-green-500 mx-auto animate-bounce" />
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 animate-fade-in delay-100">
                Parabéns! Você preencheu os requisitos! 🎉
              </h2>
              <p className="text-lg text-gray-700 animate-fade-in delay-200">
                Sua pontuação de compatibilidade foi de <span className="font-bold text-green-600">{score}%</span>. A
                Vanessa está ansiosa para te conhecer!
              </p>

              <div className="bg-gradient-to-r from-primary-rose-100 to-secondary-cream-100 p-6 rounded-xl shadow-inner animate-fade-in delay-300">
                <h3 className="text-xl font-semibold text-primary-rose-700 mb-3 flex items-center justify-center gap-2">
                  <CalendarCheckIcon className="w-6 h-6" /> Próximo Passo: O Encontro!
                </h3>
                <p className="text-lg text-gray-800">A Vanessa tem disponibilidade para um possível encontro:</p>
                <p className="text-xl font-bold text-primary-rose-800 mt-2">🙏 Domingo pela manhã, na missa.</p>
                <p className="text-lg text-gray-800 mt-1 flex items-center justify-center gap-2">
                  Após a missa, irão para um almoço em um restaurante italiano em Curitiba.
                  <UtensilsCrossedIcon className="w-5 h-5" />
                </p>
              </div>

              {!showForm && !formSubmitted && (
                <Button
                  onClick={() => setShowForm(true)}
                  size="lg"
                  className="mt-6 bg-gradient-to-r from-primary-rose-500 to-primary-rose-600 hover:from-primary-rose-600 hover:to-primary-rose-700 text-white text-lg px-8 py-4 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105"
                >
                  💕 Quero me apresentar para a Vanessa!
                </Button>
              )}

              {showForm && !formSubmitted && (
                <div className="mt-8 animate-fade-in">
                  <Card className="bg-white/80 border-primary-rose-200">
                    <CardHeader>
                      <CardTitle className="text-primary-rose-700 text-xl">Seus Dados de Contato</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <form action={handleFormSubmit} className="space-y-4">
                        <div>
                          <Label htmlFor="name" className="text-gray-700 font-medium">
                            Nome Completo
                          </Label>
                          <Input
                            id="name"
                            name="name"
                            type="text"
                            required
                            className="mt-1 border-primary-rose-200 focus:border-primary-rose-400 focus:ring-primary-rose-400"
                            placeholder="Seu nome completo"
                          />
                        </div>
                        <div>
                          <Label htmlFor="phone" className="text-gray-700 font-medium">
                            Telefone/WhatsApp
                          </Label>
                          <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            required
                            className="mt-1 border-primary-rose-200 focus:border-primary-rose-400 focus:ring-primary-rose-400"
                            placeholder="(00) 00000-0000"
                          />
                        </div>
                        <div>
                          <Label htmlFor="instagram" className="text-gray-700 font-medium">
                            Instagram
                          </Label>
                          <Input
                            id="instagram"
                            name="instagram"
                            type="text"
                            required
                            className="mt-1 border-primary-rose-200 focus:border-primary-rose-400 focus:ring-primary-rose-400"
                            placeholder="@seuinstagram"
                          />
                        </div>
                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full bg-gradient-to-r from-primary-rose-500 to-primary-rose-600 hover:from-primary-rose-600 hover:to-primary-rose-700 text-white py-3 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                        >
                          {isSubmitting ? (
                            <>
                              <LoaderIcon className="w-5 h-5 animate-spin" />
                              Enviando...
                            </>
                          ) : (
                            <>
                              <SendIcon className="w-5 h-5" />
                              Enviar Dados
                            </>
                          )}
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                </div>
              )}

              {formSubmitted && (
                <div className="mt-8 animate-fade-in">
                  <Card className="bg-green-50 border-green-200">
                    <CardContent className="pt-6">
                      <CheckCircle2Icon className="w-16 h-16 text-green-500 mx-auto mb-4" />
                      <h3 className="text-xl font-bold text-green-700 mb-2">Dados Enviados com Sucesso! ✨</h3>
                      <p className="text-green-600">{submitMessage}</p>
                    </CardContent>
                  </Card>
                </div>
              )}

              {submitMessage && !formSubmitted && (
                <p
                  className={`mt-4 font-medium ${submitMessage.includes("sucesso") ? "text-green-600" : "text-red-600"}`}
                >
                  {submitMessage}
                </p>
              )}
            </>
          ) : (
            <>
              <FrownIcon className="w-24 h-24 text-red-500 mx-auto animate-pulse" />
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 animate-fade-in delay-100">Que pena! 😔</h2>
              <p className="text-lg text-gray-700 animate-fade-in delay-200">
                Sua pontuação de compatibilidade foi de <span className="font-bold text-red-600">{score}%</span>.
              </p>
              <div className="bg-red-50 p-6 rounded-xl border border-red-200 animate-fade-in delay-300">
                <p className="text-xl font-bold text-red-700">
                  Você não preencheu os requisitos para ter a Vanessa ao seu lado, melhore como pessoa. 💔
                </p>
                <p className="text-red-600 mt-2">
                  Continue trabalhando em seu crescimento pessoal e tente novamente no futuro!
                </p>
              </div>
            </>
          )}

          <Link href="/" passHref>
            <Button
              size="lg"
              className="mt-8 bg-secondary-cream-500 hover:bg-secondary-cream-600 text-gray-800 text-lg px-8 py-4 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              🏠 Voltar ao Início
            </Button>
          </Link>
        </CardContent>
      </Card>
    </main>
  )
}
