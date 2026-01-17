import React from 'react';
import { Globe, Mail, Twitter, Github } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Footer: React.FC = () => {
    const navigate = useNavigate();

    return (
        <footer className="py-12 border-t border-slate-900 bg-slate-950 text-center text-slate-600">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">

                    {/* Logo / Copyright */}
                    <div className="text-left">
                        <p className="text-sm font-semibold text-slate-400">© 2025 JSON Prompt Generator</p>
                        <p className="text-xs text-slate-600 mt-1">Local. Secure. Open Source.</p>
                    </div>

                    {/* Navigation Links */}
                    <div className="flex flex-wrap justify-center gap-6 text-sm font-medium">
                        <button onClick={() => navigate('/about')} className="hover:text-white transition-colors">About Us</button>
                        <button onClick={() => navigate('/contact')} className="hover:text-white transition-colors">Contact</button>
                        <button onClick={() => navigate('/privacy')} className="hover:text-white transition-colors">Privacy Policy</button>
                        <button onClick={() => navigate('/terms')} className="hover:text-white transition-colors">Terms of Use</button>
                        <button onClick={() => navigate('/disclaimer')} className="hover:text-white transition-colors">Disclaimer</button>
                    </div>

                    {/* Socials / Global */}
                    <div className="flex items-center space-x-4">
                        <a href="#" className="hover:text-white transition-colors"><Twitter size={16} /></a>
                        <a href="#" className="hover:text-white transition-colors"><Github size={16} /></a>
                        <div className="h-4 w-px bg-slate-800 mx-2"></div>
                        <div className="flex items-center space-x-2 text-xs">
                            <Globe size={12} />
                            <span>EN</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
