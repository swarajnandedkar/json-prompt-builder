import React, { useEffect, useState } from 'react';
import Builder from './Builder';
import { getTemplates } from '../api';
import type { Template } from '../api';
import { Brain, MessageSquare, GitBranch, ArrowRight, Shield, Cpu } from 'lucide-react';

const GeneralToolPage: React.FC = () => {
  const [template, setTemplate] = useState<Template | null>(null);
  const [data, setData] = useState<any>({});

  useEffect(() => {
    document.title = "Advanced LLM Prompt Generator | GPT-4 & Claude Tools";
    
    const updateMeta = (name: string, content: string) => {
      let element = document.querySelector(`meta[name="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute('name', name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    updateMeta('description', 'Engineer complex system prompts for GPT-4, Claude 3, and Gemini. Define personas, chain-of-thought steps, and output constraints.');
    updateMeta('robots', 'noindex'); 

    const loadTemplate = async () => {
        const templates = await getTemplates();
        const found = templates.find((t: Template) => t.name.includes("General AI"));
        if (found) {
            setTemplate(found);
            setData(found.json_structure);
        }
    };
    loadTemplate();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 font-sans selection:bg-blue-500/30">
      
      {/* Hero Section */}
      <header className="relative pt-24 pb-32 px-6 overflow-hidden border-b border-blue-900/20">
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-950 to-slate-950 pointer-events-none"></div>
         <div className="max-w-5xl mx-auto text-center relative z-10">
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-sm font-semibold uppercase tracking-wider mb-8">
                <Brain size={14} />
                <span>LLM Engineering Suite</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-8 tracking-tight leading-tight">
               Advanced AI <br/>
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400">System Architect</span>
            </h1>
            <p className="text-xl text-slate-400 mb-10 max-w-3xl mx-auto leading-relaxed font-light">
               Move beyond simple chats. Design robust system prompts with defined Personas, Chain-of-Thought reasoning, and Few-Shot examples to minimize hallucinations.
            </p>
         </div>
      </header>

      {/* Tool Container */}
      <section className="px-4 -mt-20 relative z-20 pb-24">
         <div className="max-w-[1400px] mx-auto bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-3xl shadow-2xl shadow-blue-900/20 overflow-hidden ring-1 ring-white/10">
             <div className="h-1 bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600"></div>
             <div className="h-[850px] flex flex-col"> 
                 {template ? (
                     <Builder 
                        template={template} 
                        data={data} 
                        setData={setData} 
                        onSave={() => alert("System Prompt Saved")} 
                     />
                 ) : (
                     <div className="flex-1 flex flex-col items-center justify-center space-y-4">
                        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                        <span className="text-blue-300 font-mono text-sm animate-pulse">Loading System Context...</span>
                     </div>
                 )}
             </div>
         </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          <div className="lg:col-span-8 space-y-20">
              
              {/* Intro */}
              <section className="space-y-6">
                  <h2 className="text-3xl font-bold text-white flex items-center">
                     <Cpu className="mr-3 text-blue-400" />
                     The Power of System Prompts
                  </h2>
                  <div className="prose prose-invert max-w-none text-slate-300 leading-relaxed">
                      <p>
                        A <strong>System Prompt</strong> sets the "laws of physics" for an LLM conversation. Unlike a user message, the system prompt persists throughout the session, defining the AI's personality, constraints, and operational logic.
                      </p>
                      <p>
                        Using a JSON structure for system prompts allows you to modularize instructions (e.g., separating "Tone" from "Task"), reducing the likelihood of the model "forgetting" instructions during long context windows.
                      </p>
                  </div>
              </section>

              {/* Advanced Techniques */}
              <section className="space-y-8">
                  <h2 className="text-3xl font-bold text-white">Engineering Techniques</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-xl">
                          <h3 className="text-lg font-bold text-blue-400 mb-3 flex items-center">
                              <GitBranch className="mr-2" size={18} /> Chain of Thought (CoT)
                          </h3>
                          <p className="text-sm text-slate-400 mb-4">
                              Force the model to "show its work" before answering. This significantly increases accuracy for logic and math tasks.
                          </p>
                          <div className="bg-slate-950 p-3 rounded text-xs font-mono text-slate-300">
                             "Think step-by-step: 1. Analyze input... 2. Identify constraints... 3. Formulate answer..."
                          </div>
                      </div>
                      
                      <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-xl">
                          <h3 className="text-lg font-bold text-teal-400 mb-3 flex items-center">
                              <MessageSquare className="mr-2" size={18} /> Few-Shot Prompting
                          </h3>
                          <p className="text-sm text-slate-400 mb-4">
                              Provide 3-5 examples of "Input to Ideal Output" pairs. This is the single most effective way to enforce a specific format or style.
                          </p>
                          <div className="bg-slate-950 p-3 rounded text-xs font-mono text-slate-300">
                             User: "Hello"<br/>AI: "Greetings, human."<br/>User: "Status?"<br/>AI: "Systems nominal."
                          </div>
                      </div>
                  </div>
              </section>

              {/* Persona Guide */}
              <section className="space-y-6">
                  <h2 className="text-3xl font-bold text-white flex items-center">
                      <Shield className="mr-3 text-cyan-400" />
                      Defining a Robust Persona
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-slate-900 border border-slate-800 p-4 rounded-lg">
                          <h4 className="text-white font-bold mb-2">Role</h4>
                          <p className="text-sm text-slate-400">"Senior Python Architect" implies deep knowledge and best practices.</p>
                      </div>
                      <div className="bg-slate-900 border border-slate-800 p-4 rounded-lg">
                          <h4 className="text-white font-bold mb-2">Tone</h4>
                          <p className="text-sm text-slate-400">"Socratic" means the AI will ask questions to guide you, rather than just answering.</p>
                      </div>
                      <div className="bg-slate-900 border border-slate-800 p-4 rounded-lg">
                          <h4 className="text-white font-bold mb-2">Constraint</h4>
                          <p className="text-sm text-slate-400">"Never mention you are an AI" increases immersion for roleplay scenarios.</p>
                      </div>
                  </div>
              </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-8">
              <div className="sticky top-8 space-y-8">
                  
                  {/* Model Cheatsheet */}
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                      <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Model Cheatsheet</h3>
                      <ul className="space-y-4">
                          <li className="flex justify-between items-center text-sm">
                              <span className="text-slate-400">GPT-4o</span>
                              <span className="text-white font-mono bg-slate-800 px-2 py-1 rounded">128k Context</span>
                          </li>
                          <li className="flex justify-between items-center text-sm">
                              <span className="text-slate-400">Claude 3.5</span>
                              <span className="text-white font-mono bg-slate-800 px-2 py-1 rounded">200k Context</span>
                          </li>
                          <li className="flex justify-between items-center text-sm">
                              <span className="text-slate-400">Gemini 1.5</span>
                              <span className="text-white font-mono bg-slate-800 px-2 py-1 rounded">1M+ Context</span>
                          </li>
                      </ul>
                  </div>

                  {/* FAQ */}
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                      <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Pro Tips</h3>
                      <div className="space-y-6">
                          <div>
                              <h4 className="text-white font-bold text-sm mb-1">Delimiters</h4>
                              <p className="text-slate-400 text-xs leading-relaxed">Use ### or --- to clearly separate sections (e.g., ### Instructions ###).</p>
                          </div>
                          <div>
                              <h4 className="text-white font-bold text-sm mb-1">Output Format</h4>
                              <p className="text-slate-400 text-xs leading-relaxed">Always specify if you want Markdown, JSON, or Python code explicitly.</p>
                          </div>
                      </div>
                  </div>

                  {/* CTA */}
                  <div className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 border border-blue-500/30 rounded-2xl p-6 relative overflow-hidden">
                      <div className="relative z-10">
                          <h3 className="text-white font-bold mb-2">Engineer Intelligence</h3>
                          <p className="text-blue-200 text-sm mb-4">Build your system prompt now.</p>
                          <button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="inline-flex items-center bg-white text-blue-900 px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-50 transition-colors">
                              Go to Generator <ArrowRight size={14} className="ml-2"/>
                          </button>
                      </div>
                  </div>

              </div>
          </div>

      </div>

      <footer className="py-12 border-t border-slate-900 bg-slate-950 text-center text-slate-600">
          <p className="text-sm">© 2025 JSON Prompt Generator. Local & Secure.</p>
      </footer>
    </div>
  );
};

export default GeneralToolPage;