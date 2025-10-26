import React, { useMemo, useState } from 'react';
import { CheckCircle2 } from 'lucide-react';

const sampleQuestions = (subject) => ([
  {
    q: `Which option best describes ${subject} topic prioritization?`,
    options: ['Random order', 'From basics to advanced', 'Only advanced topics', 'Skip fundamentals'],
    answer: 1,
  },
  {
    q: 'What is the best way to improve retention?',
    options: ['No practice', 'Spaced repetition', 'Cramming only', 'Ignoring weak areas'],
    answer: 1,
  },
  {
    q: 'How should you respond to low mock-test scores?',
    options: ['Give up', 'Repeat the same plan', 'Identify gaps and revise', 'Hide results'],
    answer: 2,
  },
]);

const WeeklyAssessment = ({ subject, onLog }) => {
  const [started, setStarted] = useState(false);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);

  const questions = useMemo(() => sampleQuestions(subject || 'your chosen'), [subject]);

  const submit = () => {
    let s = 0;
    questions.forEach((q, i) => {
      if (answers[i] === q.answer) s += 1;
    });
    const percent = Math.round((s / questions.length) * 100);
    setScore(percent);
    if (onLog) onLog({ type: 'assessment', score: percent, createdAt: new Date().toISOString() });
  };

  return (
    <section className="w-full py-12 md:py-16 bg-slate-950 text-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-6">
          <h2 className="text-2xl md:text-3xl font-semibold">Weekly assessment</h2>
          <p className="text-slate-300 mt-2">Adaptive questions based on your plan. Get instant feedback and tips.</p>
        </div>

        {!started ? (
          <div className="p-5 rounded-xl bg-white/5 ring-1 ring-white/10 flex items-center justify-between flex-wrap gap-4">
            <div>
              <div className="font-medium">Ready to test your knowledge?</div>
              <div className="text-slate-300 text-sm">Short quiz, instant results, targeted recommendations.</div>
            </div>
            <button onClick={() => setStarted(true)} className="px-5 py-2.5 rounded-lg bg-violet-500 hover:bg-violet-600 transition text-white font-medium shadow-lg shadow-violet-500/20">Start quiz</button>
          </div>
        ) : score === null ? (
          <div className="grid gap-4">
            {questions.map((q, i) => (
              <div key={i} className="p-5 rounded-xl bg-white/5 ring-1 ring-white/10">
                <div className="font-medium">Q{i + 1}. {q.q}</div>
                <div className="mt-3 grid md:grid-cols-2 gap-2">
                  {q.options.map((opt, idx) => (
                    <label key={idx} className={`flex items-center gap-2 p-3 rounded-lg cursor-pointer ring-1 ring-white/10 hover:bg-white/10 ${answers[i] === idx ? 'bg-white/15' : 'bg-transparent'}`}>
                      <input type="radio" name={`q-${i}`} className="accent-violet-500" checked={answers[i] === idx} onChange={() => setAnswers({ ...answers, [i]: idx })} />
                      <span>{opt}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
            <div className="flex justify-end">
              <button onClick={submit} className="px-5 py-2.5 rounded-lg bg-violet-500 hover:bg-violet-600 transition text-white font-medium shadow-lg shadow-violet-500/20">Submit</button>
            </div>
          </div>
        ) : (
          <div className="p-6 rounded-xl bg-white/5 ring-1 ring-white/10">
            <div className="flex items-center gap-2 text-slate-300 mb-2"><CheckCircle2 size={18}/> Result</div>
            <div className="text-3xl font-semibold">{score}%</div>
            <p className="text-slate-300 mt-2">
              {score >= 80 ? 'Great work! Keep your momentum and push into advanced topics.' : score >= 50 ? 'Solid foundation. Revisit weak areas and practice with targeted exercises.' : 'No worries — focus on fundamentals and spaced repetition this week.'}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default WeeklyAssessment;
