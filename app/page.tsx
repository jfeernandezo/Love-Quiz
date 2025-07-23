import type React from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronRightIcon } from "lucide-react"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-primary-rose-50 to-secondary-cream-100 flex flex-col items-center justify-center p-4 sm:p-8 overflow-hidden relative">
      {/* Floating elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.7}s`,
              animationDuration: `${4 + Math.random() * 2}s`,
            }}
          >
            {i % 2 === 0 ? (
              <HeartIcon className="w-4 h-4 text-primary-rose-200 opacity-40" />
            ) : (
              <SparklesIcon className="w-5 h-5 text-secondary-cream-300 opacity-40" />
            )}
          </div>
        ))}
      </div>

      <div className="relative w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center z-10">
        {/* Image Section */}
        <div className="relative w-full h-96 sm:h-[500px] lg:h-[600px] rounded-3xl shadow-2xl overflow-hidden animate-slide-in-left group">
          <Image
            src="/vanessa-hero.jpeg"
            alt="Vanessa Itazinski"
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary-rose-700/50 to-transparent"></div>
          <div className="absolute bottom-8 left-8 text-white text-shadow-lg">
            <h1 className="text-4xl sm:text-5xl font-bold drop-shadow-lg animate-fade-in delay-300">
              Vanessa Itazinski
            </h1>
            <p className="text-lg sm:text-xl mt-2 drop-shadow-md animate-fade-in delay-500">
              ✨ Em busca do Príncipe Encantado
            </p>
          </div>
        </div>

        {/* Info Section */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left animate-slide-in-right">
          <Card className="w-full max-w-md bg-white/90 backdrop-blur-sm shadow-2xl border-primary-rose-200 hover:shadow-3xl transition-all duration-500 transform hover:scale-[1.02]">
            <CardHeader>
              <CardTitle className="text-primary-rose-700 text-3xl font-bold animate-fade-in delay-200">
                💕 Conheça a Vanessa
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-700">
              <div className="animate-fade-in delay-300">
                <p className="text-lg">
                  <span className="font-semibold text-primary-rose-600">Idade:</span> 21 anos
                </p>
                <p className="text-lg">
                  <span className="font-semibold text-primary-rose-600">Cidade:</span> Campina Grande do Sul – PR
                </p>
                <p className="text-lg">
                  <span className="font-semibold text-primary-rose-600">Signo:</span> Peixes ♓
                </p>
                <p className="text-lg">
                  <span className="font-semibold text-primary-rose-600">Altura:</span> 1.64 (sem salto)
                </p>
              </div>

              <div className="animate-fade-in delay-400">
                <p className="text-lg font-semibold text-primary-rose-600 mb-2">💼 Profissional:</p>
                <ul className="list-disc list-inside text-left space-y-1 text-sm">
                  <li>Fundadora da Itazinski Consultoria e Soluções Financeiras</li>
                  <li>Empresária desde os 20 anos</li>
                  <li>Exercendo liderança há 3 anos</li>
                </ul>
              </div>

              <div className="animate-fade-in delay-500">
                <p className="text-lg font-semibold text-primary-rose-600 mb-2">🙏 Religião: Católica praticante</p>
                <ul className="list-disc list-inside text-left space-y-1 text-sm">
                  <li>Vai à missa semanalmente (e quer ir todos os dias)</li>
                  <li>Valoriza espiritualidade, família e princípios</li>
                </ul>
              </div>

              <div className="animate-fade-in delay-600">
                <p className="text-lg font-semibold text-primary-rose-600 mb-2">💖 Personalidade:</p>
                <ul className="list-disc list-inside text-left space-y-1 text-sm">
                  <li>Romântica, carinhosa e sensível</li>
                  <li>Ama bilhetes, surpresas, tempo de qualidade e gestos simples</li>
                  <li>Ama comemorar aniversários 🎂</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Link href="/quiz" passHref className="mt-8 animate-fade-in delay-700">
            <Button
              size="lg"
              className="bg-gradient-to-r from-primary-rose-500 to-primary-rose-600 hover:from-primary-rose-600 hover:to-primary-rose-700 text-white text-xl px-8 py-6 rounded-full shadow-xl transition-all duration-500 ease-in-out transform hover:scale-110 hover:shadow-2xl flex items-center gap-3 group"
            >
              ✨ Qualifique-se para a Vanessa
              <ChevronRightIcon className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
          </Link>
        </div>
      </div>
    </main>
  )
}

function HeartIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  )
}

function SparklesIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9.9 10.8c-.4 1.9.7 3.9 2.5 4.3 1.9.4 3.9-.7 4.3-2.5.4-1.9-.7-3.9-2.5-4.3-1.9-.4-3.9.7-4.3 2.5Z" />
      <path d="M10.8 9.9c1.9-.4 3.9.7 4.3 2.5.4 1.9-.7 3.9-2.5 4.3-1.9.4-3.9-.7-4.3-2.5-.4-1.9.7-3.9 2.5-4.3Z" />
      <path d="M8.5 2C7.7 4 6.3 6.4 5 9c-1.3 2.6-2 4.6-2 5.5A2.5 2.5 0 0 0 5.5 17c.9 0 2.9-.7 5.5-2 2.6-1.3 5-2.7 7-3.5" />
      <path d="M14.5 22c.8-2 2.2-4.4 3.5-7 1.3-2.6 2-4.6 2-5.5A2.5 2.5 0 0 0 18.5 7c-.9 0-2.9.7-5.5 2-2.6 1.3-5 2.7-7 3.5" />
    </svg>
  )
}
