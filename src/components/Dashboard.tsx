import React, { useEffect } from 'react';
import { Video, Image, MessageSquare, Wand2, ArrowRight, Globe, Shield, Cpu, Code, Layers, Sparkles } from 'lucide-react';
import type { Template } from '../api';

interface DashboardProps {
  templates: Template[];
  onSelectTemplate: (t: Template) => void;
  onOpenConverter: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ templates, onSelectTemplate, onOpenConverter }) => {

  useEffect(() => {
     // Dynamic Title for SEO
     document.title = "JSON Prompt Generator | Build Veo, Sora & Midjourney Prompts";
     
     // Meta Description Injection (if not exists)
     let meta = document.querySelector('meta[name="description"]');
     if (!meta) {
         meta = document.createElement('meta');
         meta.setAttribute('name', 'description');
         document.head.appendChild(meta);
     }
     meta.setAttribute('content', 'Free AI Prompt Generator for Veo 3, Sora, Midjourney, and GPT-4. Convert text to JSON, optimize prompts, and standardize your AI workflows.');
  }, []);
  
  const getIcon = (name: string) => {
    if (name.includes('Veo') || name.includes('Sora')) return <Video size={32} className="text-purple-400 group-hover:animate-pulse" />;
    if (name.includes('Image')) return <Image size={32} className="text-pink-400 group-hover:rotate-12 transition-transform" />;
    if (name.includes('General')) return <MessageSquare size={32} className="text-blue-400 group-hover:scale-110 transition-transform" />;
    return <Code size={32} className="text-emerald-400" />;
  };

  const getGradient = (name: string) => {
    if (name.includes('Veo') || name.includes('Sora')) return 'from-purple-900/40 via-slate-900 to-purple-900/10 border-purple-500/20 hover:border-purple-500/50 hover:shadow-purple-900/20';
    if (name.includes('Image')) return 'from-pink-900/40 via-slate-900 to-pink-900/10 border-pink-500/20 hover:border-pink-500/50 hover:shadow-pink-900/20';
    if (name.includes('General')) return 'from-blue-900/40 via-slate-900 to-blue-900/10 border-blue-500/20 hover:border-blue-500/50 hover:shadow-blue-900/20';
    return 'from-slate-800 via-slate-900 to-slate-800 border-slate-700 hover:border-slate-500';
  };

  return (
    <div className="min-h-full bg-slate-950 text-slate-200">
      
      {/* 1. Hero Section - Catchy & Powerful */}
      <section className="relative pt-24 pb-32 px-6 overflow-hidden">
         {/* CSS-only Background Gradients (High Performance) */}
         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none"></div>
         <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none"></div>

         <div className="max-w-6xl mx-auto text-center relative z-10">
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm text-slate-300 text-sm font-semibold mb-8 animate-fade-in-up">
                <Sparkles size={14} className="text-yellow-400" />
                <span>v2.0: Now with Veo 3 & Sora Support</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-8 tracking-tight leading-tight">
               The Operating System for <br/>
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 animate-gradient-x">Structured AI Prompting</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-400 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
               Stop wrestling with random text. Build, validate, and optimize JSON prompts for the world's most advanced AI models. 
               <span className="text-slate-300 font-medium"> Zero code required.</span>
            </p>

            <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6">
                <button 
                   onClick={onOpenConverter}
                   className="px-8 py-4 rounded-xl bg-white text-slate-900 font-bold text-lg hover:bg-slate-100 transition-all shadow-xl shadow-white/10 hover:scale-105 flex items-center"
                >
                   <Wand2 size={20} className="mr-2" />
                   AI Text-to-JSON
                </button>
                <button 
                   onClick={() => document.getElementById('tools-grid')?.scrollIntoView({ behavior: 'smooth' })}
                   className="px-8 py-4 rounded-xl bg-slate-800/50 text-white font-bold text-lg border border-slate-700 hover:bg-slate-800 transition-all hover:scale-105"
                >
                   Browse Templates
                </button>
            </div>
         </div>
      </section>

      {/* 2. Stats / Trust Signals */}
      <section className="border-y border-slate-800 bg-slate-900/50 py-12">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                  <div className="text-3xl font-bold text-white mb-1">100%</div>
                  <div className="text-sm text-slate-500 uppercase tracking-wider">Client-Side Secure</div>
              </div>
              <div>
                  <div className="text-3xl font-bold text-white mb-1">Veo 3</div>
                  <div className="text-sm text-slate-500 uppercase tracking-wider">Optimized Support</div>
              </div>
              <div>
                  <div className="text-3xl font-bold text-white mb-1">0ms</div>
                  <div className="text-sm text-slate-500 uppercase tracking-wider">Latency</div>
              </div>
              <div>
                  <div className="text-3xl font-bold text-white mb-1">JSON</div>
                  <div className="text-sm text-slate-500 uppercase tracking-wider">Valid Syntax</div>
              </div>
          </div>
      </section>

      {/* 3. The Tool Grid */}
      <section id="tools-grid" className="py-24 px-6 relative z-10">
         <div className="max-w-7xl mx-auto">
             <div className="text-center mb-16">
                 <h2 className="text-3xl font-bold text-white mb-4">Choose Your Architect</h2>
                 <p className="text-slate-400">Select a specialized model to begin building your prompt.</p>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {templates.map(t => (
                  <button 
                    key={t.id}
                    onClick={() => onSelectTemplate(t)}
                    className={`group relative p-8 rounded-3xl border text-left transition-all duration-300 bg-gradient-to-br ${getGradient(t.name)}`}
                  >
                    <div className="mb-6 p-4 bg-slate-950/40 rounded-2xl w-fit backdrop-blur-md shadow-inner">
                       {getIcon(t.name)}
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-400 transition-all">{t.name}</h3>
                    <p className="text-slate-400 text-sm mb-6 leading-relaxed line-clamp-2">{t.description}</p>
                    <div className="flex items-center text-sm font-semibold text-white/60 group-hover:text-white transition-colors">
                      <span>Launch Builder</span>
                      <ArrowRight size={16} className="ml-2 transform group-hover:translate-x-2 transition-transform" />
                    </div>
                  </button>
                ))}

                {/* Converter Card */}
                <button 
                    onClick={onOpenConverter}
                    className="group relative p-8 rounded-3xl border border-emerald-500/20 hover:border-emerald-500/50 text-left transition-all duration-300 bg-gradient-to-br from-emerald-900/40 via-slate-900 to-emerald-900/10 hover:shadow-emerald-900/20"
                  >
                    <div className="mb-6 p-4 bg-slate-950/40 rounded-2xl w-fit backdrop-blur-md shadow-inner">
                       <Wand2 size={32} className="text-emerald-400 group-hover:rotate-90 transition-transform duration-500" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">AI Text-to-JSON</h3>
                    <p className="text-slate-400 text-sm mb-6 leading-relaxed">Paste raw text and let our NLP engine structure it into perfect JSON automatically.</p>
                    <div className="flex items-center text-sm font-semibold text-white/60 group-hover:text-white transition-colors">
                      <span>Open Converter</span>
                      <ArrowRight size={16} className="ml-2 transform group-hover:translate-x-2 transition-transform" />
                    </div>
                </button>
             </div>
         </div>
      </section>

      {/* 4. How It Works (SEO Content) */}
      <section className="py-24 px-6 bg-slate-900/30 border-t border-slate-800">
         <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
             <div>
                 <h2 className="text-4xl font-bold text-white mb-6">Why Structured Prompting?</h2>
                 <div className="space-y-6">
                     <div className="flex">
                         <div className="flex-shrink-0 mt-1 mr-4 text-blue-400"><Layers /></div>
                         <div>
                             <h3 className="text-xl font-bold text-white mb-2">Eliminate Context Bleed</h3>
                             <p className="text-slate-400">Text prompts often confuse models. JSON separates "Style" from "Subject", ensuring your parameters are respected.</p>
                         </div>
                     </div>
                     <div className="flex">
                         <div className="flex-shrink-0 mt-1 mr-4 text-purple-400"><Cpu /></div>
                         <div>
                             <h3 className="text-xl font-bold text-white mb-2">Native API Format</h3>
                             <p className="text-slate-400">Models like Veo, Sora, and Gemini Pro via Vertex AI expect JSON payloads. Build prompts that are production-ready.</p>
                         </div>
                     </div>
                     <div className="flex">
                         <div className="flex-shrink-0 mt-1 mr-4 text-pink-400"><Shield /></div>
                         <div>
                             <h3 className="text-xl font-bold text-white mb-2">Repeatable Results</h3>
                             <p className="text-slate-400">Save your templates. Run the exact same prompt structure 1,000 times with consistent output quality.</p>
                         </div>
                     </div>
                 </div>
             </div>
             
             {/* Visual representation of JSON code */}
             <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 font-mono text-sm shadow-2xl relative overflow-hidden group">
                 <div className="absolute top-0 right-0 p-4 opacity-50"><Code /></div>
                 <div className="text-slate-500 mb-2">// Example Output</div>
                 <div className="space-y-1">
                     <div className="text-blue-400">{"{"}</div>
                     <div className="pl-4 text-purple-400">"model"<span className="text-white">:</span> <span className="text-green-400">"veo-3-pro"</span>,</div>
                     <div className="pl-4 text-purple-400">"parameters"<span className="text-white">:</span> {"{"}</div>
                     <div className="pl-8 text-purple-400">"fps"<span className="text-white">:</span> <span className="text-yellow-400">24</span>,</div>
                     <div className="pl-8 text-purple-400">"camera"<span className="text-white">:</span> <span className="text-green-400">"truck_left"</span></div>
                     <div className="pl-4 text-purple-400">{"}"}</div>
                     <div className="text-blue-400">{"}"}</div>
                 </div>
                 {/* Decorative glow */}
                 <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-blue-600/20 blur-[60px] group-hover:bg-blue-600/30 transition-colors"></div>
             </div>
         </div>
      </section>

      {/* 5. GEO & SEO Footer Block */}
      <footer className="bg-slate-950 pt-20 pb-12 border-t border-slate-900">
          <div className="max-w-7xl mx-auto px-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                  <div className="col-span-1 md:col-span-2">
                      <h3 className="text-2xl font-bold text-white mb-4">JSON Prompt Generator</h3>
                      <p className="text-slate-500 leading-relaxed max-w-sm">
                          The world's leading open-source tool for structured AI interaction. Optimized for US, UK, Canada, and global creative professionals.
                      </p>
                  </div>
                  <div>
                      <h4 className="text-white font-bold mb-4">Tools</h4>
                      <ul className="space-y-2 text-slate-500 text-sm">
                          <li><button onClick={() => onSelectTemplate(templates[0])} className="hover:text-white">Veo 3 Generator</button></li>
                          <li><button onClick={onOpenConverter} className="hover:text-white">Text Converter</button></li>
                          <li><a href="#" className="hover:text-white">API Docs</a></li>
                      </ul>
                  </div>
                  <div>
                      <h4 className="text-white font-bold mb-4">Legal</h4>
                      <ul className="space-y-2 text-slate-500 text-sm">
                          <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                          <li><a href="#" className="hover:text-white">Terms of Use</a></li>
                          <li><a href="#" className="hover:text-white">Cookie Preferences</a></li>
                      </ul>
                  </div>
              </div>
              
              <div className="border-t border-slate-900 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-600">
                  <p>© 2025 JSON Prompt Generator. Built for the AI Community.</p>
                  <div className="flex space-x-4 mt-4 md:mt-0 items-center">
                      <Globe size={12} />
                      <span>Global CDN Optimized</span>
                  </div>
              </div>
          </div>
      </footer>

    </div>
  );
};

export default Dashboard;