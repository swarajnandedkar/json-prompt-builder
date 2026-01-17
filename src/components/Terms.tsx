import React, { useEffect } from 'react';
import Footer from './Footer';
import { ArrowLeft, Scale } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Terms: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Terms of Use | JSON Prompt Generator";
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
                    <div className="bg-blue-500/10 p-3 rounded-xl border border-blue-500/20">
                        <Scale size={32} className="text-blue-500" />
                    </div>
                    <h1 className="text-4xl font-extrabold text-white">Terms of Use</h1>
                </div>

                <div className="prose prose-invert prose-lg max-w-none text-slate-400">
                    <h3>1. Acceptance of Terms</h3>
                    <p>
                        By accessing and using JSON Prompt Generator, you accept and agree to be bound by the terms and provisions of this agreement.
                    </p>

                    <h3>2. Use License</h3>
                    <p>
                        Permission is granted to use this website for personal or commercial purposes to generate JSON prompts.
                        You may not mirror, scrape, or reverse engineer the source code of the application itself for the purpose of building a competing product.
                    </p>

                    <h3>3. Limitations</h3>
                    <p>
                        In no event shall JSON Prompt Generator be liable for any damages (including, without limitation, damages for loss of data or profit) arising out of the use or inability to use the materials on this website.
                    </p>

                    <h3>4. Governing Law</h3>
                    <p>
                        These terms and conditions are governed by and construed in accordance with the laws of the Internet Standard Protocols and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
                    </p>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Terms;
