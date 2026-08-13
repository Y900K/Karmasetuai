"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface StudentRecord {
  id: string;
  name: string;
  trade: string;
  institute: string;
  jobReadyIndex: number;
  courseCompletion: number;
  certificatesEarned: number;
  liveMatchesCount: number;
  status: "ACTIVE" | "VERIFIED" | "PLACED";
}

export interface JobPosting {
  id: string;
  title: string;
  company: string;
  location: string;
  trade: string;
  salary: string;
  matchedScore: number;
  status: "OPEN" | "INTERVIEWING" | "HIRED";
}

export interface CapstoneSubmission {
  id: string;
  studentName: string;
  trade: string;
  task: string;
  videoUrl?: string;
  aiTechScore: number;
  aiSafetyScore: number;
  aiPrecisionScore: number;
  status: "PENDING" | "VERIFIED" | "REJECTED";
}

export interface DistrictMetric {
  name: string;
  state: string;
  placementRate: number;
  totalStudentsPlaced: number;
  topDemandTrades: string[];
  supplyDeficitTrades: string[];
  clusters: string[];
  keyIndustrialClusters?: string[];
  status?: string;
}

const DEFAULT_STUDENTS: StudentRecord[] = [
  { id: "s1", name: "Rajesh Kumar", trade: "CNC Machinist & Programmer", institute: "Govt ITI Lucknow", jobReadyIndex: 94.0, courseCompletion: 88, certificatesEarned: 4, liveMatchesCount: 12, status: "VERIFIED" },
  { id: "s2", name: "Mohit Verma", trade: "Industrial Electrician", institute: "Govt ITI Kanpur", jobReadyIndex: 86.5, courseCompletion: 82, certificatesEarned: 3, liveMatchesCount: 8, status: "ACTIVE" },
  { id: "s3", name: "Priya Sharma", trade: "TIG/MIG Welder", institute: "Govt ITI Noida", jobReadyIndex: 91.2, courseCompletion: 95, certificatesEarned: 5, liveMatchesCount: 15, status: "PLACED" },
];

const DEFAULT_JOBS: JobPosting[] = [
  { id: "j1", title: "CNC Lathe Machine Operator", company: "Tata Motors Auto Plant", location: "Noida, UP", trade: "CNC Machinist & Programmer", salary: "₹24,000 / mo", matchedScore: 94, status: "OPEN" },
  { id: "j2", title: "3-Phase Motor Control Specialist", company: "Havells India Electricals", location: "Haridwar, UK", trade: "Industrial Electrician", salary: "₹22,500 / mo", matchedScore: 89, status: "OPEN" },
  { id: "j3", title: "Precision Tool & Die Fabricator", company: "L&T Heavy Engineering", location: "Kanpur, UP", trade: "TIG/MIG Welder", salary: "₹26,000 / mo", matchedScore: 92, status: "HIRED" },
];

const DEFAULT_CAPSTONES: CapstoneSubmission[] = [
  { id: "p1", studentName: "Rajesh Kumar", trade: "CNC Machinist", task: "Fanuc Controller Precision Lathe Fabrication", aiTechScore: 96, aiSafetyScore: 94, aiPrecisionScore: 92, status: "PENDING" },
  { id: "p2", studentName: "Mohit Verma", trade: "Industrial Electrician", task: "3-Phase Motor Control Panel Wiring & Testing", aiTechScore: 90, aiSafetyScore: 96, aiPrecisionScore: 88, status: "PENDING" },
];

const DEFAULT_DISTRICTS: DistrictMetric[] = [
  { name: "Gautam Buddha Nagar (Noida)", state: "Uttar Pradesh", placementRate: 92, totalStudentsPlaced: 1850, topDemandTrades: ["CNC Machinist", "Robotics Operator"], supplyDeficitTrades: ["IoT Sensor Tech"], clusters: ["Noida Sector 80"], keyIndustrialClusters: ["Noida Phase II Sector 80", "Greater Noida Ecotech IT Park"], status: "EXCELLENT" },
  { name: "Haridwar (SIDCUL)", state: "Uttarakhand", placementRate: 88, totalStudentsPlaced: 1420, topDemandTrades: ["Pharma Packaging", "Electrician"], supplyDeficitTrades: ["PLC Programmer"], clusters: ["SIDCUL Area"], keyIndustrialClusters: ["SIDCUL Industrial Area", "Bahadrabad Cluster"], status: "HIGH" },
  { name: "Kanpur Nagar", state: "Uttar Pradesh", placementRate: 64, totalStudentsPlaced: 980, topDemandTrades: ["Tanner Fabricator", "Fitter"], supplyDeficitTrades: ["CNC Turning Tech"], clusters: ["Dada Nagar"], keyIndustrialClusters: ["Dada Nagar Industrial Estate", "Panki Industrial Area"], status: "DEFICIT" },
  { name: "Lucknow Central", state: "Uttar Pradesh", placementRate: 85, totalStudentsPlaced: 1260, topDemandTrades: ["Industrial Electrician", "HVAC Tech"], supplyDeficitTrades: ["Solar Technician"], clusters: ["Chinhat Area"], keyIndustrialClusters: ["Chinhat Industrial Area", "Amausi Industrial Estate"], status: "GOOD" },
  { name: "Pune Industrial Belt", state: "Maharashtra", placementRate: 90, totalStudentsPlaced: 2100, topDemandTrades: ["Auto Assembly", "Mechatronics Tech"], supplyDeficitTrades: ["EV Battery Tech"], clusters: ["Chakan MIDC"], keyIndustrialClusters: ["Pimpri-Chinchwad MIDC", "Chakan Auto Hub", "Bhosari"], status: "EXCELLENT" },
];

