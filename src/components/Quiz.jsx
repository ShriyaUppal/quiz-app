import Spinner from "./Spinner";
import Question from "./Question";
import React, { useState, useEffect } from "react";

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  const fetchData = async () => {
    try {
      const cachedData = localStorage.getItem("quizData");
      if (cachedData) {
        setQuestions(JSON.parse(cachedData));
        setLoading(false);
        return;
      }

      const response = await fetch("https://api.jsonserve.com/Uw5CrX");
      if (!response.ok) {
        throw new Error(`HTTP Error! Status ${response.status}`);
      }
      const data = await response.json();
      localStorage.setItem("quizData", JSON.stringify(data.results));
      setQuestions(data.results);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching quiz data:", error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchData();
    }, 3000); // Delayed request to avoid rate limits

    return () => clearTimeout(timeout);
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      {questions.length > 0 ? (
        <Question
          question={questions[currentIndex]}
          currentIndex={currentIndex}
          totalQuestions={questions.length}
          setCurrentIndex={setCurrentIndex}
        />
      ) : (
        <p className="text-center text-red-500">No Questions Available</p>
      )}
    </div>
  );
};

export default Quiz;
