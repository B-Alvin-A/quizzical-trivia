import Question from "./Question"
import { useState } from 'react';

const QuestionsScreen = ({ questions,onTryAgain }) => {
  const [userAnswers, setUserAnswers] = useState({});
  const [showAnswers, setShowAnswers] = useState(false);
  const [fetchingQuestions, setFetchingQuestions] = useState(false);

  const handleAnswersSelection = (question, selectedAnswer) => {
    setUserAnswers(prevAnswers => ({
      ...prevAnswers,
      [question]:selectedAnswer
    }))
  }

  const checkAnswers = () => {
    setShowAnswers(true)
  }

  const calculateScore = () => {
    let correctScore = 0
    Object.keys(userAnswers).forEach((question) => {
      if (userAnswers[question] === questions.find(q => q.question === question).correct_answer){
        correctScore++
      }
    })
    return correctScore
  }

  const fetchNewQuestions = async() => {
    setFetchingQuestions(true)
    try {
      await onTryAgain()
      setFetchingQuestions(false)
      setUserAnswers({})
      setShowAnswers(false)
    } catch(err) {
      console.log("Error fetching new Questions: ",err)
      setFetchingQuestions(false)
    }
  }

  return (
    <div className="h-full py-4">
        {questions.map((question, index) => (
            <Question 
                key={index}
                question={question}
                onAnswerSelection={handleAnswersSelection}
                userAnswers={userAnswers}
                showAnswers={showAnswers}
            />
        ))}
        <div className="mt-4">
          <button className="bg-[#182f43] text-white py-2 px-10 rounded-lg mx-8" 
                  onClick={showAnswers ? fetchNewQuestions:checkAnswers}
                  disabled={fetchingQuestions}>
            {showAnswers ? (fetchingQuestions ? 'Loading...':'Try Again'):'Check Answers'}
          </button>
          {showAnswers 
            &&
            <span className="text-2xl text-[#182f43] font-medium">You Scored {calculateScore()} / {questions.length} </span> 
          }
        </div>
        
    </div>
  )
}

export default QuestionsScreen