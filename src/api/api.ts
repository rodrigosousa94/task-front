import type { Task } from "../types/types";

const BASE = "http://localhost:5042/api/tasks";

export async function fetchTasks(): Promise<Task[]> {
  const res = await fetch(BASE);
  if (!res.ok) throw new Error("Erro ao buscar tarefas");
  return res.json();
}

export async function fetchTask(id: number): Promise<Task> {
  const res = await fetch(`${BASE}/${id}`);
  if (!res.ok) throw new Error("Erro ao buscar tarefa");
  return res.json();
}

export async function createTask(payload: { Title: string; Description?: string }) {
  const res = await fetch(BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  if (!res.ok) throw new Error("Erro ao criar tarefa");
  return res.json();
}

export async function updateTask(id: number, payload: any) {
  // API aceita PUT /api/tasks/{id} com status numérico (0/1/2) ou outros campos
  const res = await fetch(`${BASE}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  if (!res.ok) throw new Error("Erro ao atualizar tarefa");
  return res.json();
}

export async function deleteTask(id: number) {
  const res = await fetch(`${BASE}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Erro ao deletar tarefa");
  return true;
}
