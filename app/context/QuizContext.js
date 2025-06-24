import { createContext, useContext, useState } from 'react';

const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(0);

  const resetQuiz = () => {
    setAnswers({});
    setScore(0);
  };

  return (
    <QuizContext.Provider value={{ answers, setAnswers, score, setScore, resetQuiz }}>
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => useContext(QuizContext);


export default QuizContext;
