import React, { useMemo, useState } from 'react';
import { Calendar, Clock, Target, CheckCircle2 } from 'lucide-react';

const defaultTopics = {
  'Python Programming': ['Basics', 'Data Types', 'Control Flow', 'Functions', 'Modules', 'OOP', 'File I/O', 'NumPy', 'Pandas', 'Testing', 'Best Practices'],
  'Machine Learning': ['Math Refresher', 'Data Prep', 'Regression', 'Classification', 'Model Evaluation', 'Feature Engineering', 'Trees & Ensembles', 'Clustering', 'Dimensionality Reduction', 'Neural Networks', 'Model Deployment'],
  'Web Development': ['HTML & CSS', 'JavaScript', 'DOM', 'React Basics', 'State Management', 'Routing', 'APIs', 'Styling Systems', 'Auth Basics', 'Testing', 'Deployment'],
};

const levels = ['Beginner', 'Intermediate', 'Advanced'];

function chunkArray(arr, size) {
  const chunks = [];
  for (let i = 0; i < arr.length; i += size) chunks.push(arr.slice(i, i + size));
  return chunks;
}

const PlannerForm = ({ onGenerate }) => {
  const subjects = useMemo(() => Object.keys(defaultTopics), []);
  const [subject, setSubject] = useState(subjects[0]);
  const [hours, setHours] = useState(2);
  const [level, setLevel] = useState(levels[0]);
  const [goal, setGoal] = useState('Skill building');

  const handleGenerate = (e) => {
    e.preventDefault();
    // Simple heuristic: topics per day based on hours and level
    const base = hours >= 3 ? 2 : 1;
    const levelAdj = level === 'Beginner' ? 1 : level === 'Intermediate' ? 0.8 : 0.6;
    const topicsPerDay = Math.max(1, Math.round(base * levelAdj));

    const topics = defaultTopics[subject];
    const days = chunkArray(topics, topicsPerDay);

    const schedule = days.map((t, i) => ({
      day: i + 1,
      topics: t,
      plannedHours: hours,
    }));

    onGenerate({ subject, hours, level, goal, schedule });
  };

  return (
    <section id="planner" className="relative w-full py-12 md:py-16 bg-slate-950 text-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-semibold">Create your personalized study plan</h2>
          <p className="text-slate-300 mt-2">Tell us your focus and time. We’ll map the path to mastery with buffers for revisions.</p>
        </div>

        <form onSubmit={handleGenerate} className="grid md:grid-cols-4 gap-4 bg-white/5 p-4 rounded-xl ring-1 ring-white/10">
          <label className="flex flex-col gap-2">
            <span className="text-sm text-slate-300 flex items-center gap-2"><Target size={16}/> Subject</span>
            <select value={subject} onChange={(e) => setSubject(e.target.value)} className="bg-slate-900/60 rounded-lg px-3 py-2 ring-1 ring-white/10 focus:ring-violet-500/40 outline-none">
              {subjects.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-sm text-slate-300 flex items-center gap-2"><Clock size={16}/> Daily hours</span>
            <input type="number" min={1} max={10} value={hours} onChange={(e) => setHours(parseInt(e.target.value || '1'))} className="bg-slate-900/60 rounded-lg px-3 py-2 ring-1 ring-white/10 focus:ring-violet-500/40 outline-none" />
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-sm text-slate-300 flex items-center gap-2"><CheckCircle2 size={16}/> Level</span>
            <select value={level} onChange={(e) => setLevel(e.target.value)} className="bg-slate-900/60 rounded-lg px-3 py-2 ring-1 ring-white/10 focus:ring-violet-500/40 outline-none">
              {levels.map((l) => (
                <option key={l} value={l}>{l}</option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-2 md:col-span-1">
            <span className="text-sm text-slate-300 flex items-center gap-2"><Calendar size={16}/> Goal</span>
            <input type="text" value={goal} onChange={(e) => setGoal(e.target.value)} placeholder="e.g., Certification" className="bg-slate-900/60 rounded-lg px-3 py-2 ring-1 ring-white/10 focus:ring-violet-500/40 outline-none"/>
          </label>

          <div className="md:col-span-4 flex justify-end">
            <button type="submit" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-violet-500 hover:bg-violet-600 transition text-white font-medium shadow-lg shadow-violet-500/20">
              Generate plan
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default PlannerForm;
