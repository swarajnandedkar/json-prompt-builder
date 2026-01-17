import React, { useEffect, useState } from 'react';
import Builder from './Builder';
import { getTemplates } from '../api';
import type { Template } from '../api';
import Footer from './Footer';
import { Film, Clapperboard, Sun, Wind, ArrowRight, Aperture, Zap } from 'lucide-react';

const SoraToolPage: React.FC = () => {
    const [template, setTemplate] = useState<Template | null>(null);
    const [data, setData] = useState<any>({});

    useEffect(() => {
        document.title = "Sora & Gen-2 Video Prompt Generator | Cinematic AI Tools";

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

        updateMeta('description', 'Create Hollywood-grade AI video prompts for OpenAI Sora and Runway Gen-2. Control lighting, camera movement, and physics.');
        updateMeta('robots', 'noindex');

        const loadTemplate = async () => {
            const templates = await getTemplates();
            const found = templates.find((t: Template) => t.name.includes("Sora"));
            if (found) {
                setTemplate(found);
                setData(found.json_structure);
            }
        };
        loadTemplate();
    }, []);

    return (
        <div className="min-h-screen bg-slate-950 text-slate-300 font-sans selection:bg-indigo-500/30">

            {/* Hero Section */}
            <header className="relative pt-24 pb-32 px-6 overflow-hidden border-b border-indigo-900/20">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-slate-950 to-slate-950 pointer-events-none"></div>
                <div className="max-w-5xl mx-auto text-center relative z-10">
                    <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm font-semibold uppercase tracking-wider mb-8">
                        <Film size={14} />
                        <span>Sora / Gen-2 Compatible</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-8 tracking-tight leading-tight">
                        Cinematic Video <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">Director Suite</span>
                    </h1>
                    <p className="text-xl text-slate-400 mb-10 max-w-3xl mx-auto leading-relaxed font-light">
                        Direct your AI video scenes like a pro. Define precise lighting rigs, camera movements, and environmental physics to create coherent, high-motion video.
                    </p>
                </div>
            </header>

            {/* Tool Container */}
            <section className="px-4 -mt-20 relative z-20 pb-24">
                <div className="max-w-[1400px] mx-auto bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-3xl shadow-2xl shadow-indigo-900/20 overflow-hidden ring-1 ring-white/10">
                    <div className="h-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600"></div>
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
                                <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                                <span className="text-indigo-300 font-mono text-sm animate-pulse">Loading Director Suite...</span>
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
                            <Clapperboard className="mr-3 text-indigo-400" />
                            Directing AI Video
                        </h2>
                        <div className="prose prose-invert max-w-none text-slate-300 leading-relaxed">
                            <p>
                                Sora and Gen-2 are incredibly powerful, but they often default to "generic stock footage" looks if not directed properly.
                                By using structured parameters, you act as the <strong>Director of Photography (DP)</strong>, specifying not just <em>what</em> happens, but <em>how</em> it is filmed.
                            </p>
                        </div>
                    </section>

                    {/* Lighting Guide */}
                    <section className="space-y-8">
                        <h2 className="text-3xl font-bold text-white">Cinematic Lighting</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-xl">
                                <h3 className="text-lg font-bold text-yellow-400 mb-3 flex items-center">
                                    <Sun className="mr-2" size={18} /> Natural Light
                                </h3>
                                <ul className="space-y-3 text-sm text-slate-400">
                                    <li className="flex justify-between"><span className="text-white font-bold">Golden Hour</span> <span>Warm, soft, low angle</span></li>
                                    <li className="flex justify-between"><span className="text-white font-bold">Blue Hour</span> <span>Cool, moody, pre-dawn</span></li>
                                    <li className="flex justify-between"><span className="text-white font-bold">Overcast</span> <span>Diffused, shadowless</span></li>
                                </ul>
                            </div>

                            <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-xl">
                                <h3 className="text-lg font-bold text-purple-400 mb-3 flex items-center">
                                    <Zap className="mr-2" size={18} /> Artificial Light
                                </h3>
                                <ul className="space-y-3 text-sm text-slate-400">
                                    <li className="flex justify-between"><span className="text-white font-bold">Neon Noir</span> <span>Pink/Cyan contrast</span></li>
                                    <li className="flex justify-between"><span className="text-white font-bold">Practical</span> <span>Lamps, screens, streetlights</span></li>
                                    <li className="flex justify-between"><span className="text-white font-bold">Chiaroscuro</span> <span>High contrast light/dark</span></li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Environment */}
                    <section className="space-y-6">
                        <h2 className="text-3xl font-bold text-white flex items-center">
                            <Wind className="mr-3 text-cyan-400" />
                            Atmospherics
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {["Fog/Mist", "Rain/Storm", "Snowfall", "Sandstorm", "Heat Haze", "Bokeh", "God Rays", "Sparks/Embers"].map(style => (
                                <div key={style} className="bg-slate-900 border border-slate-800 p-4 rounded-lg text-center text-sm font-medium text-slate-300 hover:text-white hover:border-indigo-500/50 transition-colors cursor-pointer">
                                    {style}
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-4 space-y-8">
                    <div className="sticky top-8 space-y-8">

                        {/* Camera Lenses */}
                        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4 flex items-center"> <Aperture size={14} className="mr-2" /> Lens Choice</h3>
                            <ul className="space-y-4">
                                <li className="flex justify-between items-center text-sm">
                                    <span className="text-slate-400">16mm</span>
                                    <span className="text-white font-mono bg-slate-800 px-2 py-1 rounded">Wide / Action</span>
                                </li>
                                <li className="flex justify-between items-center text-sm">
                                    <span className="text-slate-400">35mm</span>
                                    <span className="text-white font-mono bg-slate-800 px-2 py-1 rounded">Standard / Story</span>
                                </li>
                                <li className="flex justify-between items-center text-sm">
                                    <span className="text-slate-400">85mm</span>
                                    <span className="text-white font-mono bg-slate-800 px-2 py-1 rounded">Portrait / Bokeh</span>
                                </li>
                                <li className="flex justify-between items-center text-sm">
                                    <span className="text-slate-400">Macro</span>
                                    <span className="text-white font-mono bg-slate-800 px-2 py-1 rounded">Texture / Details</span>
                                </li>
                            </ul>
                        </div>

                        {/* FAQ */}
                        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Direction Tips</h3>
                            <div className="space-y-6">
                                <div>
                                    <h4 className="text-white font-bold text-sm mb-1">Consistency</h4>
                                    <p className="text-slate-400 text-xs leading-relaxed">Keep the "Subject" description identical across multiple prompts to maintain character consistency.</p>
                                </div>
                                <div>
                                    <h4 className="text-white font-bold text-sm mb-1">Negative Prompts</h4>
                                    <p className="text-slate-400 text-xs leading-relaxed">"Static, frozen, morphing, watermark" are essential for video.</p>
                                </div>
                            </div>
                        </div>

                        {/* CTA */}
                        <div className="bg-gradient-to-br from-indigo-900/50 to-purple-900/50 border border-indigo-500/30 rounded-2xl p-6 relative overflow-hidden">
                            <div className="relative z-10">
                                <h3 className="text-white font-bold mb-2">Lights, Camera...</h3>
                                <p className="text-indigo-200 text-sm mb-4">Generate your scene now.</p>
                                <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="inline-flex items-center bg-white text-indigo-900 px-4 py-2 rounded-lg text-sm font-bold hover:bg-indigo-50 transition-colors">
                                    Go to Generator <ArrowRight size={14} className="ml-2" />
                                </button>
                            </div>
                        </div>

                    </div>
                </div>

            </div>

            <Footer />
        </div>
    );
};

export default SoraToolPage;