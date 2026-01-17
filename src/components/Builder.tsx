import React, { useState } from 'react';
import { Save, Copy, Download, Trash2, Plus } from 'lucide-react';
import { savePrompt } from '../api';
import type { Template } from '../api';

interface BuilderProps {
  template: Template | null;
  data: any;
  setData: (data: any) => void;
  onSave: () => void;
}

const Builder: React.FC<BuilderProps> = ({ template, data, setData, onSave }) => {
  const [copyFeedback, setCopyFeedback] = useState(false);

  const handleSave = async () => {
    if (!template) return;
    try {
      await savePrompt({
        template_id: template.id,
        prompt_data: data,
        plain_text: JSON.stringify(data, null, 2)
      });
      onSave();
      alert('Prompt saved successfully!');
    } catch (e) {
      alert('Failed to save prompt');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(data, null, 2));
    setCopyFeedback(true);
    setTimeout(() => setCopyFeedback(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `prompt-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const updateField = (path: string[], value: any) => {
    const newData = JSON.parse(JSON.stringify(data)); // Deep clone
    let current = newData;
    for (let i = 0; i < path.length - 1; i++) {
      current = current[path[i]];
    }
    current[path[path.length - 1]] = value;
    setData(newData);
  };

  // Recursive Field Renderer
  const renderField = (key: string, value: any, path: string[]) => {
    const currentPath = [...path, key];
    const fieldName = key.toLowerCase();
    
    // Rich Field Definitions (Pseudo-Schema)
    const optionsMap: Record<string, string[]> = {
      visual_style: ["Cinematic", "Photorealistic", "3D Animation", "Anime", "Vintage Film", "Noir", "Cyberpunk", "Fantasy Art"],
      motion_strength: ["Low", "Medium", "High", "Ultra-High"],
      camera_type: ["Drone", "Handheld", "Steadicam", "Gimbal", "Crane", "GoPro"],
      hdr_mode: ["Enabled", "Disabled"],
      fps: ["24", "30", "60", "120"],
      camera_angle: ["Wide Angle", "Close-up", "Extreme Close-up", "Low Angle", "High Angle", "Aerial View", "Dutch Angle"],
      tone: ["Professional", "Friendly", "Academic", "Sarcastic", "Direct", "Empathetic"],
      methodology: ["Chain of Thought", "Tree of Thoughts", "Socratic Method", "Step-by-Step", "Direct Answer"],
      format: ["Markdown", "JSON", "HTML", "Plain Text", "YAML", "Code Block"],
      model_preference: ["GPT-4", "GPT-3.5", "Claude 3 Opus", "Claude 3 Sonnet", "Gemini Pro", "Llama 3"],
      temperature: ["0", "0.5", "0.7", "1.0"]
    };

    if (Array.isArray(value)) {
      return (
        <div key={key} className="mb-4 p-4 border border-slate-700 rounded-lg bg-slate-800/50">
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-semibold text-slate-400 capitalize">{key.replace(/_/g, ' ')}</label>
            <button 
              onClick={() => {
                // Determine item type based on existing items or default to string
                const newItem = value.length > 0 && typeof value[0] === 'object' 
                  ? Object.keys(value[0]).reduce((acc, k) => ({...acc, [k]: ""}), {}) 
                  : "";
                updateField(currentPath, [...value, newItem])
              }}
              className="text-xs text-blue-400 hover:text-blue-300 flex items-center space-x-1"
            >
              <Plus size={12} /> <span>Add Item</span>
            </button>
          </div>
          <div className="space-y-3">
            {value.map((item: any, idx: number) => (
              <div key={idx} className="flex items-start space-x-2 p-2 bg-slate-900/50 rounded border border-slate-800">
                {typeof item === 'object' && item !== null ? (
                   <div className="flex-1 space-y-2">
                      {Object.entries(item).map(([subKey, subVal]) => (
                        <div key={subKey}>
                           <label className="text-[10px] text-slate-500 uppercase">{subKey}</label>
                           <input 
                              value={subVal as string}
                              onChange={(e) => {
                                 const newArr = JSON.parse(JSON.stringify(value));
                                 newArr[idx][subKey] = e.target.value;
                                 updateField(currentPath, newArr);
                              }}
                              className="w-full bg-slate-800 border border-slate-700 rounded px-2 py-1 text-xs focus:ring-1 focus:ring-blue-500 outline-none"
                           />
                        </div>
                      ))}
                   </div>
                ) : (
                    <input
                      type="text"
                      value={item}
                      onChange={(e) => {
                        const newArr = [...value];
                        newArr[idx] = e.target.value;
                        updateField(currentPath, newArr);
                      }}
                      className="flex-1 bg-slate-800 border border-slate-700 rounded px-3 py-2 text-sm focus:ring-1 focus:ring-blue-500 outline-none"
                    />
                )}
                <button 
                   onClick={() => {
                     const newArr = value.filter((_, i) => i !== idx);
                     updateField(currentPath, newArr);
                   }}
                   className="text-slate-500 hover:text-red-400 p-1"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      );
    } else if (typeof value === 'object' && value !== null) {
      return (
        <div key={key} className="mb-4 pl-4 border-l-2 border-slate-700">
          <label className="text-sm font-semibold text-slate-400 capitalize block mb-2">{key.replace(/_/g, ' ')}</label>
          {Object.entries(value).map(([k, v]) => renderField(k, v, currentPath))}
        </div>
      );
    } else {
      // String / Number / Boolean
      const isLongText = typeof value === 'string' && value.length > 50;
      const hasOptions = optionsMap[fieldName];

      return (
        <div key={key} className="mb-4">
          <label className="block text-xs font-medium text-slate-500 uppercase tracking-wide mb-1.5">{key.replace(/_/g, ' ')}</label>
          
          {hasOptions ? (
             <div className="relative">
                <select
                  value={value}
                  onChange={(e) => updateField(currentPath, e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-sm text-slate-200 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none appearance-none cursor-pointer"
                >
                  <option value="" disabled>Select {key.replace(/_/g, ' ')}</option>
                  {hasOptions.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
             </div>
          ) : key === 'description' || key === 'context' || key === 'task' || key === 'prompt' || isLongText ? (
            <textarea
              value={value}
              onChange={(e) => updateField(currentPath, e.target.value)}
              rows={3}
              className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-sm text-slate-200 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none resize-y"
            />
          ) : (
            <input
              type="text"
              value={value}
              onChange={(e) => updateField(currentPath, e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-sm text-slate-200 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          )}
        </div>
      );
    }
  };

  return (
    <div className="flex h-full space-x-6">
      <div className="flex-1 overflow-y-auto pr-2">
        <div className="bg-slate-900 rounded-xl border border-slate-800 p-6 shadow-xl">
            <div className="flex justify-between items-center mb-6">
               <div>
                  <h2 className="text-lg font-bold text-white">{template?.name || "Untitled"}</h2>
                  <p className="text-sm text-slate-500">{template?.description}</p>
               </div>
               <div className="flex space-x-2">
                 <button onClick={handleSave} className="p-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white transition-colors">
                    <Save size={18} />
                 </button>
               </div>
            </div>
            
            <div className="space-y-1">
               {data && Object.entries(data).map(([key, value]) => renderField(key, value, []))}
            </div>
        </div>
      </div>

      <div className="w-1/3 flex flex-col h-full bg-slate-950 rounded-xl border border-slate-800 overflow-hidden shadow-2xl">
        <div className="bg-slate-900 px-4 py-3 border-b border-slate-800 flex justify-between items-center">
           <span className="text-xs font-semibold text-slate-400 uppercase">JSON Preview</span>
           <div className="flex space-x-2">
              <button onClick={handleCopy} className="text-slate-400 hover:text-white transition-colors" title="Copy to Clipboard">
                 {copyFeedback ? <span className="text-green-400 text-xs font-bold">Copied!</span> : <Copy size={14} />}
              </button>
              <button onClick={handleDownload} className="text-slate-400 hover:text-white transition-colors" title="Download">
                 <Download size={14} />
              </button>
           </div>
        </div>
        <div className="flex-1 overflow-auto p-4">
           <pre className="text-xs text-green-400 font-mono leading-relaxed whitespace-pre-wrap">
             {JSON.stringify(data, null, 2)}
           </pre>
        </div>
      </div>
    </div>
  );
};

export default Builder;