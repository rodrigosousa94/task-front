import React, { useState } from "react";

export default function TaskForm({ onCreate, onClose }: { onCreate: (title: string, description?: string) => void; onClose: () => void }) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return alert("Título é obrigatório");
    try {
      setSubmitting(true);
      await onCreate(title.trim(), desc.trim());
      setTitle("");
      setDesc("");
      onClose();
    } finally { setSubmitting(false); }
  };

  return (
    <form onSubmit={submit} className="space-y-3 sm:space-y-4">
      <div>
        <label className="block text-xs sm:text-sm font-medium text-slate-300 mb-1.5 sm:mb-2">Título *</label>
        <input 
          value={title} 
          onChange={e=>setTitle(e.target.value)} 
          placeholder="Digite o título da tarefa" 
          className="w-full p-2.5 sm:p-3 rounded-lg bg-slate-800/50 border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all text-sm sm:text-base" 
        />
      </div>
      
      <div>
        <label className="block text-xs sm:text-sm font-medium text-slate-300 mb-1.5 sm:mb-2">Descrição</label>
        <textarea 
          value={desc} 
          onChange={e=>setDesc(e.target.value)} 
          placeholder="Descrição da tarefa (opcional)" 
          rows={4} 
          className="w-full p-2.5 sm:p-3 rounded-lg bg-slate-800/50 border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all resize-none text-sm sm:text-base" 
        />
      </div>
      
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-2">
        <button 
          type="button"
          onClick={onClose}
          className="w-full sm:flex-1 px-4 py-2.5 sm:py-3 bg-slate-700/50 hover:bg-slate-700 text-white rounded-lg font-medium transition-all border border-slate-600 hover:border-slate-500 text-sm sm:text-base"
        >
          Cancelar
        </button>
        <button 
          type="submit" 
          disabled={submitting} 
          className="w-full sm:flex-1 px-4 py-2.5 sm:py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white rounded-lg font-medium shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
        >
          {submitting ? "Salvando..." : "Criar Tarefa"}
        </button>
      </div>
    </form>
  );
}
