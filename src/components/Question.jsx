import { useEffect, useState } from "react"

const Question = ({ question, onAnswerSelection,userAnswers,showAnswers }) => {
  const [shuffledAnswers, setShuffledAnswers] = useState([])
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(null)
  const [answersLocked, setAnswersLocked] = useState(false)

  useEffect(() => {
    const allAnswers = [...question.incorrect_answers, question.correct_answer]
    setShuffledAnswers(shuffleArray(allAnswers))
  },[question])

  useEffect(() => {
    if(showAnswers){
      if(userAnswers[question.question] === question.correct_answer){
        setIsAnswerCorrect(true)
      } else {
        setIsAnswerCorrect(false)
      }
      setAnswersLocked(true)
    }
  },[question,userAnswers,showAnswers])

  const shuffleArray = (array) => {
    const shuffledArray = array.sort(() => Math.random() - 0.5)
    return shuffledArray
  }

  const handleAnswerClick = (index) => {
    if(!answersLocked){
      setSelectedAnswer(index)
      onAnswerSelection(question.question, shuffledAnswers[index])
    }
  }

  const getButtonClass = (answerIndex) => {
    const userAnswer = shuffledAnswers[answerIndex]
    if(showAnswers && isAnswerCorrect !== null){
      return isAnswerCorrect && answer === question.correct_answer
        ? 'bg-green700'
        : !isAnswerCorrect && selectedAnswer === answerIndex
          ? 'bg-red-700'
          : userAnswer === question.correct_answer
            ? 'bg-green-300' : ''
    } else if(selectedAnswer===answerIndex && !answersLocked) {
      return 'bg-yellow-300'
    }
    return ''
  }

  return (
    <div className="px-10 py-5">
        <h1 className="text-2xl font-medium">{question.question}</h1>
        <p className="mt-4">
            {shuffledAnswers.map((answer, index) => (
              <button key={index}
                      className={`mx-2 bg-white px-4 py-2 text-xl font-medium rounded-xl ${getButtonClass(index)}`}
                      onClick={() => handleAnswerClick(index)}>
                {answer}
              </button>
            ))}
        </p>
    </div>
  )
}

export default Question