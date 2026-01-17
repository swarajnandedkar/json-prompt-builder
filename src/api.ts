import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001/api',
  headers: {
    'x-api-key': 'default-dev-key' // Matches server default
  }
});

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
  const response = await api.get('/templates');
  return response.data.data;
};

export const getPrompts = async () => {
  const response = await api.get('/prompts');
  return response.data.data;
};

export const savePrompt = async (prompt: { template_id: number | null, prompt_data: any, plain_text: string }) => {
  const response = await api.post('/prompts', prompt);
  return response.data;
};
