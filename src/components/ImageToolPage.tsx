import React, { useEffect, useState } from 'react';
import Builder from './Builder';
import { getTemplates } from '../api';
import type { Template } from '../api';
import { Palette, Image as ImageIcon, Layers, Zap, ArrowRight, LayoutTemplate } from 'lucide-react';

const ImageToolPage: React.FC = () => {
  const [template, setTemplate] = useState<Template | null>(null);
  const [data, setData] = useState<any>({});

  useEffect(() => {
    document.title = "Midjourney JSON Prompt Generator | Image AI Tools";
    
    // SEO Meta Tags
    const updateMeta = (name: string, content: string) => {
      let element = document.querySelector(`meta[name="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute('name', name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    updateMeta('description', 'Generate precise Midjourney prompts with structured JSON. Control aspect ratios, stylize values, and artistic styles.');
    updateMeta('robots', 'noindex'); 

    const loadTemplate = async () => {
        const templates = await getTemplates();
        const found = templates.find((t: Template) => t.name.includes("Image Gen"));
        if (found) {
            setTemplate(found);
            setData(found.json_structure);
        }
    };
    loadTemplate();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 font-sans selection:bg-pink-500/30">
      
      {/* Hero Section */}
      <header className="relative pt-24 pb-32 px-6 overflow-hidden border-b border-pink-900/20">
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-pink-900/20 via-slate-950 to-slate-950 pointer-events-none"></div>
         <div className="max-w-5xl mx-auto text-center relative z-10">
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-300 text-sm font-semibold uppercase tracking-wider mb-8">
                <Palette size={14} />
                <span>Midjourney v6 Optimized</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-8 tracking-tight leading-tight">
               Midjourney <br/>
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400">JSON Architect</span>
            </h1>
            <p className="text-xl text-slate-400 mb-10 max-w-3xl mx-auto leading-relaxed font-light">
               Stop guessing parameters. Construct complex, multi-layered image prompts with precise control over aspect ratios, chaos, stylize values, and artistic references.
            </p>
         </div>
      </header>

      {/* Tool Container */}
      <section className="px-4 -mt-20 relative z-20 pb-24">
         <div className="max-w-[1400px] mx-auto bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-3xl shadow-2xl shadow-pink-900/20 overflow-hidden ring-1 ring-white/10">
             <div className="h-1 bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600"></div>
             <div className="h-[850px] flex flex-col"> 
                 {template ? (
                     <Builder 
                        template={template} 
                        data={data} 
                        setData={setData} 
                        onSave={() => alert("Prompt Saved to Local Database")} 
                     />
                 ) : (
                     <div className="flex-1 flex flex-col items-center justify-center space-y-4">
                        <div className="w-12 h-12 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
                        <span className="text-pink-300 font-mono text-sm animate-pulse">Loading Image Parameters...</span>
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
                     <ImageIcon className="mr-3 text-pink-400" />
                     Why Structured Image Prompts?
                  </h2>
                  <div className="prose prose-invert max-w-none text-slate-300 leading-relaxed">
                      <p>
                        Midjourney and Stable Diffusion models are notoriously sensitive to token order. A "Subject" described at the end of a prompt often gets ignored. 
                        <strong> Structured JSON Prompting</strong> forces you to prioritize the Subject, Style, and Parameters in the correct hierarchy.
                      </p>
                  </div>
              </section>

              {/* Parameter Guide */}
              <section className="space-y-8">
                  <h2 className="text-3xl font-bold text-white">Parameter Mastery</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-xl">
                          <h3 className="text-lg font-bold text-pink-400 mb-3 flex items-center">
                              <LayoutTemplate className="mr-2" size={18} /> Aspect Ratios (--ar)
                          </h3>
                          <ul className="space-y-3 text-sm text-slate-400">
                              <li className="flex justify-between"><span className="text-white font-mono">16:9</span> <span>Cinematic Landscapes</span></li>
                              <li className="flex justify-between"><span className="text-white font-mono">9:16</span> <span>Social Media / Stories</span></li>
                              <li className="flex justify-between"><span className="text-white font-mono">2:3</span> <span>Classic Portraiture</span></li>
                              <li className="flex justify-between"><span className="text-white font-mono">21:9</span> <span>Ultra-Wide Cinema</span></li>
                          </ul>
                      </div>
                      
                      <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-xl">
                          <h3 className="text-lg font-bold text-purple-400 mb-3 flex items-center">
                              <Zap className="mr-2" size={18} /> Stylize & Chaos
                          </h3>
                          <ul className="space-y-3 text-sm text-slate-400">
                              <li className="flex justify-between">
                                 <span className="text-white font-mono">--s 0-1000</span> 
                                 <span>How artistic vs literal?</span>
                              </li>
                              <li className="flex justify-between">
                                 <span className="text-white font-mono">--c 0-100</span> 
                                 <span>Variation & unpredictability</span>
                              </li>
                              <li className="flex justify-between">
                                 <span className="text-white font-mono">--w 0-3000</span> 
                                 <span>"Weirdness" factor</span>
                              </li>
                          </ul>
                      </div>
                  </div>
              </section>

              {/* Style Guide */}
              <section className="space-y-6">
                  <h2 className="text-3xl font-bold text-white flex items-center">
                      <Layers className="mr-3 text-indigo-400" />
                      Popular Style Keywords
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {["Cyberpunk", "Synthwave", "Ukiyo-e", "Oil Painting", "Unreal Engine 5", "Isometric", "Risograph", "Double Exposure"].map(style => (
                          <div key={style} className="bg-slate-900 border border-slate-800 p-4 rounded-lg text-center text-sm font-medium text-slate-300 hover:text-white hover:border-pink-500/50 transition-colors cursor-pointer">
                              {style}
                          </div>
                      ))}
                  </div>
              </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-8">
              <div className="sticky top-8 space-y-8">
                  
                  {/* Quick Copy */}
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                      <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Essential Negatives</h3>
                      <div className="space-y-2">
                          {["blurry, low res, bad anatomy", "extra fingers, missing limbs", "watermark, text, signature", "cropped, out of frame"].map((text, i) => (
                              <button 
                                key={i}
                                onClick={() => navigator.clipboard.writeText(text)}
                                className="w-full text-left text-xs font-mono text-pink-300 bg-pink-900/20 hover:bg-pink-900/30 p-3 rounded border border-pink-900/30 transition-colors flex justify-between group"
                              >
                                  <span className="truncate mr-2">{text}</span>
                                  <span className="opacity-0 group-hover:opacity-100">COPY</span>
                              </button>
                          ))}
                      </div>
                  </div>

                  {/* FAQ */}
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                      <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Quick Tips</h3>
                      <div className="space-y-6">
                          <div>
                              <h4 className="text-white font-bold text-sm mb-1">Subject First</h4>
                              <p className="text-slate-400 text-xs leading-relaxed">Always describe your main subject at the very beginning of the prompt array.</p>
                          </div>
                          <div>
                              <h4 className="text-white font-bold text-sm mb-1">Lighting Matters</h4>
                              <p className="text-slate-400 text-xs leading-relaxed">"Volumetric lighting", "Rembrandt lighting", and "Bioluminescence" drastically change the mood.</p>
                          </div>
                      </div>
                  </div>

                  {/* CTA */}
                  <div className="bg-gradient-to-br from-pink-900/50 to-purple-900/50 border border-pink-500/30 rounded-2xl p-6 relative overflow-hidden">
                      <div className="relative z-10">
                          <h3 className="text-white font-bold mb-2">Start Creating</h3>
                          <p className="text-pink-200 text-sm mb-4">Build your first masterpiece now.</p>
                          <button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="inline-flex items-center bg-white text-pink-900 px-4 py-2 rounded-lg text-sm font-bold hover:bg-pink-50 transition-colors">
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

export default ImageToolPage;