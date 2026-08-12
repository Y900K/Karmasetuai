"use client";

import React, { useState } from "react";
import { Play, CheckCircle2, FileText, Award, HelpCircle, ChevronRight, Lock } from "lucide-react";
import { Lesson, QuizQuestion } from "@/lib/courses/types";
import MandatoryQuizPlayer from "./MandatoryQuizPlayer";
import CertificateModal from "./CertificateModal";

interface LessonViewerProps {
  lesson: Lesson;
  courseTitle: string;
  onLessonComplete: (lessonId: string, percentage: number) => void;
}

export default function LessonViewer({ lesson, courseTitle, onLessonComplete }: LessonViewerProps) {
  const storageKey = `karmasetu_lesson_${lesson.id}`;

  const [videoWatched, setVideoWatched] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(`${storageKey}_video`);
      return saved === "true";
    }
    return false;
  });

  const [readingDone, setReadingDone] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(`${storageKey}_reading`);
      return saved === "true";
    }
    return false;
  });

  const [showQuiz, setShowQuiz] = useState(false);

  const [quizScore, setQuizScore] = useState<number | null>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(`${storageKey}_score`);
      return saved ? Number(saved) : null;
    }
    return null;
  });

  const [passed, setPassed] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(`${storageKey}_passed`);
      return saved === "true";
    }
    return false;
  });

  const [certModalOpen, setCertModalOpen] = useState(false);

  // Generate 10-Question Fallback Quiz if not present
  const defaultQuestions: QuizQuestion[] = [
    { id: "q1", type: "MCQ", question: "What is the primary G-Code command for rapid linear positioning?", options: ["A. G01", "B. G02", "C. G00", "D. G03"], correctAnswer: "C. G00", points: 10 },
    { id: "q2", type: "MCQ", question: "Which spindle speed command sets RPM directly?", options: ["A. G96 S200", "B. M03 S1200", "C. M08", "D. G28"], correctAnswer: "B. M03 S1200", points: 10 },
    { id: "q3", type: "MCQ", question: "What tolerance measurement standard is specified in ISO 9001 precision machining?", options: ["A. ±1.0mm", "B. ±5.0mm", "C. ±0.5mm", "D. ±0.01mm"], correctAnswer: "D. ±0.01mm", points: 10 },
    { id: "q4", type: "MCQ", question: "Which 5S step focuses on systematic workplace organization?", options: ["A. Seiri (Sort)", "B. Seiton (Set in Order)", "C. Seiso (Shine)", "D. Shitsuke (Sustain)"], correctAnswer: "B. Seiton (Set in Order)", points: 10 },
    { id: "q5", type: "MCQ", question: "In Fanuc lathe controllers, what does M30 signify?", options: ["A. Coolant ON", "B. Tool Change", "C. End of program & reset", "D. Spindle Stop"], correctAnswer: "C. End of program & reset", points: 10 },
    { id: "q6", type: "MCQ", question: "What tool offset geometry axis measures workpiece diameter on CNC lathe?", options: ["A. Z-axis", "B. Y-axis", "C. C-axis", "D. X-axis"], correctAnswer: "D. X-axis", points: 10 },
    { id: "q7", type: "MCQ", question: "Which PPE item is mandatory during metal cutting operations?", options: ["A. Ring", "B. Safety Glasses / Goggles", "C. Loose Scarf", "D. Headphones"], correctAnswer: "B. Safety Glasses / Goggles", points: 10 },
    { id: "q8", type: "WRITTEN", question: "Describe the emergency stop (E-STOP) protocol on a live CNC lathe during chatter.", writtenRubric: "Press E-STOP, isolate power, inspect tool insert and workpiece clamping.", points: 10 },
    { id: "q9", type: "WRITTEN", question: "Explain how to verify zero point offset (G54) using a touch probe or micrometer.", writtenRubric: "Touch face, input Z0 in geometry offset, verify with test pass.", points: 10 },
    { id: "q10", type: "WRITTEN", question: "Outline 3 daily preventive maintenance checks for hydraulic chuck pressure.", writtenRubric: "Check gauge PSI, inspect oil level, clean jaw serrations.", points: 10 },
  ];


  const questionsToUse = lesson.quizQuestions && lesson.quizQuestions.length >= 10 ? lesson.quizQuestions : defaultQuestions;

  const handleVideoCompleted = () => {
    setVideoWatched(true);
    if (typeof window !== "undefined") {
      localStorage.setItem(`${storageKey}_video`, "true");
    }
  };

  const handleReadingCompleted = () => {
    setReadingDone(true);
    if (typeof window !== "undefined") {
      localStorage.setItem(`${storageKey}_reading`, "true");
    }
  };

  const handleQuizFinish = (score: number, isPassed: boolean) => {
    setQuizScore(score);
    setPassed(isPassed);
    if (typeof window !== "undefined") {
      localStorage.setItem(`${storageKey}_score`, score.toString());
      localStorage.setItem(`${storageKey}_passed`, isPassed ? "true" : "false");
    }

    if (isPassed) {
      onLessonComplete(lesson.id, score);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Step Progress Stepper Bar */}
      <div className="glass-card p-4 rounded-2xl border border-white/10 flex flex-wrap items-center justify-between gap-2 bg-slate-900/90 text-xs">
        
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl ${videoWatched ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30" : "bg-white/5 text-slate-400"}`}>
          <Play className="w-3.5 h-3.5" />
          <span className="font-bold">Step 1: Video Watch</span>
          {videoWatched && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
        </div>

        <ChevronRight className="w-4 h-4 text-slate-600 hidden sm:inline" />

        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl ${readingDone ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30" : videoWatched ? "bg-cyan-500/10 text-cyan-300 border border-cyan-500/30" : "bg-white/5 text-slate-400"}`}>
          <FileText className="w-3.5 h-3.5" />
          <span className="font-bold">Step 2: Reading Material</span>
          {readingDone && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
        </div>

        <ChevronRight className="w-4 h-4 text-slate-600 hidden sm:inline" />

        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl ${passed ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30" : showQuiz ? "bg-amber-500/20 text-amber-300 border border-amber-500/30" : "bg-white/5 text-slate-400"}`}>
          <HelpCircle className="w-3.5 h-3.5" />
          <span className="font-bold">Step 3: 10-Q AI Exam</span>
          {passed && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
        </div>

        <ChevronRight className="w-4 h-4 text-slate-600 hidden sm:inline" />

        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl ${passed ? "bg-amber-500/20 text-amber-300 border border-amber-500/40" : "bg-white/5 text-slate-500"}`}>
          <Award className="w-3.5 h-3.5" />
          <span className="font-bold">Step 4: Certificate</span>
          {passed && (
            <button
              onClick={() => setCertModalOpen(true)}
              className="ml-1 text-[10px] bg-amber-400 text-black px-2 py-0.5 rounded font-black uppercase"
            >
              View
            </button>
          )}
        </div>

      </div>

      {/* STEP 1: VIDEO PLAYER */}
      <div className="glass-card p-5 rounded-3xl border border-white/10 space-y-3 bg-slate-900/90">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Play className="w-4 h-4 text-cyan-400" />
            <span>Lesson 1: Practical Video Tutorial ({lesson.title})</span>
          </h3>

          <button
            onClick={handleVideoCompleted}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              videoWatched ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40" : "bg-cyan-500 text-black font-extrabold"
            }`}
          >
            {videoWatched ? "Video Completed ✓" : "Mark Video Completed"}
          </button>
        </div>

        {/* Embedded Video iFrame */}
        <div className="aspect-video w-full rounded-2xl bg-black overflow-hidden border border-white/10 relative">
          <iframe
            src={lesson.youtubeUrl ? lesson.youtubeUrl.replace("watch?v=", "embed/") : "https://www.youtube.com/embed/LXb3EKWsInQ"}
            title={lesson.title}
            className="w-full h-full"
            allowFullScreen
          />
        </div>
      </div>

      {/* STEP 2: READING MATERIAL */}
      <div className="glass-card p-5 rounded-3xl border border-white/10 space-y-3 bg-slate-900/90">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <FileText className="w-4 h-4 text-cyan-400" />
            <span>Step 2: Technical Reading Guide & Blueprint</span>
          </h3>

          <button
            onClick={handleReadingCompleted}
            disabled={!videoWatched}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              !videoWatched
                ? "opacity-50 cursor-not-allowed bg-white/5 text-slate-500"
                : readingDone
                ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                : "bg-cyan-500 text-black font-extrabold"
            }`}
          >
            {readingDone ? "Reading Completed ✓" : "Mark Reading Completed"}
          </button>
        </div>

        {lesson.gdriveShareUrl ? (
          <iframe
            src={lesson.gdriveShareUrl.replace("/view", "/preview")}
            title="Google Drive Document"
            className="w-full h-64 rounded-2xl bg-slate-950 border border-white/10"
          />
        ) : (
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs text-slate-300 leading-relaxed space-y-2 max-h-64 overflow-y-auto">
            <p className="font-bold text-white">Technical Operating Standard (TOS):</p>
            <p>1. Ensure workpiece is chucked securely with hydraulic pressure set to 2.5 MPa.</p>
            <p>2. Verify tool geometry offsets (X, Z) against master calibration bar.</p>
            <p>3. Execute dry run in Air Cut mode prior to raw stock engagement.</p>
            <p>4. Maintain coolant flow rate at minimum 15 liters/min during G01 cutting feeds.</p>
          </div>
        )}
      </div>

      {/* STEP 3 & 4: MANDATORY 10-QUESTION QUIZ & CERTIFICATE */}
      {videoWatched && readingDone ? (
        <MandatoryQuizPlayer
          questions={questionsToUse}
          topicTitle={lesson.title}
          onQuizCompleted={handleQuizFinish}
        />
      ) : (
        <div className="glass-card p-6 rounded-3xl border border-white/10 text-center space-y-2 bg-slate-900/50">
          <Lock className="w-8 h-8 text-slate-500 mx-auto" />
          <h4 className="text-xs font-bold text-slate-400">Step 3 & 4 Locked</h4>
          <p className="text-[11px] text-slate-500">Complete Video Watch and Technical Reading steps above to unlock mandatory 10-Question Exam.</p>
        </div>
      )}

      {/* Certificate Modal View */}
      <CertificateModal
        isOpen={certModalOpen}
        onClose={() => setCertModalOpen(false)}
        certificate={{
          id: "cert-123",
          certificateCode: "CRT-8A92F1",
          studentId: "student-1",
          courseId: "course-1",
          courseTitle,
          quizScore: quizScore || 94,
          issuedAt: new Date().toISOString(),
        }}
      />

    </div>
  );
}
