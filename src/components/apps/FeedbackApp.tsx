import React, { useState, useEffect } from 'react';
import { PROFILE_DATA } from '../../data/profile';
import {
  Clock,
  Play,
  Pause,
  RotateCcw,
  CheckCircle2,
  Download,
  Award,
  Sparkles,
  ClipboardList
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const FeedbackApp: React.FC = () => {
  // Timer State
  const [seconds, setSeconds] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(true);

  // Task Completion State
  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>({
    'task-1': false,
    'task-2': false,
    'task-3': false
  });

  // SUS Questions Responses (1 to 5, default 3)
  const [responses, setResponses] = useState<Record<number, number>>({
    1: 4,
    2: 2,
    3: 5,
    4: 1,
    5: 4,
    6: 2,
    7: 5,
    8: 1,
    9: 4,
    10: 2
  });

  const [savedStatus, setSavedStatus] = useState<string | null>(null);

  // Stopwatch effect
  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  // Load saved evaluations from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('mac_portfolio_sus_eval');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.responses) setResponses(parsed.responses);
        if (parsed.completedTasks) setCompletedTasks(parsed.completedTasks);
      }
    } catch (e) {
      // ignore
    }
  }, []);

  // Compute standard System Usability Scale (SUS) Score
  const calculateSUS = (): number => {
    let oddSum = 0;
    let evenSum = 0;

    for (let i = 1; i <= 10; i++) {
      const val = responses[i] || 3;
      if (i % 2 === 1) {
        oddSum += val - 1;
      } else {
        evenSum += 5 - val;
      }
    }

    const total = (oddSum + evenSum) * 2.5;
    return Math.round(total * 10) / 10;
  };

  const susScore = calculateSUS();

  const handleToggleTask = (taskId: string) => {
    const updated = {
      ...completedTasks,
      [taskId]: !completedTasks[taskId]
    };
    setCompletedTasks(updated);

    // If all tasks are completed, trigger celebration
    if (Object.values(updated).filter(Boolean).length === 3) {
      confetti({ particleCount: 75, spread: 60, origin: { y: 0.7 } });
    }
  };

  const handleScoreChange = (qId: number, value: number) => {
    setResponses((prev) => ({
      ...prev,
      [qId]: value
    }));
  };

  const handleSave = () => {
    const record = {
      timestamp: new Date().toISOString(),
      durationSeconds: seconds,
      completedTasks,
      responses,
      susScore
    };
    localStorage.setItem('mac_portfolio_sus_eval', JSON.stringify(record));
    setSavedStatus('Evaluation stored in localStorage.');
    setTimeout(() => setSavedStatus(null), 3000);
  };

  // Export CSV functionality
  const handleExportCSV = () => {
    const headers = [
      'Timestamp',
      'EvaluationTimeSeconds',
      'Task1_FindNeuralEye',
      'Task2_DownloadCV',
      'Task3_FindContactEmail',
      'Q1',
      'Q2',
      'Q3',
      'Q4',
      'Q5',
      'Q6',
      'Q7',
      'Q8',
      'Q9',
      'Q10',
      'ComputedSUSScore'
    ];

    const row = [
      new Date().toISOString(),
      seconds,
      completedTasks['task-1'] ? 'Completed' : 'Pending',
      completedTasks['task-2'] ? 'Completed' : 'Pending',
      completedTasks['task-3'] ? 'Completed' : 'Pending',
      ...Array.from({ length: 10 }, (_, i) => responses[i + 1] || 3),
      susScore
    ];

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), row.join(',')].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute(
      'download',
      `SUS_Usability_Evaluation_${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const formatTime = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const sec = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col h-full bg-[#f8f9fc] text-[#1d1d1f] font-sans">
      {/* Top Header */}
      <div className="h-12 bg-white border-b border-[#e5e5ea] px-5 flex items-center justify-between select-none">
        <div className="flex items-center space-x-2">
          <ClipboardList size={16} className="text-[#007aff]" />
          <h1 className="text-xs font-bold text-gray-900">
            HCI Usability Evaluation & SUS Questionnaire
          </h1>
        </div>

        {/* Stopwatch & Action Buttons */}
        <div className="flex items-center space-x-3 text-xs">
          <div className="flex items-center space-x-1.5 bg-gray-100 px-3 py-1 rounded-lg font-mono text-gray-800 border border-gray-200">
            <Clock size={12} className="text-[#007aff]" />
            <span>{formatTime(seconds)}</span>
          </div>

          <button
            type="button"
            onClick={() => setIsTimerRunning(!isTimerRunning)}
            className="p-1.5 hover:bg-gray-100 rounded text-gray-600"
            title={isTimerRunning ? 'Pause Stopwatch' : 'Resume Stopwatch'}
          >
            {isTimerRunning ? <Pause size={13} /> : <Play size={13} />}
          </button>

          <button
            type="button"
            onClick={() => setSeconds(0)}
            className="p-1.5 hover:bg-gray-100 rounded text-gray-600"
            title="Reset Stopwatch"
          >
            <RotateCcw size={13} />
          </button>

          <button
            type="button"
            onClick={handleExportCSV}
            className="flex items-center space-x-1.5 bg-[#007aff] hover:bg-[#0069d9] text-white px-3 py-1.5 rounded-lg font-medium transition-colors shadow-xs"
          >
            <Download size={13} />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Main Body */}
      <main className="flex-1 p-6 overflow-y-auto space-y-6 max-w-3xl mx-auto w-full">
        {/* Usability Tasks Section */}
        <section className="bg-white rounded-2xl p-5 border border-gray-200/80 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <div>
              <h2 className="text-sm font-bold text-gray-900">
                1. Human-Computer Interaction Benchmark Tasks
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">
                Execute these core user journeys across the macOS desktop and check off upon completion:
              </p>
            </div>
            <div className="text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
              {Object.values(completedTasks).filter(Boolean).length} / 3 Completed
            </div>
          </div>

          <div className="space-y-2.5">
            {PROFILE_DATA.evaluation.tasks.map((task) => (
              <label
                key={task.id}
                className={`flex items-start space-x-3 p-3 rounded-xl border cursor-pointer transition-all ${
                  completedTasks[task.id]
                    ? 'bg-emerald-50/60 border-emerald-300 text-gray-900'
                    : 'bg-gray-50/60 border-gray-200 hover:bg-gray-100/60 text-gray-700'
                }`}
              >
                <input
                  type="checkbox"
                  checked={completedTasks[task.id]}
                  onChange={() => handleToggleTask(task.id)}
                  className="mt-0.5 w-4 h-4 rounded text-[#007aff] focus:ring-blue-400"
                />
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-semibold">{task.name}</div>
                  <div className="text-[11px] text-gray-500 mt-0.5">{task.description}</div>
                </div>
              </label>
            ))}
          </div>
        </section>

        {/* System Usability Scale (SUS) Score Card */}
        <section className="bg-gradient-to-br from-[#1d1d1f] to-[#2c2c2e] text-white rounded-2xl p-6 shadow-md flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-1.5 text-xs text-sky-400 font-semibold uppercase tracking-wider mb-1">
              <Sparkles size={13} />
              <span>Standard SUS Evaluation Metric</span>
            </div>
            <div className="text-2xl font-extrabold tracking-tight">
              SUS Usability Score: <span className="text-[#30d158]">{susScore}</span> / 100
            </div>
            <p className="text-xs text-gray-300 mt-1 max-w-md">
              Scores above 68 represent above average usability. Scores above 80 indicate Grade A
              ("Excellent" user experience and HCI ergonomics).
            </p>
          </div>

          <button
            type="button"
            onClick={handleSave}
            className="px-4 py-2 bg-white text-gray-900 hover:bg-gray-100 rounded-xl text-xs font-bold transition-all shadow-sm shrink-0"
          >
            Save to LocalStorage
          </button>
        </section>

        {savedStatus && (
          <div className="text-xs text-center font-medium text-emerald-600 bg-emerald-50 p-2 rounded-lg border border-emerald-200">
            {savedStatus}
          </div>
        )}

        {/* 10 SUS Questions */}
        <section className="bg-white rounded-2xl p-5 border border-gray-200/80 shadow-2xs space-y-4">
          <div className="border-b border-gray-100 pb-3">
            <h2 className="text-sm font-bold text-gray-900">
              2. System Usability Scale (SUS) Questionnaire
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Rate your agreement with each statement from 1 (Strongly Disagree) to 5 (Strongly Agree):
            </p>
          </div>

          <div className="space-y-4">
            {PROFILE_DATA.evaluation.susQuestions.map((q) => (
              <div
                key={q.id}
                className="p-3.5 bg-gray-50/70 rounded-xl border border-gray-200/70 space-y-2.5"
              >
                <div className="text-xs font-medium text-gray-900 leading-snug">
                  <span className="font-bold text-[#007aff] mr-1.5">{q.id}.</span>
                  {q.text}
                </div>

                <div className="flex items-center justify-between max-w-md pt-1">
                  <span className="text-[10px] text-gray-500">1 (Strongly Disagree)</span>
                  <div className="flex items-center space-x-2">
                    {[1, 2, 3, 4, 5].map((val) => (
                      <button
                        key={val}
                        type="button"
                        onClick={() => handleScoreChange(q.id, val)}
                        className={`w-7 h-7 rounded-lg text-xs font-bold transition-all ${
                          responses[q.id] === val
                            ? 'bg-[#007aff] text-white shadow-xs'
                            : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {val}
                      </button>
                    ))}
                  </div>
                  <span className="text-[10px] text-gray-500">5 (Strongly Agree)</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};
