import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation, useParams } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Builder from './components/Builder';
import Dashboard from './components/Dashboard';
import VeoToolPage from './components/VeoToolPage';
import ImageToolPage from './components/ImageToolPage';
import GeneralToolPage from './components/GeneralToolPage';
import SoraToolPage from './components/SoraToolPage';
import ConverterToolPage from './components/ConverterToolPage';
import { getTemplates, getPrompts } from './api';
import type { Template, Prompt } from './api';

function BuilderRoute({ templates, loadData }: { templates: Template[], loadData: () => void }) {
  const { templateId } = useParams();
  const [data, setData] = useState<any>({});

  const selectedTemplate = templates.find(t => t.id === Number(templateId)) || null;

  useEffect(() => {
    if (selectedTemplate) {
      setData(selectedTemplate.json_structure);
    }
  }, [selectedTemplate]);

  if (!selectedTemplate && templates.length > 0 && templateId) {
    return <div className="p-6 text-slate-400">Template not found.</div>;
  }

  return (
    <div className="p-6 h-full">
      {selectedTemplate ? (
        <Builder
          template={selectedTemplate}
          data={data}
          setData={setData}
          onSave={loadData}
        />
      ) : (
        <div className="flex h-full items-center justify-center text-slate-500">
          Select a template from the sidebar to start building.
        </div>
      )}
    </div>
  );
}

function App() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [recentPrompts, setRecentPrompts] = useState<Prompt[]>([]);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const tmpls = await getTemplates();
      setTemplates(tmpls);
      const prompts = await getPrompts();
      setRecentPrompts(prompts);
    } catch (e) {
      console.error("Failed to load data", e);
    }
  };

  const handleTemplateSelect = (template: Template) => {
    // Only route original templates to their special landing pages
    if (template.name === "Veo 3 Optimized") {
      navigate('/tools/veo-3-generator');
    } else if (template.name === "Image Gen (Midjourney)") {
      navigate('/tools/midjourney-generator');
    } else if (template.name === "General AI Assistant (Pro)") {
      navigate('/tools/llm-prompt-generator');
    } else if (template.name === "Video Gen (Sora/Gen-2)") {
      navigate('/tools/sora-video-generator');
    } else {
      // All new templates go to the generic builder
      navigate(`/builder/${template.id}`);
    }
  };

  const handleLoadPrompt = (prompt: Prompt) => {
    // Ideally, we'd check the template type and route accordingly, 
    // but for now, the generic builder route is a safe fallback for history.
    navigate(`/builder/${prompt.template_id}`);
  };

  const isDashboard = location.pathname === '/';
  const isLandingTool = location.pathname.includes('/tools/');

  return (
    <div className="flex h-screen bg-slate-900 text-slate-100 font-sans overflow-hidden">
      {!isDashboard && !isLandingTool && (
        <Sidebar
          templates={templates}
          recentPrompts={recentPrompts}
          onSelectTemplate={handleTemplateSelect}
          onLoadPrompt={handleLoadPrompt}
          onNewPrompt={() => navigate('/')}
        />
      )}

      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        <header className="h-16 border-b border-slate-800 flex items-center justify-between px-6 bg-slate-900/95 backdrop-blur z-10">
          <button onClick={() => navigate('/')} className="flex items-center space-x-2 group">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center font-bold text-white shadow-lg group-hover:scale-105 transition-transform">
              JP
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent group-hover:from-blue-400 group-hover:to-purple-400 transition-all">
              JSON Prompt Generator
            </span>
          </button>

          <nav className="flex items-center space-x-1">
            <button
              onClick={() => navigate('/')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${location.pathname === '/' ? 'text-white bg-slate-800' : 'text-slate-400 hover:text-white'}`}
            >
              Home
            </button>
            <button
              onClick={() => navigate('/tools/veo-3-generator')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${location.pathname.includes('veo') ? 'text-white bg-slate-800' : 'text-slate-400 hover:text-white'}`}
            >
              Veo 3
            </button>
            <button
              onClick={() => navigate('/tools/midjourney-generator')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${location.pathname.includes('midjourney') ? 'text-white bg-slate-800' : 'text-slate-400 hover:text-white'}`}
            >
              Image Gen
            </button>
            <button
              onClick={() => navigate('/converter')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${location.pathname === '/converter' ? 'text-white bg-slate-800' : 'text-slate-400 hover:text-white'}`}
            >
              AI Converter
            </button>
          </nav>
        </header>

        <div className="flex-1 overflow-auto bg-slate-950 relative">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

          <div className="relative z-0 h-full">
            <Routes>
              <Route path="/" element={
                <Dashboard
                  templates={templates}
                  onSelectTemplate={handleTemplateSelect}
                  onOpenConverter={() => navigate('/converter')}
                />
              } />
              <Route path="/tools/veo-3-generator" element={<VeoToolPage />} />
              <Route path="/tools/midjourney-generator" element={<ImageToolPage />} />
              <Route path="/tools/llm-prompt-generator" element={<GeneralToolPage />} />
              <Route path="/tools/sora-video-generator" element={<SoraToolPage />} />

              <Route path="/builder/:templateId" element={
                <BuilderRoute templates={templates} loadData={loadData} />
              } />
              <Route path="/converter" element={<ConverterToolPage />} />
            </Routes>
          </div>
        </div>
      </main>
    </div>
  );
}
export default App;