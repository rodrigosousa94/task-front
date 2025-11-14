import { useEffect, useState } from "react";
import { fetchTasks, createTask, updateTask, deleteTask } from "./api/api";
import type { Task } from "./types/types";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import TaskEditForm from "./components/TaskEditForm";
import Modal from "./components/Modal";
import ConfirmDialog from "./components/ConfirmDialog";

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editTask, setEditTask] = useState<Task | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<{ isOpen: boolean; taskId: number | null; taskTitle: string }>({
    isOpen: false,
    taskId: null,
    taskTitle: ""
  });

  const load = async () => {
    try {
      setLoading(true);
      const data = await fetchTasks();
      setTasks(data);
    } catch (e: any) {
      setError(e.message || "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleCreate = async (title: string, description?: string) => {
    try {
      const created = await createTask({ Title: title, Description: description || "" });
      setTasks((s) => [...s, created]);
      setIsModalOpen(false);
    } catch (e: any) {
      alert("Erro ao criar: " + (e.message || ""));
    }
  };

  const handleUpdate = async (id: number, payload: any) => {
    try {
      const updated = await updateTask(id, payload);
      setTasks((s) => s.map(t => t.id === id ? updated : t));
    } catch (e: any) {
      alert("Erro ao atualizar: " + (e.message || ""));
    }
  };

  const handleEditTask = async (id: number, title: string, description: string, status: number) => {
    try {
      const payload = { title, description, status };
      const updated = await updateTask(id, payload);
      setTasks((s) => s.map(t => t.id === id ? updated : t));
      setEditTask(null);
    } catch (e: any) {
      alert("Erro ao editar: " + (e.message || ""));
    }
  };

  const handleEditRequest = (task: Task) => {
    setEditTask(task);
  };

  const handleDeleteRequest = (id: number, title: string) => {
    setDeleteConfirm({ isOpen: true, taskId: id, taskTitle: title });
  };

  const handleDelete = async () => {
    if (!deleteConfirm.taskId) return;
    try {
      await deleteTask(deleteConfirm.taskId);
      setTasks((s) => s.filter(t => t.id !== deleteConfirm.taskId));
      setDeleteConfirm({ isOpen: false, taskId: null, taskTitle: "" });
    } catch (e: any) {
      alert("Erro ao excluir: " + (e.message || ""));
      setDeleteConfirm({ isOpen: false, taskId: null, taskTitle: "" });
    }
  };

  return (
    <div className="min-h-screen p-3 sm:p-6 md:p-12 relative overflow-hidden">
      {/* Efeitos de fundo tecnológico */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.1),transparent_50%)]" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      <header className="max-w-6xl mx-auto mb-4 sm:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Gerenciador de Tarefas
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">Rápido, responsivo e integrado com sua API local.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
            <button 
              onClick={() => setIsModalOpen(true)} 
              className="w-full sm:w-auto px-4 sm:px-5 py-2 sm:py-2.5 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white rounded-lg font-medium shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-all flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span className="hidden sm:inline">Nova Tarefa</span>
              <span className="sm:hidden">Nova</span>
            </button>
            <button 
              onClick={load} 
              className="w-full sm:w-auto px-4 sm:px-5 py-2 sm:py-2.5 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700 hover:border-slate-600 text-white rounded-lg font-medium transition-all flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Atualizar
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto">
        <section>
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 mb-4 sm:mb-6">
              <h3 className="text-xl sm:text-2xl font-bold text-white">Tarefas</h3>
              <div className="px-3 sm:px-4 py-1.5 sm:py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-xs sm:text-sm text-slate-300 w-fit">
                {loading ? "Carregando..." : `${tasks.length} ${tasks.length === 1 ? 'item' : 'itens'}`}
              </div>
            </div>

            <TaskList
              tasks={tasks}
              onRefresh={load}
              onUpdate={handleUpdate}
              onDelete={(id: number, title: string) => handleDeleteRequest(id, title)}
              onEdit={handleEditRequest}
            />
            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg">
                {error}
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Modal para nova tarefa */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Nova Tarefa">
        <TaskForm onCreate={handleCreate} onClose={() => setIsModalOpen(false)} />
      </Modal>

      {/* Modal para editar tarefa */}
      {editTask && (
        <Modal isOpen={!!editTask} onClose={() => setEditTask(null)} title="Editar Tarefa">
          <TaskEditForm task={editTask} onUpdate={handleEditTask} onClose={() => setEditTask(null)} />
        </Modal>
      )}

      {/* Modal de confirmação de exclusão */}
      <ConfirmDialog
        isOpen={deleteConfirm.isOpen}
        onClose={() => setDeleteConfirm({ isOpen: false, taskId: null, taskTitle: "" })}
        onConfirm={handleDelete}
        title="Confirmar Exclusão"
        message={`Tem certeza que deseja excluir a tarefa "${deleteConfirm.taskTitle}"? Esta ação não pode ser desfeita.`}
        confirmText="Excluir"
        cancelText="Cancelar"
      />
    </div>
  );
}
