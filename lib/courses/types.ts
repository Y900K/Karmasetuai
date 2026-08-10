export type LessonType = 
  | 'VIDEO_YOUTUBE'
  | 'VIDEO_UPLOAD'
  | 'FILE_GDRIVE'
  | 'FILE_UPLOAD'
  | 'TEXT'
  | 'QUIZ';

export interface QuizQuestion {
  id: string;
  type: 'MCQ' | 'WRITTEN';
  question: string;
  options?: string[]; // Mandatory 4 options for MCQ
  correctAnswer?: string; // For MCQ
  writtenRubric?: string; // For Written short answer grading criteria
  points: number;
}

export interface Lesson {
  id: string;
  moduleId: string;
  title: string;
  lessonType: LessonType;
  orderIndex: number;
  durationMinutes: number;
  youtubeUrl?: string;
  fileUrl?: string;
  gdriveShareUrl?: string;
  contentMarkdown?: string;
  quizQuestions?: QuizQuestion[];
}

export interface Module {
  id: string;
  courseId: string;
  title: string;
  orderIndex: number;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  createdBy: string;
  title: string;
  description?: string;
  trade: string;
  thumbnailUrl?: string;
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  enrolledCount: number;
  avgCompletionPercent: number;
  modules?: Module[];
  createdAt?: string;
  updatedAt?: string;
}

export interface CourseEnrollment {
  id: string;
  courseId: string;
  studentId: string;
  videoCompletedLessons: string[];
  readingCompletedLessons: string[];
  quizPassedLessons: string[];
  quizScores: Record<string, number>;
  totalCompletionPercentage: number;
  enrolledAt: string;
  lastAccessedAt: string;
}

export interface Certificate {
  id: string;
  certificateCode: string;
  studentId: string;
  courseId: string;
  courseTitle?: string;
  studentName?: string;
  quizScore: number;
  issuedAt: string;
  qrCodeUrl?: string;
  pdfUrl?: string;
}
