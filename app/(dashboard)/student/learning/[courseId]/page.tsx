"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, BookOpen, CheckCircle2, Play, Award, ChevronRight } from "lucide-react";
import LessonViewer from "@/components/dashboard/learning/LessonViewer";

export default function SingleCoursePage() {
  const [activeLessonIndex, setActiveLessonIndex] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<Record<string, number>>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("karmasetu_completed_lessons");
      return saved ? JSON.parse(saved) : {};
    }
    return {};
  });

  const courseLessons = [
    {
      id: "les-1",
      moduleId: "mod-1",
      title: "Fanuc CNC Lathe G-Code & M-Code Programming",
      lessonType: "VIDEO_YOUTUBE" as const,
      orderIndex: 1,
      durationMinutes: 15,
      youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      contentMarkdown: "Standard Operating Standard (TOS): Ensure workpiece is chucked securely with hydraulic pressure set to 2.5 MPa.",
    },
    {
      id: "les-2",
      moduleId: "mod-1",
      title: "PLC Ladder Logic & Sensor Input Calibration",
      lessonType: "VIDEO_YOUTUBE" as const,
      orderIndex: 2,
      durationMinutes: 20,
      youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      contentMarkdown: "Calibrate NPN proximity sensors and verify 24V DC input LED status on PLC rack.",
    },
    {
      id: "les-3",
      moduleId: "mod-2",
      title: "Workpiece Offsets & Tool Nose Radius Compensation (G41/G42)",
      lessonType: "VIDEO_YOUTUBE" as const,
      orderIndex: 3,
      durationMinutes: 25,
      youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      contentMarkdown: "Set G54 work coordinate system and calculate imaginary tool tip orientation P1-P9.",
    }
  ];

  const handleLessonComplete = (lessonId: string, percentage: number) => {
    setCompletedLessons((prev) => {
      const updated = { ...prev, [lessonId]: percentage };
      if (typeof window !== "undefined") {
        localStorage.setItem("karmasetu_completed_lessons", JSON.stringify(updated));
      }
      return updated;
    });
  };

  const currentLesson = courseLessons[activeLessonIndex] || courseLessons[0];

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Top Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <Link
          href="/student/learning"
          className="px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-xs font-bold text-slate-300 flex items-center gap-1.5 transition-all"
        >
          <ArrowLeft className="w-4 h-4 text-cyan-400" /> Back to Learning Hub
        </Link>

        {/* Lesson Selector Pills */}
        <div className="flex items-center gap-2 overflow-x-auto py-1">
          {courseLessons.map((les, idx) => {
            const isDone = !!completedLessons[les.id];
            const isActive = idx === activeLessonIndex;
            return (
              <button
                key={les.id}
                onClick={() => setActiveLessonIndex(idx)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  isActive
                    ? "bg-cyan-500 text-black shadow-lg shadow-cyan-500/20 font-black"
                    : isDone
                    ? "bg-emerald-500/20 border border-emerald-500/30 text-emerald-300"
                    : "bg-white/5 border border-white/10 text-slate-400 hover:text-white"
                }`}
              >
                <span>Lesson {idx + 1}</span>
                {isDone && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Lesson Viewer Component */}
      <LessonViewer
        lesson={currentLesson}
        courseTitle={`CNC & Automation Mastery - Lesson ${activeLessonIndex + 1}`}
        onLessonComplete={handleLessonComplete}
      />

    </div>
  );
}
