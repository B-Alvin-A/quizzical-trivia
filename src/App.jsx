import { useState, useEffect } from 'react';
import StartScreen from './components/StartScreen';
import QuestionsScreen from './components/QuestionsScreen';
import { nanoid } from 'nanoid';

const App = () => {
  const [questions, setQuestions] = useState([]);
  const [currentScreen, setCurrentScreen] = useState('start');

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch('https://opentdb.com/api.php?amount=5&type=multiple');
        const data = await response.json();
        setQuestions(formatQuizQuestions(data.results));
      } catch (err) {
        console.err('Error fetching questions:', err);
      }
    };

    fetchQuestions();
  }, []);

  const formatQuizQuestions = (qnsArray) => {
    let formattedData = qnsArray.map(item => {
      return {
        id: nanoid(),
        question:item.question,
        correct_answer:item.correct_answer,
        incorrect_answers:item.incorrect_answers
      }
    }) 
    return formattedData
  }

  const handleStartQuiz = () => {
    setCurrentScreen('questions');
  };

  return (
    <div className="h-screen bg-[#d4d5ab]">
      {currentScreen === 'start' && <StartScreen onStartQuiz={handleStartQuiz} />}
      {currentScreen === 'questions' && (
        <QuestionsScreen
          questions={questions}
        />
      )}
    </div>
  );
};

export default App;