import React, { useState } from 'react';
import { ArrowRight, Wand2 } from 'lucide-react';

interface ConverterProps {
  onConvert: (data: any) => void;
}

const Converter: React.FC<ConverterProps> = ({ onConvert }) => {
  const [text, setText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleConvert = () => {
    setIsAnalyzing(true);
    
    // Simulate "AI" processing time
    setTimeout(() => {
      const result = parseTextToJSON(text);
      onConvert(result);
      setIsAnalyzing(false);
    }, 800);
  };

  const parseTextToJSON = (inputText: string) => {
    const lines = inputText.split('\n');
    const result: any = {};
    let currentKey = 'instruction';
    let buffer: string[] = [];

    // Helper to flush buffer to result
    const flushBuffer = () => {
        if (buffer.length > 0) {
            const content = buffer.join('\n').trim();
            if (content) {
                if (result[currentKey]) {
                    if (Array.isArray(result[currentKey])) {
                        result[currentKey].push(content);
                    } else {
                        result[currentKey] = [result[currentKey], content]; // Convert to array if duplicate
                    }
                } else {
                    result[currentKey] = content;
                }
            }
        }
        buffer = [];
    };

    // Regex patterns for common keys
    const patterns = [
        { key: 'role', regex: /^(role|persona|you are a):/i },
        { key: 'task', regex: /^(task|goal|objective|instruction):/i },
        { key: 'context', regex: /^(context|background|situation):/i },
        { key: 'constraints', regex: /^(constraints|requirements|rules|guidelines):/i },
        { key: 'format', regex: /^(format|output format|structure):/i },
        { key: 'examples', regex: /^(examples|few-shot|sample):/i },
    ];

    for (const line of lines) {
        let matched = false;
        const trimmedLine = line.trim();

        if (!trimmedLine) {
            buffer.push(line); 
            continue; 
        }

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
            // Check if it's a list item (bullet point)
            if (trimmedLine.startsWith('- ') || trimmedLine.startsWith('* ') || /^\d+\./.test(trimmedLine)) {
                 // If we are in a text block, maybe we should switch to array?
                 // For now, keep as text, but could be enhanced to create arrays.
                 buffer.push(trimmedLine);
            } else {
                 buffer.push(line);
            }
        }
    }
    flushBuffer();

    // Clean up: if everything went into 'instruction' but it looks structured, maybe it failed.
    // But if 'instruction' is the only key, maybe that's fine.
    
    // Post-processing: specific handling for constraints to make them arrays if they contain newlines
    if (typeof result.constraints === 'string' && result.constraints.includes('\n')) {
        result.constraints = result.constraints.split('\n').map((s: string) => s.replace(/^[-*•]\s*/, '').trim()).filter((s: string) => s);
    }

    return result;
  };

  return (
    <div className="max-w-4xl mx-auto h-full flex flex-col">
      <div className="bg-slate-900 rounded-xl border border-slate-800 p-8 shadow-xl flex-1 flex flex-col">
         <div className="mb-6">
            <h2 className="text-2xl font-bold text-white mb-2 flex items-center space-x-2">
                <Wand2 className="text-purple-400" />
                <span>Text-to-JSON Converter</span>
            </h2>
            <p className="text-slate-400">Paste your raw prompt below. Our system will analyze the structure and convert it into a valid JSON prompt object.</p>
         </div>

         <div className="flex-1 relative">
            <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Paste your prompt here...\n\nRole: Senior Developer\nTask: Write a React component...\nContext: This is for a dashboard application..."
                className="w-full h-full bg-slate-950 border border-slate-700 rounded-lg p-6 text-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none font-mono leading-relaxed"
            />
         </div>

         <div className="mt-6 flex justify-end">
            <button
                onClick={handleConvert}
                disabled={!text.trim() || isAnalyzing}
                className={`
                    flex items-center space-x-2 px-8 py-3 rounded-lg font-bold text-white shadow-lg transition-all
                    ${!text.trim() ? 'bg-slate-700 cursor-not-allowed text-slate-500' : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 hover:shadow-blue-500/25'}
                `}
            >
                {isAnalyzing ? (
                    <span>Analyzing...</span>
                ) : (
                    <>
                        <span>Convert to JSON</span>
                        <ArrowRight size={20} />
                    </>
                )}
            </button>
         </div>
      </div>
    </div>
  );
};

export default Converter;
