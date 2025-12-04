
import React, { useState, useEffect } from 'react';
import { QuizQuestion, QuizResult } from '../types';
import { generateAdaptiveQuiz } from '../services/geminiService';
import { CyberButton, CyberCard } from './CyberComponents';

interface QuizProps {
  topic: string;
  onComplete: (result: QuizResult) => void;
  onCancel: () => void;
}

export const Quiz: React.FC<QuizProps> = ({ topic, onComplete, onCancel }) => {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const fetchQuiz = async () => {
      setLoading(true);
      // Simulating difficulty 'Intermediate' for MVP
      const generatedQuestions = await generateAdaptiveQuiz(topic, 'Intermediate');
      setQuestions(generatedQuestions);
      setLoading(false);
    };
    fetchQuiz();
  }, [topic]);

  const handleOptionSelect = (option: string) => {
    if (submitted) return;
    setAnswers(prev => ({ ...prev, [currentIndex]: option }));
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach((q, idx) => {
      if (answers[idx] === q.correctAnswer) score++;
    });
    
    const percentage = (score / questions.length) * 100;
    let mastery: 'Beginner' | 'Intermediate' | 'Advanced' = 'Beginner';
    if (percentage > 80) mastery = 'Advanced';
    else if (percentage > 50) mastery = 'Intermediate';

    return { score, total: questions.length, masteryLevel: mastery };
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const handleFinish = () => {
    const result = calculateScore();
    onComplete(result);
  };

  if (loading) {
    return (
      <CyberCard className="flex flex-col items-center justify-center min-h-[400px]">
        <div className="w-16 h-16 border-4 border-cyber-cyan border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-cyber-cyan font-mono animate-pulse">GENERATING ASSESSMENT PROTOCOL...</p>
      </CyberCard>
    );
  }

  if (questions.length === 0) {
    return (
      <CyberCard>
        <p className="text-red-500">Failed to load simulation. Neural link severed.</p>
        <CyberButton onClick={onCancel} className="mt-4">Return</CyberButton>
      </CyberCard>
    );
  }

  const currentQuestion = questions[currentIndex];
  const isLast = currentIndex === questions.length - 1;

  return (
    <CyberCard className="max-w-3xl mx-auto mt-10">
      <div className="flex justify-between items-center mb-6 border-b border-gray-700 pb-4">
        <h3 className="text-xl font-display font-bold text-white">
          ASSESSMENT: <span className="text-cyber-pink">{topic}</span>
        </h3>
        <span className="text-mono text-gray-400">Q{currentIndex + 1} / {questions.length}</span>
      </div>

      <div className="mb-8">
        <p className="text-lg text-gray-200 mb-6 font-medium">{currentQuestion.question}</p>
        <div className="space-y-3">
          {currentQuestion.options.map((option, idx) => {
            const isSelected = answers[currentIndex] === option;
            const isCorrect = submitted && option === currentQuestion.correctAnswer;
            const isWrong = submitted && isSelected && option !== currentQuestion.correctAnswer;
            
            let btnStyle = "w-full text-left p-4 border border-gray-700 hover:border-cyber-cyan/50 hover:bg-white/5 transition-all text-gray-300";
            if (isSelected) btnStyle = "w-full text-left p-4 border border-cyber-cyan bg-cyber-cyan/20 text-white shadow-neon-cyan";
            if (isCorrect) btnStyle = "w-full text-left p-4 border border-green-500 bg-green-500/20 text-white";
            if (isWrong) btnStyle = "w-full text-left p-4 border border-red-500 bg-red-500/20 text-white";

            return (
              <button
                key={idx}
                onClick={() => handleOptionSelect(option)}
                className={btnStyle}
                disabled={submitted}
              >
                <span className="font-mono text-gray-500 mr-4">[{String.fromCharCode(65 + idx)}]</span>
                {option}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex justify-between border-t border-gray-700 pt-6">
        <CyberButton 
          variant="secondary" 
          onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
          disabled={currentIndex === 0}
        >
          Previous
        </CyberButton>

        {!submitted ? (
          isLast ? (
            <CyberButton onClick={handleSubmit} disabled={!answers[currentIndex]}>
              Submit Evaluation
            </CyberButton>
          ) : (
             <CyberButton 
              onClick={() => setCurrentIndex(prev => Math.min(questions.length - 1, prev + 1))}
              disabled={!answers[currentIndex]}
            >
              Next
            </CyberButton>
          )
        ) : (
          <CyberButton onClick={handleFinish}>
            Complete & Sync
          </CyberButton>
        )}
      </div>

      {submitted && (
        <div className="mt-6 p-4 bg-cyber-black border border-gray-700">
          <p className="text-sm text-gray-400 font-mono">
            CORRECT ANSWER: <span className="text-green-400">{currentQuestion.correctAnswer}</span>
          </p>
        </div>
      )}
    </CyberCard>
  );
};
