import React, { useEffect } from 'react';
import Footer from './Footer';
import { ArrowLeft, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Disclaimer: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Disclaimer | JSON Prompt Generator";
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-slate-950 text-slate-300 font-sans flex flex-col">
            <header className="h-16 border-b border-slate-900 bg-slate-950 flex items-center px-6 sticky top-0 z-10 backdrop-blur-md bg-opacity-80">
                <button onClick={() => navigate('/')} className="flex items-center text-slate-400 hover:text-white transition-colors">
                    <ArrowLeft size={16} className="mr-2" /> Back to Home
                </button>
            </header>

            <main className="flex-1 max-w-4xl mx-auto px-6 py-16 w-full">
                <div className="flex items-center space-x-4 mb-8">
                    <div className="bg-orange-500/10 p-3 rounded-xl border border-orange-500/20">
                        <AlertTriangle size={32} className="text-orange-500" />
                    </div>
                    <h1 className="text-4xl font-extrabold text-white">Disclaimer</h1>
                </div>

                <div className="prose prose-invert prose-lg max-w-none text-slate-400">
                    <p className="text-xl text-slate-300">
                        Last Updated: January 18, 2026
                    </p>

                    <h3>1. No Affiliation</h3>
                    <p>
                        JSON Prompt Generator is an independent project and is <strong>not affiliated, endorsed, or sponsored</strong> by OpenAI, Google, Midjourney, Runway, or any other AI research lab mentioned on this website.
                        Trademarks such as "GPT-4", "Sora", "Veo", and "Gemini" belong to their respective owners.
                    </p>

                    <h3>2. "As Is" Basis</h3>
                    <p>
                        The tools, templates, and generated code provided on this website are for educational and productivity purposes only. They are provided "as is" without warranty of any kind.
                        We do not guarantee that the prompts generated will produce specific results, as AI models are non-deterministic.
                    </p>

                    <h3>3. User Responsibility</h3>
                    <p>
                        You are solely responsible for the content you generate using this tool. Please ensure that your prompts and the resulting AI outputs comply with the Terms of Service of the respective AI platforms you are using.
                    </p>

                    <h3>4. Financial Advice</h3>
                    <p>
                        Nothing on this website constitutes financial, legal, or professional advice.
                    </p>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Disclaimer;
