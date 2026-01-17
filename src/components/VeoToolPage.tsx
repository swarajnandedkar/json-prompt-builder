import React, { useEffect, useState } from 'react';
import Builder from './Builder';
import { getTemplates } from '../api';
import type { Template } from '../api';
import Footer from './Footer';
import { Sparkles, Layers, FileJson, Zap, Users, ArrowRight } from 'lucide-react';

const VeoToolPage: React.FC = () => {
    const [template, setTemplate] = useState<Template | null>(null);
    const [data, setData] = useState<any>({});
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // SEO & Meta Tags
        document.title = "Master the Art of Structured Prompting | Free JSON AI Prompt Generator";

        const updateMeta = (name: string, content: string) => {
            let element = document.querySelector(`meta[name="${name}"]`);
            if (!element) {
                element = document.createElement('meta');
                element.setAttribute('name', name);
                document.head.appendChild(element);
            }
            element.setAttribute('content', content);
        };

        updateMeta('description', 'The JSON AI Prompt Generator is a professional-grade tool designed to bridge the gap between creative marketing briefs and structured, machine-readable AI instructions.');
        updateMeta('robots', 'noindex');

        const loadVeoTemplate = async () => {
            try {
                const templates = await getTemplates();
                // Case-insensitive search to be robust
                const veoTemplate = templates.find((t: Template) => t.name.toLowerCase().includes("veo"));
                if (veoTemplate) {
                    setTemplate(veoTemplate);
                    setData(veoTemplate.json_structure);
                } else {
                    console.warn("Veo template not found");
                    setError("Template not found in database.");
                }
            } catch (e) {
                console.error("Failed to load templates", e);
                setError("Failed to connect to server.");
            }
        };
        loadVeoTemplate();
    }, []);

    return (
        <div className="min-h-screen bg-slate-950 text-slate-300 font-sans selection:bg-purple-500/30">

            {/* Hero Section */}
            <header className="relative pt-24 pb-32 px-6 overflow-hidden border-b border-purple-900/20">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-slate-950 to-slate-950 pointer-events-none"></div>
                <div className="max-w-5xl mx-auto text-center relative z-10">
                    <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-sm font-semibold uppercase tracking-wider mb-8">
                        <Sparkles size={14} />
                        <span>Professional Grade</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-8 tracking-tight leading-tight">
                        Master the Art of <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400">Structured Prompting</span>
                    </h1>
                    <p className="text-xl text-slate-400 mb-10 max-w-3xl mx-auto leading-relaxed font-light">
                        The difference between a mediocre response and a high-performance output lies in Prompt Engineering. Bridge the gap between creative briefs and structured AI instructions.
                    </p>
                </div>
            </header>

            {/* Tool Container */}
            <section className="px-4 -mt-20 relative z-20 pb-24">
                <div className="max-w-[1400px] mx-auto bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-3xl shadow-2xl shadow-purple-900/20 overflow-hidden ring-1 ring-white/10">
                    <div className="h-1 bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600"></div>
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
                                {error ? (
                                    <div className="text-red-400 text-center">
                                        <p className="font-bold mb-2">Error Loading Generator</p>
                                        <p className="text-sm border border-red-500/30 bg-red-900/10 px-4 py-2 rounded">{error}</p>
                                        <button onClick={() => window.location.reload()} className="mt-4 text-xs underline hover:text-red-300">Retry</button>
                                    </div>
                                ) : (
                                    <>
                                        <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                                        <span className="text-purple-300 font-mono text-sm animate-pulse">Initializing Generator...</span>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Main Content From Markdown */}
            <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-12 gap-12">

                {/* Main Article Content */}
                <div className="lg:col-span-8 space-y-20">

                    {/* Intro */}
                    <section className="space-y-6">
                        <h2 className="text-3xl font-bold text-white">What is the JSON AI Prompt Generator?</h2>
                        <div className="prose prose-invert max-w-none text-slate-300 leading-relaxed">
                            <p>
                                The <strong>JSON AI Prompt Generator</strong> is a free, template-based utility that transforms marketing requirements into structured JSON (JavaScript Object Notation). Unlike generic AI assistants, this tool is built specifically for digital marketing professionals, SEO specialists, and automation experts who require consistent, reliable results for AI-driven workflows and API development.
                            </p>
                        </div>

                        <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
                            <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                                <Zap className="mr-2 text-yellow-400" size={20} />
                                Why Use JSON for AI Prompts?
                            </h3>
                            <p className="text-slate-400 mb-0">
                                Research indicates that structured JSON prompts provide <strong>40-60% better instruction-following</strong> compared to traditional paragraph-style prompts. JSON eliminates ambiguity by clearly defining parameters such as task, tone, audience, and goals, ensuring the AI model understands exactly what is required.
                            </p>
                        </div>
                    </section>

                    {/* Key Features */}
                    <section className="space-y-8">
                        <h2 className="text-3xl font-bold text-white">Key Features</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-xl">
                                <h3 className="text-lg font-bold text-purple-400 mb-3 flex items-center">
                                    <Layers className="mr-2" size={18} /> Six Professional Templates
                                </h3>
                                <ul className="space-y-2 text-sm text-slate-400">
                                    <li>• <strong>Blog Writing (SaaS):</strong> Optimized for thought leadership.</li>
                                    <li>• <strong>Competitor Research:</strong> Systematic SWOT analysis.</li>
                                    <li>• <strong>1-Month Marketing Plan:</strong> Campaign planning.</li>
                                    <li>• <strong>Email Review Rubric:</strong> Quality checks.</li>
                                    <li>• <strong>Google Search Console:</strong> Data-driven SEO reporting.</li>
                                </ul>
                            </div>

                            <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-xl">
                                <h3 className="text-lg font-bold text-blue-400 mb-3 flex items-center">
                                    <FileJson className="mr-2" size={18} /> Smart Edit Interface
                                </h3>
                                <ul className="space-y-2 text-sm text-slate-400">
                                    <li>• <strong>Core Strings:</strong> Define task, topic, audience, tone.</li>
                                    <li>• <strong>String Arrays:</strong> Add multiple goals or keywords.</li>
                                    <li>• <strong>Output Settings:</strong> Control length and format (Markdown, HTML).</li>
                                </ul>
                            </div>
                        </div>

                        <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
                            <h3 className="text-lg font-bold text-white mb-3">Validation and Optimization</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                                {["Validate", "Prettify", "Minify", "Export"].map(item => (
                                    <div key={item} className="bg-slate-800 p-3 rounded-lg text-slate-300 font-medium">
                                        {item}
                                    </div>
                                ))}
                            </div>
                            <p className="mt-4 text-sm text-slate-500">
                                Ensure syntax is error-free, format for readability, compress for token optimization, and export directly to your workflow.
                            </p>
                        </div>
                    </section>

                    {/* Who Should Use */}
                    <section className="space-y-6">
                        <h2 className="text-3xl font-bold text-white flex items-center">
                            <Users className="mr-3 text-pink-400" />
                            Who Should Use This Tool?
                        </h2>
                        <div className="overflow-hidden border border-slate-800 rounded-xl shadow-lg">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-slate-900 text-slate-200">
                                    <tr>
                                        <th className="p-4 border-b border-slate-700">User Persona</th>
                                        <th className="p-4 border-b border-slate-700">Key Use Case</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-800 bg-slate-900/50">
                                    {[
                                        { role: "Digital Marketing Agencies", use: "Standardizing output quality across 20-50+ active clients." },
                                        { role: "SEO & Content Teams", use: "Creating consistent, keyword-rich prompts for large-scale production." },
                                        { role: "Automation Specialists", use: "Integrating validated JSON into Zapier, Make, or custom APIs." },
                                        { role: "Project Managers", use: "Onboarding junior staff to produce senior-level content through templates." }
                                    ].map((row, i) => (
                                        <tr key={i} className="hover:bg-slate-800/50 transition-colors">
                                            <td className="p-4 font-bold text-slate-200">{row.role}</td>
                                            <td className="p-4 text-slate-400">{row.use}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>

                    {/* How to Generate */}
                    <section className="space-y-8">
                        <h2 className="text-3xl font-bold text-white">How to Generate a Structured Prompt</h2>
                        <div className="space-y-6">
                            <div className="flex">
                                <div className="flex-shrink-0 w-10 h-10 bg-purple-900/50 rounded-full flex items-center justify-center text-purple-400 font-bold border border-purple-500/30 mr-4">1</div>
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-2">Select Your Framework</h3>
                                    <p className="text-slate-400">Choose a template that matches your objective (e.g., "Competitor Research" or "Veo 3 Video").</p>
                                </div>
                            </div>
                            <div className="flex">
                                <div className="flex-shrink-0 w-10 h-10 bg-purple-900/50 rounded-full flex items-center justify-center text-purple-400 font-bold border border-purple-500/30 mr-4">2</div>
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-2">Input Your Requirements</h3>
                                    <p className="text-slate-400 mb-2">Fill in the fields. For example:</p>
                                    <div className="bg-slate-950 p-4 rounded border border-slate-800 text-sm font-mono text-slate-300">
                                        <span className="text-purple-400">Topic:</span> "The Future of AI"<br />
                                        <span className="text-purple-400">Audience:</span> "SaaS Founders"<br />
                                        <span className="text-purple-400">Tone:</span> "Authoritative yet conversational"
                                    </div>
                                </div>
                            </div>
                            <div className="flex">
                                <div className="flex-shrink-0 w-10 h-10 bg-purple-900/50 rounded-full flex items-center justify-center text-purple-400 font-bold border border-purple-500/30 mr-4">3</div>
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-2">Generate and Validate</h3>
                                    <p className="text-slate-400">The tool automatically generates the code. Check the validation status, prettify for review, and copy to your AI tool.</p>
                                </div>
                            </div>
                        </div>
                    </section>

                </div>

                {/* Sidebar / Table of Contents */}
                <div className="lg:col-span-4 space-y-8">
                    <div className="sticky top-8 space-y-8">

                        {/* Agency Challenges */}
                        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Solving Modern Challenges</h3>
                            <ul className="space-y-4">
                                {[
                                    { title: "Inconsistent Output", desc: "Eliminates the 'lottery' effect of free-form prompting." },
                                    { title: "Workflow Inefficiency", desc: "Reduces manual revisions by up to 50%." },
                                    { title: "Scaling Pains", desc: "Maintain brand voice as you hire junior staff." },
                                    { title: "Broken Automations", desc: "Prevents formatting errors in API integrations." }
                                ].map((item, i) => (
                                    <li key={i} className="group">
                                        <h4 className="text-white font-bold text-sm group-hover:text-purple-400 transition-colors">{item.title}</h4>
                                        <p className="text-slate-500 text-xs">{item.desc}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* FAQ */}
                        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">FAQ</h3>
                            <div className="space-y-6">
                                <div>
                                    <h4 className="text-white font-bold text-sm mb-1">Is this tool really free?</h4>
                                    <p className="text-slate-400 text-xs leading-relaxed">Yes. Full access to all templates and validation tools is free.</p>
                                </div>
                                <div>
                                    <h4 className="text-white font-bold text-sm mb-1">Does the tool store my data?</h4>
                                    <p className="text-slate-400 text-xs leading-relaxed">No. All processing happens locally in your browser (client-side).</p>
                                </div>
                                <div>
                                    <h4 className="text-white font-bold text-sm mb-1">Works with Zapier?</h4>
                                    <p className="text-slate-400 text-xs leading-relaxed">Absolutely. The validated JSON output is automation-ready.</p>
                                </div>
                            </div>
                        </div>

                        {/* CTA */}
                        <div className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 border border-purple-500/30 rounded-2xl p-6 relative overflow-hidden">
                            <div className="relative z-10">
                                <h3 className="text-white font-bold mb-2">Ready to streamline?</h3>
                                <p className="text-purple-200 text-sm mb-4">Start creating professional-grade prompts in seconds.</p>
                                <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="inline-flex items-center bg-white text-purple-900 px-4 py-2 rounded-lg text-sm font-bold hover:bg-purple-50 transition-colors">
                                    Go to Generator <ArrowRight size={14} className="ml-2" />
                                </button>
                            </div>
                        </div>

                    </div>
                </div>

            </div>

            {/* Footer */}
            <Footer />

        </div>
    );
};

export default VeoToolPage;