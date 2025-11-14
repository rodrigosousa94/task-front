import type { Task } from "../types/types";
import TaskCard from "./TaskCard";

export default function TaskList({
  tasks,
  onUpdate,
  onDelete,
  onEdit,
  onRefresh
}: {
  tasks: Task[];
  onUpdate: (id: number, payload: any) => void;
  onDelete: (id: number, title: string) => void;
  onEdit: (task: Task) => void;
  onRefresh: () => void;
}) {
  if (tasks.length === 0) {
    return (
      <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 p-12 rounded-xl text-center">
        <div className="text-slate-400 mb-2">
          <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </div>
        <p className="text-lg text-slate-300 font-medium mb-1">Sem tarefas</p>
        <p className="text-sm text-slate-500">Crie a primeira tarefa clicando no botão "Nova Tarefa"</p>
      </div>
    );
  }
  return (
    <div className="space-y-4">
      {tasks.sort((a,b)=>b.id-a.id).map(task => (
        <TaskCard key={task.id} task={task} onUpdate={onUpdate} onDelete={onDelete} onEdit={onEdit} />
      ))}
      <div className="text-sm text-slate-400 text-center pt-2">
        Última atualização: <button onClick={onRefresh} className="text-cyan-400 hover:text-cyan-300 underline transition-colors">Recarregar</button>
      </div>
    </div>
  );
}
