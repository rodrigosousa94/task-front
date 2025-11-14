import React, { useState } from "react";
import type { Task } from "../types/types";
import { statusMeta, statusNumberToString, statusStringToNumber } from "../utils/status";

export default function TaskCard({
  task,
  onUpdate,
  onDelete,
  onEdit
}: {
  task: Task;
  onUpdate: (id: number, payload: any) => void;
  onDelete: (id: number, title: string) => void;
  onEdit: (task: Task) => void;
}) {
  const [loading, setLoading] = useState(false);

  const meta = statusMeta[task.status];

  // Cores de fundo e borda baseadas no status
  const getCardStyles = () => {
    switch (task.status) {
      case "Pending":
        return "bg-gradient-to-br from-amber-900/20 to-yellow-900/20 border-amber-500/30 hover:border-amber-500/50";
      case "InProgress":
        return "bg-gradient-to-br from-blue-900/20 to-cyan-900/20 border-blue-500/30 hover:border-blue-500/50";
      case "Completed":
        return "bg-gradient-to-br from-emerald-900/20 to-green-900/20 border-emerald-500/30 hover:border-emerald-500/50";
      default:
        return "bg-slate-800/50 border-slate-700";
    }
  };

  const changeStatus = async (num: number) => {
    if (loading) return;
    try {
      setLoading(true);
      // API espera status numérico (0|1|2)
      await onUpdate(task.id, { title: task.title, description: task.description ?? "", status: num });
    } finally { setLoading(false); }
  };

  const formatDate = (s?: string | null) => s ? new Date(s).toLocaleString("pt-BR") : "-";

  return (
    <div className={`${getCardStyles()} p-3 sm:p-5 rounded-xl border backdrop-blur-sm shadow-lg hover:shadow-xl transition-all`}>
      <div className="flex-1">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4 mb-3 sm:mb-4">
          <div className="flex-1 min-w-0">
            <h4 className="text-lg sm:text-xl font-bold text-white mb-1 sm:mb-2 break-words">{task.title}</h4>
            {task.description && (
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed break-words">{task.description}</p>
            )}
          </div>
          <div className="flex flex-col sm:flex-col items-start sm:items-end gap-2 sm:gap-0">
            <div className={`inline-flex items-center gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs font-semibold ${meta.badge} border ${task.status === "Pending" ? "border-amber-500/50" : task.status === "InProgress" ? "border-blue-500/50" : "border-emerald-500/50"}`}>
              {meta.label}
            </div>
            <div className="text-xs text-slate-400 mt-1 sm:mt-2">
              <div className="whitespace-nowrap">Criada: <span className="text-slate-500">{formatDate(task.createdAt)}</span></div>
              {task.status === "Completed" && task.completedAt && (
                <div className="text-emerald-400 mt-1 whitespace-nowrap">Concluída: <span className="text-emerald-300">{formatDate(task.completedAt)}</span></div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-slate-700/50">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <div className="flex flex-wrap gap-2 flex-1">
              <button
                onClick={()=>changeStatus(0)}
                disabled={loading}
                className={`flex-1 sm:flex-initial px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                  task.status === "Pending" 
                    ? "bg-amber-500/20 text-amber-300 border-2 border-amber-500/50 shadow-lg shadow-amber-500/20" 
                    : "bg-slate-800/50 text-slate-300 border border-slate-700 hover:bg-slate-700/50 hover:border-amber-500/30"
                }`}
              >
                Pendente
              </button>

              <button
                onClick={()=>changeStatus(1)}
                disabled={loading}
                className={`flex-1 sm:flex-initial px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                  task.status === "InProgress" 
                    ? "bg-blue-500/20 text-blue-300 border-2 border-blue-500/50 shadow-lg shadow-blue-500/20" 
                    : "bg-slate-800/50 text-slate-300 border border-slate-700 hover:bg-slate-700/50 hover:border-blue-500/30"
                }`}
              >
                Em andamento
              </button>

              <button
                onClick={()=>changeStatus(2)}
                disabled={loading}
                className={`flex-1 sm:flex-initial px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                  task.status === "Completed" 
                    ? "bg-emerald-500/20 text-emerald-300 border-2 border-emerald-500/50 shadow-lg shadow-emerald-500/20" 
                    : "bg-slate-800/50 text-slate-300 border border-slate-700 hover:bg-slate-700/50 hover:border-emerald-500/30"
                }`}
              >
                Concluída
              </button>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto sm:ml-auto">
              <button 
                onClick={()=>onEdit(task)} 
                className="flex-1 sm:flex-initial px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm rounded-lg font-medium bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/20 hover:border-cyan-500/50 transition-all flex items-center justify-center gap-1.5"
              >
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Editar
              </button>
              <button 
                onClick={()=>onDelete(task.id, task.title)} 
                className="flex-1 sm:flex-initial px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm rounded-lg font-medium bg-red-500/10 text-red-400 border border-red-500/30 hover:bg-red-500/20 hover:border-red-500/50 transition-all"
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
