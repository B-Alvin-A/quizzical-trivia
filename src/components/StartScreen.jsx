const StartScreen = ({ onStartQuiz }) => {
  return (
    <div className="h-full flex flex-col items-center justify-center gap-8">
        <h1 className="text-7xl font-bold text-[#182f43]">Simple Quiz Project</h1>
        <p className="text-2xl font-semibold text-[#182f43]">Click the button below to get started</p>
        <button className="bg-[#182f43] text-white py-6 px-16 rounded-lg"
                onClick={onStartQuiz}>
          Start Quiz
        </button>
    </div>
  )
}

export default StartScreen