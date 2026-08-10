"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, BookOpen, CheckCircle2, Play, Award } from "lucide-react";
import LessonViewer from "@/components/dashboard/learning/LessonViewer";

export default function SingleCoursePage() {
  const [completedLessons, setCompletedLessons] = useState<Record<string, number>>({});

  const sampleLesson = {
    id: "les-1",
    moduleId: "mod-1",
    title: "Fanuc CNC Lathe G-Code & M-Code Programming",
    lessonType: "VIDEO_YOUTUBE" as const,
    orderIndex: 1,
    durationMinutes: 15,
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    contentMarkdown: "Standard Operating Standard (TOS): Ensure workpiece is chucked securely with hydraulic pressure set to 2.5 MPa.",
  };

  const handleLessonComplete = (lessonId: string, percentage: number) => {
    setCompletedLessons((prev) => ({ ...prev, [lessonId]: percentage }));
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <Link
          href="/student/learning"
          className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-xs font-bold text-slate-300 flex items-center gap-1.5 transition-all"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Learning Hub
        </Link>

        <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs font-bold">
          Sequential Course Player
        </span>
      </div>

      {/* Lesson Viewer Component */}
      <LessonViewer
        lesson={sampleLesson}
        courseTitle="CNC Lathe Fanuc G-Code Programming"
        onLessonComplete={handleLessonComplete}
      />

    </div>
  );
}
