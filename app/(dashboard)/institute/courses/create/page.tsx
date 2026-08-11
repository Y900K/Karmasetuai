import React, { Suspense } from "react";
import CourseBuilder from "@/components/dashboard/learning/CourseBuilder";

export default function CreateCoursePage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-slate-400 text-xs">Loading course builder...</div>}>
      <CourseBuilder />
    </Suspense>
  );
}
