import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { quizzesData } from "../data/quizzes"
import { Button } from "../components/ui/button"
import { ArrowLeft, Check, X, Trophy, RotateCcw } from "lucide-react"
import { cn } from "../lib/utils"

export default function QuizView() {
    const { quizId } = useParams()
    const navigate = useNavigate()
    const quiz = quizzesData.find(q => q.id === quizId)

    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [selectedAnswers, setSelectedAnswers] = useState({})
    const [showResults, setShowResults] = useState(false)
    const [showExplanation, setShowExplanation] = useState(false)

    if (!quiz) {
        return (
            <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">Quiz Not Found</h2>
                <Button onClick={() => navigate('/resources')} className="mt-4">
                    Back to Resources
                </Button>
            </div>
        )
    }

    const handleAnswerSelect = (questionIndex, answerIndex) => {
        if (showResults) return
        setSelectedAnswers({
            ...selectedAnswers,
            [questionIndex]: answerIndex
        })
        setShowExplanation(false)
    }

    const handleCheckAnswer = () => {
        setShowExplanation(true)
    }

    const handleNext = () => {
        if (currentQuestion < quiz.questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1)
            setShowExplanation(false)
        } else {
            setShowResults(true)
        }
    }

    const handlePrevious = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1)
            setShowExplanation(false)
        }
    }

    const handleRetry = () => {
        setCurrentQuestion(0)
        setSelectedAnswers({})
        setShowResults(false)
        setShowExplanation(false)
    }

    const calculateScore = () => {
        let correct = 0
        quiz.questions.forEach((question, index) => {
            if (selectedAnswers[index] === question.correctAnswer) {
                correct++
            }
        })
        return {
            correct,
            total: quiz.questions.length,
            percentage: Math.round((correct / quiz.questions.length) * 100)
        }
    }

    const question = quiz.questions[currentQuestion]
    const isAnswered = selectedAnswers[currentQuestion] !== undefined
    const isCorrect = selectedAnswers[currentQuestion] === question.correctAnswer

    if (showResults) {
        const score = calculateScore()
        return (
            <div className="flex flex-col h-[calc(100vh-64px)] bg-zinc-50 dark:bg-zinc-900 w-full overflow-y-auto">
                <div className="container mx-auto max-w-3xl px-4 py-8">
                    <Button
                        onClick={() => navigate('/resources')}
                        variant="ghost"
                        className="mb-6 pl-0 hover:pl-2 transition-all gap-2"
                    >
                        <ArrowLeft className="w-4 h-4" /> Back to Resources
                    </Button>

                    <div className="bg-white dark:bg-zinc-800 rounded-2xl p-8 shadow-lg text-center">
                        <Trophy className="w-16 h-16 mx-auto mb-4 text-yellow-500" />
                        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
                            Quiz Complete!
                        </h1>
                        <p className="text-zinc-600 dark:text-zinc-400 mb-6">{quiz.title}</p>

                        <div className="bg-gradient-to-r from-rubik-blue to-rubik-green rounded-xl p-6 mb-6">
                            <div className="text-6xl font-bold text-white mb-2">
                                {score.percentage}%
                            </div>
                            <div className="text-white/90">
                                {score.correct} out of {score.total} correct
                            </div>
                        </div>

                        <div className="space-y-3 mb-6">
                            {quiz.questions.map((q, index) => {
                                const userAnswer = selectedAnswers[index]
                                const correct = userAnswer === q.correctAnswer
                                return (
                                    <div
                                        key={q.id}
                                        className={cn(
                                            "flex items-center justify-between p-3 rounded-lg",
                                            correct ? "bg-green-50 dark:bg-green-900/20" : "bg-red-50 dark:bg-red-900/20"
                                        )}
                                    >
                                        <span className="text-sm text-zinc-700 dark:text-zinc-300">
                                            Question {index + 1}
                                        </span>
                                        {correct ? (
                                            <Check className="w-5 h-5 text-green-600 dark:text-green-400" />
                                        ) : (
                                            <X className="w-5 h-5 text-red-600 dark:text-red-400" />
                                        )}
                                    </div>
                                )
                            })}
                        </div>

                        <div className="flex gap-3">
                            <Button onClick={handleRetry} variant="outline" className="flex-1">
                                <RotateCcw className="w-4 h-4 mr-2" />
                                Retry Quiz
                            </Button>
                            <Button onClick={() => navigate('/resources')} className="flex-1">
                                Back to Resources
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="flex flex-col h-[calc(100vh-64px)] bg-zinc-50 dark:bg-zinc-900 w-full overflow-y-auto">
            <div className="container mx-auto max-w-3xl px-4 py-8">
                <Button
                    onClick={() => navigate('/resources')}
                    variant="ghost"
                    className="mb-6 pl-0 hover:pl-2 transition-all gap-2"
                >
                    <ArrowLeft className="w-4 h-4" /> Back to Resources
                </Button>

                {/* Quiz Header */}
                <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                            {quiz.title}
                        </h1>
                        <span className={cn(
                            "px-3 py-1 rounded-full text-xs font-medium",
                            quiz.difficulty <= 3 ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" :
                                quiz.difficulty <= 6 ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400" :
                                    "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                        )}>
                            {quiz.level}
                        </span>
                    </div>
                    <p className="text-zinc-600 dark:text-zinc-400 text-sm mb-4">{quiz.description}</p>

                    {/* Progress Bar */}
                    <div className="flex items-center gap-2">
                        <div className="flex-1 bg-zinc-200 dark:bg-zinc-700 rounded-full h-2">
                            <div
                                className="bg-gradient-to-r from-rubik-blue to-rubik-green h-2 rounded-full transition-all duration-300"
                                style={{ width: `${((currentQuestion + 1) / quiz.questions.length) * 100}%` }}
                            />
                        </div>
                        <span className="text-sm text-zinc-600 dark:text-zinc-400 font-medium">
                            {currentQuestion + 1}/{quiz.questions.length}
                        </span>
                    </div>
                </div>

                {/* Question Card */}
                <div className="bg-white dark:bg-zinc-800 rounded-2xl p-8 shadow-lg mb-6">
                    <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-6">
                        {question.question}
                    </h2>

                    <div className="space-y-3 mb-6">
                        {question.options.map((option, index) => {
                            const isSelected = selectedAnswers[currentQuestion] === index
                            const isCorrectAnswer = index === question.correctAnswer
                            const showCorrect = showExplanation && isCorrectAnswer
                            const showWrong = showExplanation && isSelected && !isCorrectAnswer

                            return (
                                <button
                                    key={index}
                                    onClick={() => handleAnswerSelect(currentQuestion, index)}
                                    disabled={showExplanation}
                                    className={cn(
                                        "w-full text-left p-4 rounded-lg border-2 transition-all",
                                        "hover:border-rubik-blue hover:bg-blue-50 dark:hover:bg-blue-900/10",
                                        isSelected && !showExplanation && "border-rubik-blue bg-blue-50 dark:bg-blue-900/20",
                                        showCorrect && "border-green-500 bg-green-50 dark:bg-green-900/20",
                                        showWrong && "border-red-500 bg-red-50 dark:bg-red-900/20",
                                        !isSelected && !showCorrect && !showWrong && "border-zinc-200 dark:border-zinc-700"
                                    )}
                                >
                                    <div className="flex items-center justify-between">
                                        <span className="text-zinc-700 dark:text-zinc-300">{option}</span>
                                        {showCorrect && <Check className="w-5 h-5 text-green-600" />}
                                        {showWrong && <X className="w-5 h-5 text-red-600" />}
                                    </div>
                                </button>
                            )
                        })}
                    </div>

                    {/* Explanation */}
                    {showExplanation && (
                        <div className={cn(
                            "p-4 rounded-lg mb-4",
                            isCorrect ? "bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800" :
                                "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800"
                        )}>
                            <div className="flex items-start gap-2 mb-2">
                                {isCorrect ? (
                                    <Check className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5" />
                                ) : (
                                    <X className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5" />
                                )}
                                <div>
                                    <p className={cn(
                                        "font-semibold mb-1",
                                        isCorrect ? "text-green-800 dark:text-green-300" : "text-red-800 dark:text-red-300"
                                    )}>
                                        {isCorrect ? "Correct!" : "Incorrect"}
                                    </p>
                                    <p className="text-sm text-zinc-700 dark:text-zinc-300">
                                        {question.explanation}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                        <Button
                            onClick={handlePrevious}
                            variant="outline"
                            disabled={currentQuestion === 0}
                            className="flex-1"
                        >
                            Previous
                        </Button>

                        {!showExplanation ? (
                            <Button
                                onClick={handleCheckAnswer}
                                disabled={!isAnswered}
                                className="flex-1"
                            >
                                Check Answer
                            </Button>
                        ) : (
                            <Button
                                onClick={handleNext}
                                className="flex-1"
                            >
                                {currentQuestion === quiz.questions.length - 1 ? "Finish Quiz" : "Next Question"}
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
