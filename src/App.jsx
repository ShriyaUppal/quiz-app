import React, { useState } from "react";
import Quiz from "./components/Quiz";
import Welcome from "./components/Welcome";

const App = () => {
  const [quizStarted, setQuizStarted] = useState(false);

  return (
    <div className="w-full min-h-screen bg-blue-100 flex items-center justify-center">
      {!quizStarted ? (
        <Welcome onStart={() => setQuizStarted(true)} />
      ) : (
        <Quiz />
      )}
    </div>
  );
};

export default App;