interface EcosystemStoreContextType {
  students: StudentRecord[];
  jobs: JobPosting[];
  capstones: CapstoneSubmission[];
  districts: DistrictMetric[];
  verifyCapstone: (id: string) => void;
  addJob: (job: Omit<JobPosting, "id" | "status">) => void;
  hireCandidate: (jobId: string, studentId: string) => void;
}

const EcosystemStoreContext = createContext<EcosystemStoreContextType>({
  students: DEFAULT_STUDENTS,
  jobs: DEFAULT_JOBS,
  capstones: DEFAULT_CAPSTONES,
  districts: DEFAULT_DISTRICTS,
  verifyCapstone: () => {},
  addJob: () => {},
  hireCandidate: () => {},
});

export function EcosystemStoreProvider({ children }: { children: React.ReactNode }) {
  // P1-7 fix: Lazy initialization from localStorage so data doesn't flash/reset
  const [students, setStudents] = useState<StudentRecord[]>(() => {
    if (typeof window !== "undefined") {
      const s = localStorage.getItem("ks_students");
      if (s) { try { return JSON.parse(s); } catch {} }
    }
    return DEFAULT_STUDENTS;
  });

  const [jobs, setJobs] = useState<JobPosting[]>(() => {
    if (typeof window !== "undefined") {
      const j = localStorage.getItem("ks_jobs");
      if (j) { try { return JSON.parse(j); } catch {} }
    }
    return DEFAULT_JOBS;
  });

  const [capstones, setCapstones] = useState<CapstoneSubmission[]>(() => {
    if (typeof window !== "undefined") {
      const c = localStorage.getItem("ks_capstones");
      if (c) { try { return JSON.parse(c); } catch {} }
    }
    return DEFAULT_CAPSTONES;
  });

  const [districts, setDistricts] = useState<DistrictMetric[]>(() => {
    if (typeof window !== "undefined") {
      const d = localStorage.getItem("ks_districts");
      if (d) { try { return JSON.parse(d); } catch {} }
    }
    return DEFAULT_DISTRICTS;
  });

  const saveStudents = (newVal: StudentRecord[]) => {
    setStudents(newVal);
    if (typeof window !== "undefined") localStorage.setItem("ks_students", JSON.stringify(newVal));
  };

  const saveJobs = (newVal: JobPosting[]) => {
    setJobs(newVal);
    if (typeof window !== "undefined") localStorage.setItem("ks_jobs", JSON.stringify(newVal));
  };

  const saveCapstones = (newVal: CapstoneSubmission[]) => {
    setCapstones(newVal);
    if (typeof window !== "undefined") localStorage.setItem("ks_capstones", JSON.stringify(newVal));
  };

  const saveDistricts = (newVal: DistrictMetric[]) => {
    setDistricts(newVal);
    if (typeof window !== "undefined") localStorage.setItem("ks_districts", JSON.stringify(newVal));
  };

  // Cross-Role Action 1: Expert Verifies Capstone -> Updates Student Score & Institute Placement Metrics
  const verifyCapstone = (id: string) => {
    const updatedCapstones = capstones.map(c => c.id === id ? { ...c, status: "VERIFIED" as const } : c);
    saveCapstones(updatedCapstones);

    const verifiedCap = capstones.find(c => c.id === id);
    if (verifiedCap) {
      const updatedStudents = students.map(s => {
        if (s.name.includes(verifiedCap.studentName) || verifiedCap.studentName.includes(s.name)) {
          return {
            ...s,
            jobReadyIndex: Math.min(99.5, s.jobReadyIndex + 3.5),
            certificatesEarned: s.certificatesEarned + 1,
            status: "VERIFIED" as const,
          };
        }
        return s;
      });
      saveStudents(updatedStudents);

      const updatedDistricts = districts.map(d => {
        if (d.name.includes("Noida") || d.name.includes("Lucknow")) {
          return { ...d, totalStudentsPlaced: d.totalStudentsPlaced + 1 };
        }
        return d;
      });
      saveDistricts(updatedDistricts);
    }
  };

  // Cross-Role Action 2: Employer Posts Job -> Appears in Student Matches & Employer Pipeline
  const addJob = (job: Omit<JobPosting, "id" | "status">) => {
    const newJob: JobPosting = {
      ...job,
      id: "j-" + Date.now(),
      status: "OPEN",
    };
    const updatedJobs = [newJob, ...jobs];
    saveJobs(updatedJobs);

    const updatedStudents = students.map(s => {
      if (s.trade.toLowerCase().includes(job.trade.toLowerCase()) || job.trade.toLowerCase().includes(s.trade.toLowerCase())) {
        return { ...s, liveMatchesCount: s.liveMatchesCount + 1 };
      }
      return s;
    });
    saveStudents(updatedStudents);
  };

  // Cross-Role Action 3: Candidate Hired -> Updates Employer, Institute, and National Heatmap
  const hireCandidate = (jobId: string, studentId: string) => {
    const updatedJobs = jobs.map(j => j.id === jobId ? { ...j, status: "HIRED" as const } : j);
    saveJobs(updatedJobs);

    const updatedStudents = students.map(s => s.id === studentId ? { ...s, status: "PLACED" as const } : s);
    saveStudents(updatedStudents);

    const updatedDistricts = districts.map(d => ({
      ...d,
      totalStudentsPlaced: d.totalStudentsPlaced + 1,
      placementRate: Math.min(98, d.placementRate + 1),
    }));
    saveDistricts(updatedDistricts);
  };

  return React.createElement(
    EcosystemStoreContext.Provider,
    {
      value: {
        students,
        jobs,
        capstones,
        districts,
        verifyCapstone,
        addJob,
        hireCandidate,
      },
    },
    children
  );
}

export const useEcosystemStore = () => useContext(EcosystemStoreContext);
