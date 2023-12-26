import Question from "./Question"
import { useState } from 'react';

const QuestionsScreen = ({ questions }) => {
  const [userAnswers, setUserAnswers] = useState({});
  const [showAnswers, setShowAnswers] = useState(false);

  const handleAnswersSelection = (question, selectedAnswer) => {
    setUserAnswers(prevAnswers => ({
      ...prevAnswers,
      [question]:selectedAnswer
    }))
  }

  const checkAnswers = () => {
    setShowAnswers(true)
    console.log(userAnswers)
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

  return (
    <div className="h-full py-8">
        {questions.map((question, index) => (
            <Question 
                key={index}
                question={question}
                onAnswerSelection={handleAnswersSelection}
                userAnswers={userAnswers}
                showAnswers={showAnswers}
            />
        ))}
        <button className="bg-[#182f43] text-white py-4 px-14 rounded-lg mx-12" onClick={checkAnswers}>{showAnswers ? 'Try Again':'Check Answers'}</button>
        {showAnswers 
          &&
          <span className="text-3xl text-[#182f43] font-medium">You Scored {calculateScore()} / {questions.length} </span> 
        }
        
    </div>
  )
}

export default QuestionsScreen