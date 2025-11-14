export const statusNumberToString = (n: number) =>
  n === 0 ? "Pending" : n === 1 ? "InProgress" : "Completed";

export const statusStringToNumber = (s: string) =>
  s === "Pending" ? 0 : s === "InProgress" ? 1 : 2;

export const statusMeta: Record<string, { label: string; badge: string; color: string }> = {
  Pending: { label: "Pendente", badge: "bg-yellow-100 text-yellow-800", color: "text-yellow-600" },
  InProgress: { label: "Em Progresso", badge: "bg-blue-100 text-blue-800", color: "text-blue-600" },
  Completed: { label: "Concluída", badge: "bg-green-100 text-green-800", color: "text-green-600" }
};
