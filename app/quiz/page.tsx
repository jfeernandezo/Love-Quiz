"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { questions } from "@/lib/questions"
import { ArrowLeftIcon, ArrowRightIcon, CheckCircle2Icon, HeartIcon } from "lucide-react"

export default function QuizPage() {
  const router = useRouter()
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<number[]>(Array(questions.length).fill(-1))
  const [showError, setShowError] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [questionKey, setQuestionKey] = useState(0)

  const currentQuestion = questions[currentQuestionIndex]

  const handleOptionSelect = (value: string) => {
    const selectedOptionIndex = Number.parseInt(value)
    const newAnswers = [...answers]
    newAnswers[currentQuestionIndex] = selectedOptionIndex
    setAnswers(newAnswers)
    setShowError(false)
  }

  const handleNext = () => {
    if (answers[currentQuestionIndex] === -1) {
      setShowError(true)
      return
    }

    if (currentQuestionIndex < questions.length - 1) {
      setIsTransitioning(true)
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex + 1)
        setQuestionKey((prev) => prev + 1)
        setIsTransitioning(false)
      }, 300)
    } else {
      calculateScoreAndNavigate()
    }
  }

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setIsTransitioning(true)
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex - 1)
        setQuestionKey((prev) => prev + 1)
        setIsTransitioning(false)
      }, 300)
    }
  }

  const calculateScoreAndNavigate = () => {
    let totalScore = 0
    answers.forEach((answerIndex, qIndex) => {
      if (answerIndex !== -1) {
        totalScore += questions[qIndex].options[answerIndex].points
      }
    })
    router.push(`/result?score=${totalScore}`)
  }

  const progress = ((currentQuestionIndex + 1) / questions.length) * 100

  return (
    <main className="min-h-screen bg-gradient-to-br from-primary-rose-50 to-secondary-cream-100 flex flex-col items-center justify-center p-4 sm:p-8 relative overflow-hidden">
      {/* Floating hearts animation */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <HeartIcon
            key={i}
            className={`absolute w-6 h-6 text-primary-rose-200 opacity-30 animate-bounce`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <Card className="w-full max-w-2xl bg-white/95 backdrop-blur-sm shadow-2xl border-primary-rose-200 animate-fade-in relative z-10">
        <CardHeader className="text-center">
          <CardTitle className="text-primary-rose-700 text-3xl font-bold">Teste de Qualificação</CardTitle>
          <Progress
            value={progress}
            className="w-full mt-4 h-3 bg-primary-rose-200 [&>*]:bg-gradient-to-r [&>*]:from-primary-rose-500 [&>*]:to-primary-rose-600 [&>*]:transition-all [&>*]:duration-500"
          />
          <p className="text-sm text-gray-500 mt-2">
            Pergunta {currentQuestionIndex + 1} de {questions.length}
          </p>
        </CardHeader>

        <CardContent className="space-y-6 min-h-[400px] flex flex-col justify-center">
          <div
            key={questionKey}
            className={`transition-all duration-300 ease-in-out ${
              isTransitioning ? "opacity-0 transform translate-x-8" : "opacity-100 transform translate-x-0"
            }`}
          >
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 text-center mb-6 leading-relaxed">
              {currentQuestion.question}
            </h2>

            <RadioGroup
              onValueChange={handleOptionSelect}
              value={answers[currentQuestionIndex].toString()}
              className="space-y-4"
            >
              {currentQuestion.options.map((option, index) => (
                <div
                  key={index}
                  className={`flex items-center space-x-3 p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 transform hover:scale-[1.02] hover:shadow-md ${
                    answers[currentQuestionIndex] === index
                      ? "border-primary-rose-400 bg-primary-rose-50 shadow-lg"
                      : "border-primary-rose-100 hover:border-primary-rose-300 hover:bg-primary-rose-25"
                  }`}
                  style={{
                    animationDelay: `${index * 100}ms`,
                  }}
                >
                  <RadioGroupItem
                    value={index.toString()}
                    id={`option-${index}`}
                    className="text-primary-rose-600 border-2 border-primary-rose-300"
                  />
                  <Label
                    htmlFor={`option-${index}`}
                    className="text-lg font-medium text-gray-700 flex-1 cursor-pointer leading-relaxed"
                  >
                    {option.text}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {showError && (
            <p className="text-red-500 text-center mt-4 animate-pulse font-medium">
              💕 Por favor, selecione uma opção para continuar.
            </p>
          )}
        </CardContent>

        <CardFooter className="flex justify-between mt-6 px-6 pb-6">
          <Button
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0 || isTransitioning}
            className="bg-secondary-cream-500 hover:bg-secondary-cream-600 text-gray-800 px-6 py-3 rounded-full shadow-md transition-all duration-300 flex items-center gap-2 disabled:opacity-50"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            Anterior
          </Button>

          <Button
            onClick={handleNext}
            disabled={isTransitioning}
            className="bg-gradient-to-r from-primary-rose-500 to-primary-rose-600 hover:from-primary-rose-600 hover:to-primary-rose-700 text-white px-6 py-3 rounded-full shadow-md transition-all duration-300 flex items-center gap-2 transform hover:scale-105"
          >
            {currentQuestionIndex === questions.length - 1 ? (
              <>
                Finalizar <CheckCircle2Icon className="w-5 h-5" />
              </>
            ) : (
              <>
                Próxima <ArrowRightIcon className="w-5 h-5" />
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </main>
  )
}
