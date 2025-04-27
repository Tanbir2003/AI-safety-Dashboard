// src/types/index.ts
export type Severity = "Low" | "Medium" | "High";

export type SortOrder = "Newest First" | "Oldest First";

export interface Incident {
  id: number;
  title: string;
  description: string;
  severity: Severity;
  reported_at: string;
}