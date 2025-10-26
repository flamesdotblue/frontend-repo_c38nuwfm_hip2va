import React from 'react';
import { BarChart3, CheckCircle2, Clock, Bell } from 'lucide-react';

const ProgressBar = ({ value }) => (
  <div className="w-full h-2.5 bg-white/10 rounded-full overflow-hidden">
    <div className="h-full bg-gradient-to-r from-violet-400 via-sky-400 to-amber-300 rounded-full" style={{ width: `${value}%` }} />
  </div>
);

const ProgressOverview = ({ plan, logs }) => {
  const totalDays = plan?.schedule?.length || 0;
  const completedDays = logs?.filter((l) => l.status === 'done').length || 0;
  const progress = totalDays ? Math.round((completedDays / totalDays) * 100) : 0;

  const hoursPlanned = (plan?.schedule || []).reduce((sum, d) => sum + (d.plannedHours || 0), 0);
  const hoursActual = (logs || []).reduce((sum, l) => sum + (l.hours || 0), 0);

  return (
    <section id="overview" className="w-full py-12 md:py-16 bg-slate-950 text-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
          <h2 className="text-2xl md:text-3xl font-semibold">Your progress overview</h2>
          <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/15 transition text-white ring-1 ring-white/10">
            <Bell size={18}/> Enable reminders
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          <div className="p-5 rounded-xl bg-white/5 ring-1 ring-white/10">
            <div className="flex items-center gap-2 text-slate-300 mb-2"><BarChart3 size={18}/> Overall progress</div>
            <div className="text-3xl font-semibold mb-3">{progress}%</div>
            <ProgressBar value={progress} />
          </div>

          <div className="p-5 rounded-xl bg-white/5 ring-1 ring-white/10">
            <div className="flex items-center gap-2 text-slate-300 mb-2"><Clock size={18}/> Hours</div>
            <div className="text-sm text-slate-300">Planned</div>
            <div className="text-xl font-semibold">{hoursPlanned}h</div>
            <div className="text-sm text-slate-300 mt-2">Completed</div>
            <div className="text-xl font-semibold">{hoursActual}h</div>
          </div>

          <div className="p-5 rounded-xl bg-white/5 ring-1 ring-white/10">
            <div className="flex items-center gap-2 text-slate-300 mb-2"><CheckCircle2 size={18}/> Done days</div>
            <div className="text-3xl font-semibold">{completedDays}/{totalDays}</div>
            <p className="text-slate-300 mt-2">Keep it up — consistency compounds.</p>
          </div>
        </div>

        {plan?.schedule?.length ? (
          <div className="mt-8">
            <h3 className="text-lg font-medium mb-3">Upcoming sessions</h3>
            <div className="grid md:grid-cols-3 gap-4">
              {plan.schedule.slice(0, 6).map((d) => (
                <div key={d.day} className="p-4 rounded-lg bg-white/5 ring-1 ring-white/10">
                  <div className="text-sm text-slate-300">Day {d.day}</div>
                  <div className="font-medium mt-1">{d.topics.join(', ')}</div>
                  <div className="text-sm text-slate-400 mt-2">Planned: {d.plannedHours}h</div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-slate-300 mt-8">Generate a plan to see your personalized schedule here.</p>
        )}
      </div>
    </section>
  );
};

export default ProgressOverview;
