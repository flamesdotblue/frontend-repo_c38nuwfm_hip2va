import React, { useMemo, useState } from 'react';
import HeroSection from './components/HeroSection';
import PlannerForm from './components/PlannerForm';
import ProgressOverview from './components/ProgressOverview';
import WeeklyAssessment from './components/WeeklyAssessment';

function App() {
  const [plan, setPlan] = useState(null);
  const [logs, setLogs] = useState([]);

  const addLog = (entry) => setLogs((prev) => [...prev, entry]);

  // When a plan is generated, initialize a log for day 1 as an example
  const handleGenerate = (p) => {
    setPlan(p);
    setLogs([]);
  };

  const today = useMemo(() => {
    const day = (logs.filter((l) => l.status === 'done').length || 0) + 1;
    return plan?.schedule?.find((d) => d.day === day);
  }, [logs, plan]);

  const markToday = (status) => {
    if (!today) return;
    addLog({ status, hours: status === 'done' ? plan.hours : status === 'partial' ? Math.max(1, Math.round(plan.hours / 2)) : 0, createdAt: new Date().toISOString() });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white font-inter">
      <HeroSection />
      <PlannerForm onGenerate={handleGenerate} />

      <section className="w-full bg-slate-950">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-4">
            <button onClick={() => markToday('done')} className="px-4 py-3 rounded-lg bg-emerald-500/20 text-emerald-300 ring-1 ring-emerald-400/30 hover:bg-emerald-500/30 transition">Mark today done</button>
            <button onClick={() => markToday('partial')} className="px-4 py-3 rounded-lg bg-amber-500/20 text-amber-300 ring-1 ring-amber-400/30 hover:bg-amber-500/30 transition">Mark partial</button>
            <button onClick={() => markToday('skipped')} className="px-4 py-3 rounded-lg bg-rose-500/20 text-rose-300 ring-1 ring-rose-400/30 hover:bg-rose-500/30 transition">Mark skipped</button>
          </div>
          {today && (
            <div className="mt-4 text-slate-300">
              Today: {today.topics.join(', ')} · Planned {today.plannedHours}h
            </div>
          )}
        </div>
      </section>

      <ProgressOverview plan={plan} logs={logs} />
      <WeeklyAssessment subject={plan?.subject} onLog={addLog} />

      <footer className="border-t border-white/10 py-10 text-center text-slate-400 bg-slate-950">
        Built with ❤️ for self-paced learners. Stay curious.
      </footer>
    </div>
  );
}

export default App;
