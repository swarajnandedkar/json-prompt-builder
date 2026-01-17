import React from 'react';
import { Layout, Clock, Plus, Database } from 'lucide-react';
import type { Template, Prompt } from '../api';

interface SidebarProps {
  templates: Template[];
  recentPrompts: Prompt[];
  onSelectTemplate: (t: Template) => void;
  onLoadPrompt: (p: Prompt) => void;
  onNewPrompt: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ templates, recentPrompts, onSelectTemplate, onLoadPrompt, onNewPrompt }) => {
  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-700 flex flex-col h-full">
      <div className="p-4">
        <button 
          onClick={onNewPrompt}
          className="w-full flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors font-medium shadow-lg shadow-blue-900/20"
        >
          <Plus size={18} />
          <span>New Prompt</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-2 space-y-6">
        <div>
          <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 px-2">Templates</h3>
          <div className="space-y-1">
            {templates.map(t => (
              <button 
                key={t.id}
                onClick={() => onSelectTemplate(t)}
                className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-slate-300 rounded-md hover:bg-slate-800 transition-colors text-left group"
              >
                <Layout size={16} className="text-slate-500 group-hover:text-blue-400" />
                <span className="truncate">{t.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 px-2">Recent Prompts</h3>
          <div className="space-y-1">
            {recentPrompts.map(p => (
              <button 
                key={p.id}
                onClick={() => onLoadPrompt(p)}
                className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-slate-300 rounded-md hover:bg-slate-800 transition-colors text-left group"
              >
                <Clock size={16} className="text-slate-500 group-hover:text-purple-400" />
                <span className="truncate">Prompt #{p.id}</span>
              </button>
            ))}
            {recentPrompts.length === 0 && (
              <div className="px-3 py-2 text-sm text-slate-600 italic">No saved prompts yet</div>
            )}
          </div>
        </div>
      </div>
      
      <div className="p-4 border-t border-slate-800">
         <div className="flex items-center space-x-2 text-xs text-slate-500">
            <Database size={12} />
            <span>Local SQLite Database</span>
         </div>
      </div>
    </aside>
  );
};

export default Sidebar;