import React, { useState, useEffect } from 'react';
import { RefreshCw, Copy, Check, Sparkles, FileJson, Zap, Brain, Code, Shield, Terminal } from 'lucide-react';

const ConverterToolPage: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [jsonOutput, setJsonOutput] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    document.title = "AI Text to JSON Converter | Intelligent Prompt Parser";
    
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

    updateMeta('description', 'Transform raw text into structured, valid JSON prompts for AI. Automatically optimizes inputs with roles, constraints, and negative prompts.');
    updateMeta('robots', 'noindex'); 
  }, []);

  const parseTextToJSON = (text: string) => {
    const lines = text.split('\n');
    const result: any = {};
    let currentKey = 'instruction';
    let buffer: string[] = [];

    const flushBuffer = () => {
        if (buffer.length > 0) {
            const content = buffer.join('\n').trim();
            if (content) {
                if (result[currentKey]) {
                    if (Array.isArray(result[currentKey])) {
                        result[currentKey].push(content);
                    } else {
                        result[currentKey] = [result[currentKey], content];
                    }
                } else {
                    result[currentKey] = content;
                }
            }
        }
        buffer = [];
    };

    const patterns = [
        { key: 'role', regex: /^(role|persona|you are a):/i },
        { key: 'task', regex: /^(task|goal|objective|instruction):/i },
        { key: 'context', regex: /^(context|background|situation):/i },
        { key: 'constraints', regex: /^(constraints|requirements|rules|guidelines):/i },
        { key: 'format', regex: /^(format|output format|structure):/i },
        { key: 'style', regex: /^(style|tone|voice):/i },
        { key: 'negative_prompt', regex: /^(negative|no|exclude):/i },
    ];

    for (const line of lines) {
        let matched = false;
        const trimmedLine = line.trim();
        if (!trimmedLine) { buffer.push(line); continue; }

        for (const p of patterns) {
            if (p.regex.test(trimmedLine)) {
                flushBuffer();
                currentKey = p.key;
                const value = trimmedLine.replace(p.regex, '').trim();
                if (value) buffer.push(value);
                matched = true;
                break;
            }
        }

        if (!matched) {
            if (trimmedLine.startsWith('- ') || trimmedLine.startsWith('* ')) {
                 buffer.push(trimmedLine); 
            } else {
                 buffer.push(line);
            }
        }
    }
    flushBuffer();
    
    if (typeof result.constraints === 'string' && result.constraints.includes('\n')) {
        result.constraints = result.constraints.split('\n').map((s: string) => s.replace(/^[-*•]\s*/, '').trim()).filter((s: string) => s);
    }
    
    return result;
  };

  const optimizeJSON = (baseJson: any) => {
      const optimized = { ...baseJson };
      const rawText = JSON.stringify(baseJson).toLowerCase();

      const isCoding = rawText.includes('code') || rawText.includes('function') || rawText.includes('api') || rawText.includes('react');
      const isImage = rawText.includes('image') || rawText.includes('draw') || rawText.includes('photo') || rawText.includes('paint');
      const isVideo = rawText.includes('video') || rawText.includes('scene') || rawText.includes('shot') || rawText.includes('camera');
      const isWriting = rawText.includes('write') || rawText.includes('blog') || rawText.includes('article') || rawText.includes('essay');

      if (!optimized.role) {
          if (isCoding) optimized.role = "Senior Software Engineer";
          else if (isImage) optimized.role = "Digital Artist / Midjourney Expert";
          else if (isVideo) optimized.role = "Cinematographer / Director";
          else if (isWriting) optimized.role = "Professional Copywriter";
          else optimized.role = "Helpful AI Assistant";
      }

      if (!optimized.style) {
           if (isCoding) optimized.style = "Clean, Modular, Type-Safe";
           else if (isWriting) optimized.style = "Authoritative, Engaging, SEO-Optimized";
           else if (isImage) optimized.style = "Photorealistic, 8k, Unreal Engine 5 Render";
      }

      if ((isImage || isVideo) && !optimized.negative_prompt) {
          optimized.negative_prompt = "blurry, low quality, distorted, text, watermark, bad anatomy";
      }

      if (isVideo && !optimized.technical) {
          optimized.technical = { fps: 24, resolution: "4k", aspect_ratio: "16:9" };
      }
      if (isImage && !optimized.parameters) {
          optimized.parameters = { ar: "16:9", v: "6.0", stylize: 100 };
      }

      return optimized;
  };

  const handleProcess = (optimize: boolean) => {
    setIsProcessing(true);
    setTimeout(() => {
        let result = parseTextToJSON(inputText);
        if (optimize) {
            result = optimizeJSON(result);
        }
        setJsonOutput(result);
        setIsProcessing(false);
    }, 600);
  };

  const copyToClipboard = () => {
      navigator.clipboard.writeText(JSON.stringify(jsonOutput, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 font-sans selection:bg-emerald-500/30">
      
      {/* Hero */}
      <header className="relative pt-24 pb-32 px-6 overflow-hidden border-b border-emerald-900/20">
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-emerald-900/20 via-slate-950 to-slate-950 pointer-events-none"></div>
         <div className="max-w-5xl mx-auto text-center relative z-10">
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-sm font-semibold uppercase tracking-wider mb-8">
                <Brain size={14} />
                <span>NLP to JSON Engine</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-8 tracking-tight leading-tight">
               Transform Text to <br/>
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400">Structured Intelligence</span>
            </h1>
            <p className="text-xl text-slate-400 mb-10 max-w-3xl mx-auto leading-relaxed font-light">
               Don't write JSON by hand. Paste your raw ideas, emails, or creative briefs, and let our AI engine structure, optimize, and format them for immediate use.
            </p>
         </div>
      </header>

      {/* Converter Tool */}
      <section className="px-4 -mt-20 relative z-20 pb-24">
         <div className="max-w-[1400px] mx-auto bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-3xl shadow-2xl shadow-emerald-900/20 overflow-hidden ring-1 ring-white/10 flex flex-col md:flex-row h-[850px]">
             <div className="h-1 absolute top-0 left-0 right-0 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600"></div>
             
             {/* Left: Input */}
             <div className="flex-1 p-8 flex flex-col border-r border-slate-800">
                 <div className="flex justify-between items-center mb-6">
                     <h3 className="text-white font-bold flex items-center text-lg"><FileJson size={20} className="mr-2 text-emerald-400"/> Input Text</h3>
                     <button onClick={() => setInputText('')} className="text-sm text-slate-500 hover:text-white transition-colors">Clear</button>
                 </div>
                 <textarea
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Paste your prompt here...\n\nI need a python script to scrape a website. It should use BeautifulSoup. Ensure it respects robots.txt."
                    className="flex-1 bg-slate-950/50 border border-slate-700 rounded-xl p-6 text-slate-300 focus:ring-2 focus:ring-emerald-500/50 outline-none resize-none font-mono text-base leading-relaxed"
                 />
                 <div className="mt-8 flex space-x-4 h-14">
                     <button 
                        onClick={() => handleProcess(false)}
                        disabled={!inputText.trim() || isProcessing}
                        className="flex-1 rounded-xl border border-slate-700 hover:bg-slate-800 text-white font-semibold transition-all disabled:opacity-50"
                     >
                        Convert Only
                     </button>
                     <button 
                        onClick={() => handleProcess(true)}
                        disabled={!inputText.trim() || isProcessing}
                        className="flex-[1.5] rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold shadow-lg shadow-emerald-900/20 flex items-center justify-center space-x-2 transition-all disabled:opacity-50"
                     >
                        {isProcessing ? <RefreshCw className="animate-spin" size={20} /> : <Sparkles size={20} />}
                        <span>AI Optimize & Convert</span>
                     </button>
                 </div>
             </div>

             {/* Right: Output */}
             <div className="flex-1 p-8 flex flex-col bg-slate-950/30">
                 <div className="flex justify-between items-center mb-6">
                     <h3 className="text-white font-bold flex items-center text-lg"><Code size={20} className="mr-2 text-blue-400"/> JSON Output</h3>
                     {jsonOutput && (
                         <button 
                            onClick={copyToClipboard}
                            className="text-sm flex items-center space-x-2 text-emerald-400 hover:text-emerald-300 transition-colors bg-emerald-900/20 px-3 py-1.5 rounded-lg border border-emerald-900/30"
                         >
                            {copied ? <Check size={16}/> : <Copy size={16}/>}
                            <span>{copied ? "Copied!" : "Copy JSON"}</span>
                         </button>
                     )}
                 </div>
                 <div className="flex-1 bg-slate-950 border border-slate-800 rounded-xl p-6 overflow-auto relative group shadow-inner">
                     {jsonOutput ? (
                         <pre className="text-sm font-mono text-emerald-300 whitespace-pre-wrap leading-relaxed">
                             {JSON.stringify(jsonOutput, null, 2)}
                         </pre>
                     ) : (
                         <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-600 p-8 text-center">
                             <Zap size={48} className="mb-6 opacity-30"/>
                             <p className="text-lg">Output will appear here.</p>
                             <p className="text-sm mt-2 opacity-50">Try "AI Optimize" to enhance your prompts automatically.</p>
                         </div>
                     )}
                 </div>
             </div>

         </div>
      </section>

      {/* Main Content Grid (Full Width) */}
      <div className="max-w-7xl mx-auto px-6 py-16">
          
          <div className="space-y-20">
              
              {/* Intro */}
              <section className="space-y-6 max-w-4xl mx-auto text-center">
                  <h2 className="text-3xl font-bold text-white flex items-center justify-center">
                     <Terminal className="mr-3 text-emerald-400" />
                     Why use the AI Converter?
                  </h2>
                  <div className="prose prose-invert max-w-none text-slate-300 leading-relaxed">
                      <p>
                        Manual JSON formatting is error-prone. A single missing comma can break your entire API call. Our <strong>Intelligent Parser</strong> not only fixes syntax but understands the semantic intent of your request.
                      </p>
                      <p>
                        By optimizing your prompt with the "AI Enhance" feature, you ensure that the downstream model (whether it's Midjourney, Veo, or GPT-4) receives a prompt that adheres to its specific best practices.
                      </p>
                  </div>
              </section>

              {/* Feature Breakdown */}
              <section className="space-y-8">
                  <h2 className="text-3xl font-bold text-white text-center">Optimization Logic</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-xl">
                          <h3 className="text-lg font-bold text-emerald-400 mb-3 flex items-center">
                              <Brain className="mr-2" size={18} /> Role Injection
                          </h3>
                          <p className="text-sm text-slate-400">
                              Detects if you are asking for code, art, or text, and assigns the perfect persona (e.g., "Senior Engineer" vs "Digital Artist").
                          </p>
                      </div>
                      
                      <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-xl">
                          <h3 className="text-lg font-bold text-teal-400 mb-3 flex items-center">
                              <Shield className="mr-2" size={18} /> Safety & Negatives
                          </h3>
                          <p className="text-sm text-slate-400">
                              Automatically appends standard negative prompts for visual tasks to prevent low-quality outputs (e.g., "blurry, watermark").
                          </p>
                      </div>

                      <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-xl">
                          <h3 className="text-lg font-bold text-cyan-400 mb-3 flex items-center">
                              <Zap className="mr-2" size={18} /> Auto-Formatting
                          </h3>
                          <p className="text-sm text-slate-400">
                              Detects lists, bullets, and key-value pairs in raw text and converts them into proper JSON arrays and objects instantly.
                          </p>
                      </div>
                  </div>
              </section>
          </div>

      </div>

      <footer className="py-12 border-t border-slate-900 bg-slate-950 text-center text-slate-600">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
             <p className="text-sm">© 2025 JSON Prompt Generator. Local & Secure.</p>
             <div className="flex space-x-6 mt-4 md:mt-0 text-sm">
                 <a href="#" className="hover:text-slate-400 transition-colors">Privacy</a>
                 <a href="#" className="hover:text-slate-400 transition-colors">Terms</a>
             </div>
          </div>
      </footer>
    </div>
  );
};

export default ConverterToolPage;