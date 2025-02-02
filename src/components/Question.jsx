import React, { useState, useEffect } from "react";

const MAX_ATTEMPTS = 3; // Maximum attempts allowed

const Question = ({
  question,
  currentIndex,
  totalQuestions,
  setCurrentIndex,
  resetQuiz,
}) => {
  const [timeLeft, setTimeLeft] = useState(10);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [shuffledAnswers, setShuffledAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [skippedCount, setSkippedCount] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [attempts, setAttempts] = useState(1);

  useEffect(() => {
    setTimeLeft(10);
    setSelectedAnswer(null);

    const answers = [...question.incorrect_answers, question.correct_answer];
    setShuffledAnswers(answers.sort(() => Math.random() - 0.5));

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [currentIndex]);

  useEffect(() => {
    if (timeLeft === 0) {
      handleSkip();
    }
  }, [timeLeft]);

  const handleNext = () => {
    if (selectedAnswer === question.correct_answer) {
      setCorrectAnswers((prev) => prev + 1);
      setTotalScore((prevTotal) => prevTotal + 10);
    }

    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleSkip = () => {
    setSkippedCount((prev) => prev + 1);
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleRestart = () => {
    if (attempts < MAX_ATTEMPTS) {
      setAttempts((prev) => prev + 1);
      setCurrentIndex(0);
      setScore(0);
      setSkippedCount(0);
      setCorrectAnswers(0);
      setTotalScore(0);
      setQuizCompleted(false);
    }
  };

  const handleGoHome = () => {
    window.location.href = "/"; // Redirects to home page
  };

  if (quizCompleted) {
    return (
      <div className="p-6 max-w-2xl mx-auto bg-white shadow-lg rounded-lg text-center border border-blue-600 hover:cursor-pointer">
        <h1 className="text-2xl font-bold text-green-600">
          🎉 Quiz Summary 🎉
        </h1>
        <p className="text-lg font-semibold mt-4">
          Total Questions: {totalQuestions}
        </p>
        <p className="text-blue-500 font-semibold">
          Answered: {totalQuestions - skippedCount}
        </p>
        <p className="text-yellow-500 font-semibold">Skipped: {skippedCount}</p>
        <p className="text-green-600 font-semibold">
          Correct Answers: {correctAnswers}
        </p>
        <p className="text-purple-600 font-bold text-lg">
          Final Score: {totalScore} / {totalQuestions * 10}
        </p>

        {attempts < MAX_ATTEMPTS ? (
          <button
            onClick={handleRestart}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-800 hover:cursor-pointer"
          >
            🔄 Restart Quiz (Attempt {attempts + 1}/{MAX_ATTEMPTS})
          </button>
        ) : (
          <button
            onClick={handleGoHome}
            className="mt-4 px-6 py-2 bg-red-600 text-white rounded hover:bg-red-800"
          >
            🏠 Go to Home Page
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <p className="text-gray-700 font-bold">
        Question {currentIndex + 1} of {totalQuestions}
      </p>
      <h2 className="text-lg font-semibold my-2">{question.question}</h2>
      <p className="text-red-500 font-bold">Time Left: {timeLeft}s</p>
      <div className="mt-4">
        {shuffledAnswers.map((answer, index) => (
          <button
            key={index}
            onClick={() => setSelectedAnswer(answer)}
            className={`block w-full p-2 my-2 border rounded ${
              selectedAnswer === answer
                ? "bg-green-600 text-white"
                : "bg-gray-100"
            }`}
          >
            {answer}
          </button>
        ))}
      </div>
      <div className="flex justify-between mt-4">
        <button
          onClick={handleNext}
          disabled={!selectedAnswer}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-800"
        >
          ✅ Submit Answer
        </button>
        <button
          onClick={handleSkip}
          className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 hover:cursor-pointer"
        >
          ⏭️ Skip
        </button>
      </div>
    </div>
  );
};

export default Question;
