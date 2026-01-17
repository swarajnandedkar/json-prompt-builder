import React, { useEffect } from 'react';
import Footer from './Footer';
import { ArrowLeft, Users, Zap, Shield, Code } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const About: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "About Us | JSON Prompt Generator";
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-slate-950 text-slate-300 font-sans flex flex-col">
            {/* Simple Header */}
            <header className="h-16 border-b border-slate-900 bg-slate-950 flex items-center px-6 sticky top-0 z-10 backdrop-blur-md bg-opacity-80">
                <button onClick={() => navigate('/')} className="flex items-center text-slate-400 hover:text-white transition-colors">
                    <ArrowLeft size={16} className="mr-2" /> Back to Home
                </button>
            </header>

            <main className="flex-1 max-w-4xl mx-auto px-6 py-16 w-full">
                <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-8">About Us</h1>

                <div className="space-y-12 text-lg leading-relaxed text-slate-400">
                    <p>
                        We believe that the future of AI is <strong>structured</strong>. While natural language is expressive, it is often ambiguous.
                        <span className="text-slate-200"> JSON Prompt Generator</span> was born from a simple need: to bridge the gap between human creativity and machine precision.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
                            <h3 className="text-xl font-bold text-white mb-3 flex items-center">
                                <Zap className="mr-2 text-yellow-400" /> Our Mission
                            </h3>
                            <p className="text-sm">To empower creators, developers, and marketers with tools that turn vague ideas into production-ready AI instructions.</p>
                        </div>
                        <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
                            <h3 className="text-xl font-bold text-white mb-3 flex items-center">
                                <Shield className="mr-2 text-green-400" /> Privacy First
                            </h3>
                            <p className="text-sm">We operate on a strict "Client-Side Only" architecture. Your prompts, strategies, and templates never leave your browser.</p>
                        </div>
                    </div>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">The Team</h2>
                        <p className="mb-6">
                            We are a small, dedicated team of prompt engineers, full-stack developers, and AI researchers.
                            Disappointed by the "slot machine" nature of basic prompting, we built a system that ensures repeatability and quality.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">Why Open Source?</h2>
                        <p>
                            Transparency is key in the age of AI. By keeping our core utilities open, we allow the community to verify our security claims and contribute to the growing library of structured templates.
                        </p>
                    </section>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default About;
