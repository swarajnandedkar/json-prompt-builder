import React, { useEffect, useState } from 'react';
import Footer from './Footer';
import { ArrowLeft, Mail, MessageSquare, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Contact: React.FC = () => {
    const navigate = useNavigate();
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        document.title = "Contact Us | JSON Prompt Generator";
        window.scrollTo(0, 0);
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate submission
        setSubmitted(true);
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-300 font-sans flex flex-col">
            <header className="h-16 border-b border-slate-900 bg-slate-950 flex items-center px-6 sticky top-0 z-10 backdrop-blur-md bg-opacity-80">
                <button onClick={() => navigate('/')} className="flex items-center text-slate-400 hover:text-white transition-colors">
                    <ArrowLeft size={16} className="mr-2" /> Back to Home
                </button>
            </header>

            <main className="flex-1 max-w-4xl mx-auto px-6 py-16 w-full">
                <div className="flex items-center space-x-4 mb-8">
                    <div className="bg-purple-500/10 p-3 rounded-xl border border-purple-500/20">
                        <Mail size={32} className="text-purple-500" />
                    </div>
                    <h1 className="text-4xl font-extrabold text-white">Contact Us</h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div>
                        <p className="text-lg text-slate-400 mb-8 leading-relaxed">
                            Have a question, a bug report, or a feature request? We'd love to hear from you.
                            We read every message and usually respond within 24 hours.
                        </p>

                        <div className="space-y-6">
                            <div className="flex items-start">
                                <MessageSquare className="mt-1 mr-4 text-purple-400" />
                                <div>
                                    <h3 className="text-white font-bold">Feature Requests</h3>
                                    <p className="text-sm text-slate-500">Suggest new templates or API integrations.</p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <Mail className="mt-1 mr-4 text-purple-400" />
                                <div>
                                    <h3 className="text-white font-bold">Email</h3>
                                    <p className="text-sm text-slate-500">support@jsonpromptgenerator.com</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800">
                        {submitted ? (
                            <div className="h-full flex flex-col items-center justify-center text-center py-12">
                                <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mb-6">
                                    <CheckCircle size={32} className="text-green-500" />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                                <p className="text-slate-400">Thanks for reaching out. We'll be in touch soon.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-bold text-slate-400 mb-2">Name</label>
                                    <input required type="text" className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all" placeholder="Enter your name" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-400 mb-2">Email</label>
                                    <input required type="email" className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all" placeholder="Enter your email" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-400 mb-2">Message</label>
                                    <textarea required rows={4} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all" placeholder="How can we help?"></textarea>
                                </div>
                                <button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-lg transition-colors shadow-lg shadow-purple-900/20">
                                    Send Message
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Contact;
