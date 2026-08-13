"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type QuestionType = "SHORT_TEXT" | "PARAGRAPH" | "MULTIPLE_CHOICE" | "CHECKBOXES" | "RATING_1_5";

export interface QuestionItem {
  id: string;
  label: string;
  type: QuestionType;
  options?: string[];
  required: boolean;
}

export interface FormResponse {
  id: string;
  formId: string;
  submittedAt: string;
  answers: Record<string, string | string[]>;
  respondentName?: string;
  respondentRole?: string;
}

export interface FormSchema {
  id: string;
  title: string;
  description: string;
  category: "Placement" | "Audit" | "Survey" | "Feedback" | "Safety";
  createdBy: string;
  createdAt: string;
  questions: QuestionItem[];
  responses: FormResponse[];
}

const INITIAL_FORMS: FormSchema[] = [
  {
    id: "FRM-8910",
    title: "NCVT Apprenticeship Placement Feedback 2026",
    description: "Official feedback survey for ITI trainees deployed across MSME manufacturing plants in Noida and Kanpur.",
    category: "Placement",
    createdBy: "Rajesh Sharma (HR Lead)",
    createdAt: "2026-08-01",
    questions: [
      { id: "q1", label: "Full Name & Roll Number", type: "SHORT_TEXT", required: true },
      { id: "q2", label: "Deployed Plant / Company Name", type: "SHORT_TEXT", required: true },
      { id: "q3", label: "Rate Shopfloor Safety & Equipment Readiness", type: "RATING_1_5", required: true },
      { id: "q4", label: "Which machines are you actively operating?", type: "CHECKBOXES", options: ["CNC Lathe Fanuc", "MIG/TIG Welder", "PLC Starter Panel", "Micrometer / Vernier"], required: true },
      { id: "q5", label: "Additional Suggestions for ITI Curriculum", type: "PARAGRAPH", required: false },
    ],
    responses: [
      {
        id: "RSP-101",
        formId: "FRM-8910",
        submittedAt: "2026-08-10 14:30",
        respondentName: "Rajesh Kumar",
        respondentRole: "CNC Machinist Trainee",
        answers: {
          q1: "Rajesh Kumar (UP-89421)",
          q2: "Tata Motors Ancillary Noida",
          q3: "5",
          q4: ["CNC Lathe Fanuc", "Micrometer / Vernier"],
          q5: "Need more practical simulation time on Fanuc 0i-TF controllers.",
        },
      },
    ],
  },
  {
    id: "FRM-4215",
    title: "MSME Plant Campus Hiring & Skill Demand Survey",
    description: "Workforce hiring requirement audit for tier-1 & tier-2 industrial suppliers in Uttar Pradesh.",
    category: "Audit",
    createdBy: "National Governance Admin",
    createdAt: "2026-08-05",
    questions: [
      { id: "q1", label: "Company / Factory Name", type: "SHORT_TEXT", required: true },
      { id: "q2", label: "Industrial Hub Location", type: "MULTIPLE_CHOICE", options: ["Noida Industrial Belt", "Kanpur Industrial Hub", "Haridwar SIDCUL", "Pune Chakan Cluster"], required: true },
      { id: "q3", label: "Required Trainee Count in Next 30 Days", type: "SHORT_TEXT", required: true },
      { id: "q4", label: "Rate Overall NCVT Skill Quality", type: "RATING_1_5", required: true },
    ],
    responses: [],
  },
  {
    id: "FRM-7301",
    title: "Trainee Workshop Safety & 5S Compliance Audit",
    description: "Routine campus safety, personal protective equipment (PPE), and shopfloor hazard evaluation.",
    category: "Safety",
    createdBy: "State NCVT Auditor",
    createdAt: "2026-08-11",
    questions: [
      { id: "q1", label: "ITI Campus Name", type: "SHORT_TEXT", required: true },
      { id: "q2", label: "Are all safety goggles & steel-toe shoes provided?", type: "MULTIPLE_CHOICE", options: ["Yes - 100% Compliant", "Partial - Orders Pending", "No - Non-Compliant"], required: true },
      { id: "q3", label: "Emergency Stop Button Testing Status", type: "MULTIPLE_CHOICE", options: ["Passed Inspection", "Maintenance Required"], required: true },
    ],
    responses: [],
  },
];

interface FormContextType {
  forms: FormSchema[];
  createForm: (form: Omit<FormSchema, "id" | "createdAt" | "responses">) => FormSchema;
  submitResponse: (formId: string, response: Omit<FormResponse, "id" | "formId" | "submittedAt">) => void;
  getFormById: (formId: string) => FormSchema | undefined;
  deleteForm: (formId: string) => void;
}

const FormContext = createContext<FormContextType>({
  forms: INITIAL_FORMS,
  createForm: () => INITIAL_FORMS[0],
  submitResponse: () => {},
  getFormById: () => undefined,
  deleteForm: () => {},
});

export function FormProvider({ children }: { children: React.ReactNode }) {
  const [forms, setForms] = useState<FormSchema[]>(INITIAL_FORMS);

  // Sync with Server Database API
  useEffect(() => {
    async function fetchFormsFromDatabase() {
      try {
        const res = await fetch("/api/forms");
        const json = await res.json();
        if (json.data && json.data.length > 0) {
          setForms(json.data);
        }
      } catch (e) {
        console.error("Failed to fetch forms from database", e);
      }
    }
    fetchFormsFromDatabase();
  }, []);

  const createForm = (data: Omit<FormSchema, "id" | "createdAt" | "responses">): FormSchema => {
    const newId = `FRM-${Math.floor(1000 + Math.random() * 9000)}`;
    const newForm: FormSchema = {
      ...data,
      id: newId,
      createdAt: new Date().toISOString().split("T")[0],
      responses: [],
    };

    const updated = [newForm, ...forms];
    setForms(updated);

    // Persist to Server Database API
    fetch("/api/forms", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).catch((e) => console.error("Database persist error for form", e));

    return newForm;
  };

  const submitResponse = (formId: string, responseData: Omit<FormResponse, "id" | "formId" | "submittedAt">) => {
    const responseId = `RSP-${Math.floor(10000 + Math.random() * 90000)}`;
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")} ${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;

    const newResponse: FormResponse = {
      ...responseData,
      id: responseId,
      formId,
      submittedAt: formattedDate,
    };

    const updated = forms.map((f) => {
      if (f.id === formId) {
        return {
          ...f,
          responses: [newResponse, ...(f.responses || [])],
        };
      }
      return f;
    });

    setForms(updated);

    // Persist response to Server Database API
    fetch(`/api/forms/${formId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(responseData),
    }).catch((e) => console.error("Database persist error for response", e));
  };

  const getFormById = (formId: string) => {
    const cleanId = formId.toUpperCase();
    return forms.find((f) => f.id.toUpperCase() === cleanId || f.id.toUpperCase().replace("-", "") === cleanId.replace("-", ""));
  };

  const deleteForm = (formId: string) => {
    const updated = forms.filter((f) => f.id !== formId);
    setForms(updated);
  };

  return React.createElement(FormContext.Provider, {
    value: { forms, createForm, submitResponse, getFormById, deleteForm },
    children,
  });
}

export const useFormStore = () => useContext(FormContext);
