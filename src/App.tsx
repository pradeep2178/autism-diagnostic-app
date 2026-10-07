import { useState, useMemo } from 'react';
import {
  AssessmentType,
  AssessmentResult,
  Question,
  carsQuestions,
  adosQuestions,
  mchatQuestions,
  scoreCars,
  scoreAdos,
  scoreMchat,
} from './data';
import {
  CheckCircle2,
  Info,
  RotateCcw,
  Printer,
  Sparkles,
  ClipboardCheck,
  Check,
  ShieldAlert,
  HelpCircle,
} from 'lucide-react';

export function App() {
  const [selectedAssessment, setSelectedAssessment] = useState<AssessmentType>('CARS');
  const [carsAnswers, setCarsAnswers] = useState<Record<string, number>>({});
  const [adosAnswers, setAdosAnswers] = useState<Record<string, number>>({});
  const [mchatAnswers, setMchatAnswers] = useState<Record<string, boolean>>({});
  const [showExplanation, setShowExplanation] = useState<boolean>(false);

  const currentQuestions = useMemo(() => {
    switch (selectedAssessment) {
      case 'CARS':
        return carsQuestions;
      case 'ADOS2':
        return adosQuestions;
      case 'MCHAT':
        return mchatQuestions;
    }
  }, [selectedAssessment]);

  const answeredCount = useMemo(() => {
    switch (selectedAssessment) {
      case 'CARS':
        return Object.keys(carsAnswers).length;
      case 'ADOS2':
        return Object.keys(adosAnswers).length;
      case 'MCHAT':
        return Object.keys(mchatAnswers).length;
    }
  }, [selectedAssessment, carsAnswers, adosAnswers, mchatAnswers]);

  const totalQuestions = currentQuestions.length;
  const isComplete = answeredCount === totalQuestions && totalQuestions > 0;

  const result: AssessmentResult = useMemo(() => {
    switch (selectedAssessment) {
      case 'CARS':
        return scoreCars(carsAnswers);
      case 'ADOS2':
        return scoreAdos(adosAnswers);
      case 'MCHAT':
        return scoreMchat(mchatAnswers);
    }
  }, [selectedAssessment, carsAnswers, adosAnswers, mchatAnswers]);

  const handleResetCurrent = () => {
    if (selectedAssessment === 'CARS') setCarsAnswers({});
    if (selectedAssessment === 'ADOS2') setAdosAnswers({});
    if (selectedAssessment === 'MCHAT') setMchatAnswers({});
  };

  const assessmentDetails = {
    CARS: {
      fullName: 'Childhood Autism Rating Scale (CARS)',
      targetAge: 'Ages 2+ years',
      desc: '15-item behavioral rating scale measuring observable autistic behaviors compared to typically developing peers of similar age.',
      scaleGuide: 'Ratings: 1 = Within normal limits · 2 = Mildly abnormal · 3 = Moderately abnormal · 4 = Severely abnormal',
    },
    ADOS2: {
      fullName: 'Autism Diagnostic Observation Schedule (ADOS-2)',
      targetAge: 'Toddlers through Adults',
      desc: 'Structured clinical screening based on social communication, reciprocal interaction, play, and repetitive sensory behaviors.',
      scaleGuide: 'Ratings: 0 = No abnormality observed · 1 = Mild or inconsistent behavior · 2 = Definite clinical abnormality',
    },
    MCHAT: {
      fullName: 'Modified Checklist for Autism in Toddlers (M-CHAT)',
      targetAge: 'Ages 16 – 30 months',
      desc: 'Parent-completed screening questionnaire assessing early developmental communication, joint attention, and social milestones.',
      scaleGuide: 'Response: Yes or No based on typical and current observed behavior',
    },
  }[selectedAssessment];

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-[#1f1f1f] flex flex-col justify-between">
      {/* Top App Header */}
      <header className="bg-white border-b border-[#e0e2ec] sticky top-0 z-30 shadow-xs">
        <div className="max-w-4xl mx-auto px-4 py-3 sm:px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#6650a4]/10 text-[#6650a4] flex items-center justify-center font-bold">
              <ClipboardCheck className="w-6 h-6 text-[#6650a4]" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#1c1b1f]">
                Autism Screening Assistant
              </h1>
              <p className="text-xs text-[#49454f]">Clinical support screening & behavioral assessment</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              title="Print or save screening summary"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg text-[#49454f] bg-[#f1f3f4] hover:bg-[#e8eaed] transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Export</span>
            </button>
            <button
              onClick={handleResetCurrent}
              title="Reset current questionnaire responses"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg text-[#79747e] hover:text-[#b3261e] hover:bg-red-50 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-4xl w-full mx-auto px-4 py-6 sm:px-6 flex-1">
        {/* Medical / Educational Disclaimer Chip */}
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3 bg-[#e8def8]/40 border border-[#d0bcff] rounded-2xl px-4 py-3">
          <div className="flex items-center gap-2.5 text-[#49454f] text-sm">
            <Info className="w-5 h-5 text-[#6650a4] shrink-0" />
            <span className="font-medium text-[#21005d]">
              Screening only; not a diagnosis
            </span>
            <span className="text-xs hidden md:inline text-[#49454f]">
              — Intended for educational and clinical-support use.
            </span>
          </div>

          <button
            onClick={() => setShowExplanation(!showExplanation)}
            className="text-xs text-[#6650a4] font-semibold hover:underline flex items-center gap-1 cursor-pointer"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            {showExplanation ? 'Hide Details' : 'Assessment Info'}
          </button>
        </div>

        {/* Detailed Assessment Guide (Collapsible) */}
        {showExplanation && (
          <div className="mb-5 bg-white border border-[#cac4d0] rounded-2xl p-4 sm:p-5 shadow-xs text-sm text-[#49454f] space-y-2 animate-in fade-in">
            <h3 className="font-semibold text-[#1c1b1f] text-base">{assessmentDetails.fullName}</h3>
            <p><span className="font-medium text-[#1c1b1f]">Target Population:</span> {assessmentDetails.targetAge}</p>
            <p><span className="font-medium text-[#1c1b1f]">Overview:</span> {assessmentDetails.desc}</p>
            <p className="bg-[#f5f5f7] p-2.5 rounded-lg text-xs font-mono text-[#333] border border-gray-200">
              {assessmentDetails.scaleGuide}
            </p>
          </div>
        )}

        {/* Assessment Tabs (CARS, ADOS-2, M-CHAT) */}
        <div className="mb-6">
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#79747e] mb-2">
            Select Screening Tool
          </label>
          <div className="flex flex-wrap gap-2.5">
            {[
              { type: 'CARS' as AssessmentType, label: 'CARS', sub: 'Rating Scale' },
              { type: 'ADOS2' as AssessmentType, label: 'ADOS-2', sub: 'Observation' },
              { type: 'MCHAT' as AssessmentType, label: 'M-CHAT', sub: 'Checklist' },
            ].map((tab) => {
              const isSelected = selectedAssessment === tab.type;
              return (
                <button
                  key={tab.type}
                  onClick={() => setSelectedAssessment(tab.type)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all shadow-xs cursor-pointer ${
                    isSelected
                      ? 'bg-[#6650a4] text-white ring-2 ring-[#6650a4] ring-offset-1 shadow-md'
                      : 'bg-white text-[#49454f] border border-[#cac4d0] hover:bg-[#f4eff4]'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-[#e7e0ec] text-[#49454f]'
                    }`}
                  >
                    {tab.sub}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Questionnaire Progress Status Bar */}
        <div className="mb-6 bg-white border border-[#e0e2ec] rounded-xl p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="text-xs font-medium text-[#49454f]">
              Progress:{' '}
              <span className="font-bold text-[#1c1b1f]">
                {answeredCount} of {totalQuestions} items
              </span>
            </div>
            {isComplete && (
              <span className="inline-flex items-center gap-1 text-xs font-medium text-[#2e7d32] bg-[#2e7d32]/10 px-2 py-0.5 rounded-md">
                <Check className="w-3 h-3" /> All Answered
              </span>
            )}
          </div>
          {/* Progress Bar */}
          <div className="w-full sm:w-48 bg-[#e7e0ec] h-2 rounded-full overflow-hidden">
            <div
              className="bg-[#6650a4] h-full transition-all duration-300 rounded-full"
              style={{ width: `${(answeredCount / totalQuestions) * 100}%` }}
            />
          </div>
        </div>

        {/* Questions List */}
        <section className="space-y-3.5">
          {selectedAssessment === 'CARS' && (
            <IntQuestionList
              questions={carsQuestions}
              answers={carsAnswers}
              onAnswer={(id, value) => setCarsAnswers((prev) => ({ ...prev, [id]: value }))}
            />
          )}

          {selectedAssessment === 'ADOS2' && (
            <IntQuestionList
              questions={adosQuestions}
              answers={adosAnswers}
              onAnswer={(id, value) => setAdosAnswers((prev) => ({ ...prev, [id]: value }))}
            />
          )}

          {selectedAssessment === 'MCHAT' && (
            <BooleanQuestionList
              questions={mchatQuestions}
              answers={mchatAnswers}
              onAnswer={(id, value) => setMchatAnswers((prev) => ({ ...prev, [id]: value }))}
            />
          )}
        </section>

        {/* Result Card */}
        <div className="mt-8">
          <ResultCard result={result} answeredCount={answeredCount} totalQuestions={totalQuestions} />
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-12 border-t border-[#e0e2ec] bg-white py-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center text-xs text-[#79747e] space-y-2">
          <p className="font-medium text-[#49454f]">
            Autism Screening Assistant &bull; CARS &bull; ADOS-2 &bull; M-CHAT
          </p>
          <p>
            This application is designed to support diagnostic observations and preliminary screening. It does not replace professional clinical evaluation or comprehensive multidisciplinary diagnostic protocols.
          </p>
        </div>
      </footer>
    </div>
  );
}

interface IntQuestionListProps {
  questions: Question[];
  answers: Record<string, number>;
  onAnswer: (id: string, value: number) => void;
}

function IntQuestionList({ questions, answers, onAnswer }: IntQuestionListProps) {
  return (
    <div className="space-y-3">
      {questions.map((question, index) => {
        const currentAnswer = answers[question.id];
        const isAnswered = currentAnswer !== undefined;

        return (
          <div
            key={question.id}
            className={`rounded-2xl border transition-all p-4 sm:p-5 ${
              isAnswered
                ? 'bg-white border-[#d0bcff]/70 shadow-xs'
                : 'bg-[#f7f2fa]/70 border-[#e7e0ec]'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#e8def8] text-[#21005d] text-xs font-bold">
                    {index + 1}
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#79747e]">
                    Item {question.id}
                  </span>
                </div>
                <h2 className="text-base font-semibold text-[#1c1b1f] leading-snug">
                  {question.text}
                </h2>
                {question.helperText && (
                  <p className="mt-1 text-xs text-[#49454f]">{question.helperText}</p>
                )}
              </div>

              {/* Option Buttons */}
              <div className="flex flex-wrap gap-2 pt-1 sm:pt-0 shrink-0">
                {question.options.map((option) => {
                  const value = parseInt(option, 10);
                  const isSelected = currentAnswer === value;

                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => onAnswer(question.id, value)}
                      className={`min-w-11 h-10 px-3.5 rounded-xl font-medium text-sm transition-all cursor-pointer flex items-center justify-center ${
                        isSelected
                          ? 'bg-[#6650a4] text-white shadow-sm ring-2 ring-[#6650a4] ring-offset-1'
                          : 'bg-white text-[#1c1b1f] border border-[#cac4d0] hover:bg-[#e8def8]/40 hover:border-[#6650a4]'
                      }`}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

interface BooleanQuestionListProps {
  questions: Question[];
  answers: Record<string, boolean>;
  onAnswer: (id: string, value: boolean) => void;
}

function BooleanQuestionList({ questions, answers, onAnswer }: BooleanQuestionListProps) {
  return (
    <div className="space-y-3">
      {questions.map((question, index) => {
        const currentAnswer = answers[question.id];
        const isAnswered = currentAnswer !== undefined;

        return (
          <div
            key={question.id}
            className={`rounded-2xl border transition-all p-4 sm:p-5 ${
              isAnswered
                ? 'bg-white border-[#d0bcff]/70 shadow-xs'
                : 'bg-[#f7f2fa]/70 border-[#e7e0ec]'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#e8def8] text-[#21005d] text-xs font-bold">
                    {index + 1}
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#79747e]">
                    Item {question.id}
                  </span>
                </div>
                <h2 className="text-base font-semibold text-[#1c1b1f] leading-snug">
                  {question.text}
                </h2>
              </div>

              {/* Yes / No Buttons */}
              <div className="flex gap-2.5 pt-1 sm:pt-0 shrink-0">
                {[
                  { label: 'Yes', val: true },
                  { label: 'No', val: false },
                ].map(({ label, val }) => {
                  const isSelected = currentAnswer === val;
                  return (
                    <button
                      key={label}
                      type="button"
                      onClick={() => onAnswer(question.id, val)}
                      className={`min-w-16 h-10 px-4 rounded-xl font-medium text-sm transition-all cursor-pointer flex items-center justify-center ${
                        isSelected
                          ? 'bg-[#6650a4] text-white shadow-sm ring-2 ring-[#6650a4] ring-offset-1'
                          : 'bg-white text-[#1c1b1f] border border-[#cac4d0] hover:bg-[#e8def8]/40 hover:border-[#6650a4]'
                      }`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

interface ResultCardProps {
  result: AssessmentResult;
  answeredCount: number;
  totalQuestions: number;
}

function ResultCard({ result, answeredCount, totalQuestions }: ResultCardProps) {
  const { accentColorHex, bgTintHex, borderHex, icon } = useMemo(() => {
    switch (result.category) {
      case 'Low concern':
      case 'Low risk':
        return {
          accentColorHex: '#2E7D32',
          bgTintHex: 'rgba(46, 125, 50, 0.08)',
          borderHex: '#2E7D32',
          icon: <CheckCircle2 className="w-6 h-6 text-[#2E7D32]" />,
        };
      case 'Moderate concern':
      case 'Moderate risk':
        return {
          accentColorHex: '#FFA000',
          bgTintHex: 'rgba(255, 160, 0, 0.1)',
          borderHex: '#FFA000',
          icon: <Sparkles className="w-6 h-6 text-[#FFA000]" />,
        };
      case 'High concern':
      case 'High risk':
        return {
          accentColorHex: '#D32F2F',
          bgTintHex: 'rgba(211, 47, 47, 0.08)',
          borderHex: '#D32F2F',
          icon: <ShieldAlert className="w-6 h-6 text-[#D32F2F]" />,
        };
      case 'Very high concern':
        return {
          accentColorHex: '#B71C1C',
          bgTintHex: 'rgba(183, 28, 28, 0.12)',
          borderHex: '#B71C1C',
          icon: <ShieldAlert className="w-6 h-6 text-[#B71C1C]" />,
        };
      default:
        return {
          accentColorHex: '#6650a4',
          bgTintHex: 'rgba(102, 80, 164, 0.08)',
          borderHex: '#6650a4',
          icon: <CheckCircle2 className="w-6 h-6 text-[#6650a4]" />,
        };
    }
  }, [result.category]);

  const scoreDisplay = Math.round(result.total);

  return (
    <div
      style={{
        backgroundColor: bgTintHex,
        borderColor: borderHex,
      }}
      className="rounded-3xl border-2 p-6 sm:p-7 shadow-xs transition-all"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-black/10">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-2xl bg-white shadow-xs">{icon}</div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#1c1b1f]">
              {result.title} Result
            </h2>
            <p className="text-xs text-[#49454f]">
              Based on {answeredCount} of {totalQuestions} answered items
            </p>
          </div>
        </div>

        <div className="flex items-baseline gap-4 bg-white/80 backdrop-blur-xs px-4 py-2.5 rounded-2xl border border-black/5 self-start sm:self-auto">
          <div>
            <div className="text-[10px] uppercase font-bold tracking-wider text-[#79747e]">
              Total Score
            </div>
            <div className="text-2xl font-black text-[#1c1b1f]">{scoreDisplay}</div>
          </div>
          <div className="h-8 w-px bg-gray-200" />
          <div>
            <div className="text-[10px] uppercase font-bold tracking-wider text-[#79747e]">
              Category
            </div>
            <div
              style={{ color: accentColorHex }}
              className="text-lg font-bold"
            >
              {result.category}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 space-y-2 text-sm leading-relaxed text-[#1c1b1f]">
        <div className="font-semibold text-[#1c1b1f] text-xs uppercase tracking-wider text-black/60">
          Clinical Screening Summary
        </div>
        <pre className="font-sans whitespace-pre-wrap text-sm leading-relaxed text-[#2c2b30] bg-white/60 p-4 rounded-xl border border-black/5">
          {result.summary}
        </pre>
      </div>
    </div>
  );
}
export default App;
