import React, { useEffect } from 'react';
import Footer from './Footer';
import { ArrowLeft, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Privacy: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Privacy Policy | JSON Prompt Generator";
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
                    <div className="bg-green-500/10 p-3 rounded-xl border border-green-500/20">
                        <Lock size={32} className="text-green-500" />
                    </div>
                    <h1 className="text-4xl font-extrabold text-white">Privacy Policy</h1>
                </div>

                <div className="prose prose-invert prose-lg max-w-none text-slate-400">
                    <p className="lead">
                        We respect your privacy. In fact, we engineered this application specifically to avoid needing your data.
                    </p>

                    <h3>1. Data Collection</h3>
                    <p>
                        <strong>We do not collect, store, or transmit your prompts.</strong>
                        All prompt generation, template editing, and JSON conversion happens entirely within your web browser (Client-Side) using JavaScript.
                    </p>

                    <h3>2. Local Storage</h3>
                    <p>
                        We use your browser's <code>localStorage</code> API to save your "Recent Prompts" so you can access them later. This data resides on your device and is never sent to our servers.
                        Deleting tour browser cache will remove this data.
                    </p>

                    <h3>3. Analytics</h3>
                    <p>
                        We may use privacy-preserving analytics (like Plausible or basic server logs) to simply count the number of visitors to our site. We do not track individual user behavior or use cookies for advertising re-targeting.
                    </p>

                    <h3>4. Third-Party Links</h3>
                    <p>
                        Our website contains links to external AI tools (e.g., Midjourney, OpenAI). We are not responsible for the privacy practices of those sites.
                    </p>

                    <h3>5. Contact</h3>
                    <p>
                        If you have any questions about this policy, please contact us via the Contact page.
                    </p>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Privacy;
