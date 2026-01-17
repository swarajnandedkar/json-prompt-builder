import { LOCAL_TEMPLATES } from './data/templates';

// We are moving to Client-Side Only mode for Netlify compatibility
// No backend URL needed.

export interface Template {
  id: number;
  name: string;
  description: string;
  json_structure: any;
}

export interface Prompt {
  id: number;
  template_id: number;
  prompt_data: any;
  plain_text: string;
  created_at: string;
}

export const getTemplates = async () => {
  // Simulate API delay for realism
  return new Promise<Template[]>((resolve) => {
    setTimeout(() => {
      resolve(LOCAL_TEMPLATES);
    }, 300);
  });
};

export const getPrompts = async () => {
  return new Promise<Prompt[]>((resolve) => {
    const saved = localStorage.getItem('json_prompts_v1');
    const prompts = saved ? JSON.parse(saved) : [];
    resolve(prompts);
  });
};

export const savePrompt = async (prompt: { template_id: number | null, prompt_data: any, plain_text: string }) => {
  return new Promise<{ message: string, data: { id: number } }>((resolve) => {
    const saved = localStorage.getItem('json_prompts_v1');
    const prompts: Prompt[] = saved ? JSON.parse(saved) : [];

    const newPrompt: Prompt = {
      id: Date.now(), // Simple ID generation
      template_id: prompt.template_id || 0,
      prompt_data: prompt.prompt_data,
      plain_text: prompt.plain_text,
      created_at: new Date().toISOString()
    };

    // Add to top
    prompts.unshift(newPrompt);
    // Limit to 50
    const limited = prompts.slice(0, 50);

    localStorage.setItem('json_prompts_v1', JSON.stringify(limited));

    setTimeout(() => {
      resolve({ message: "success", data: { id: newPrompt.id } });
    }, 300);
  });
};
