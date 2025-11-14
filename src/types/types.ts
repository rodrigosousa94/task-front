export type TaskStatus = "Pending" | "InProgress" | "Completed";

export interface Task {
  id: number;
  title: string;
  description?: string | null;
  createdAt: string;
  completedAt?: string | null;
  status: TaskStatus;
}
