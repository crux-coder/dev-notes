'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Copy, Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';
import { useRecoilState } from 'recoil';
import { selectedModelState, promptState, apiKeyState, showApiKeyState } from './atoms';
import { ChatModel } from 'openai/resources';


export default function SettingsDrawer() {
  const [selectedModel, setSelectedModel] = useRecoilState(selectedModelState);
  const [prompt, setPrompt] = useRecoilState(promptState);
  const [apiKey, setApiKey] = useRecoilState(apiKeyState);
  const [showApiKey, setShowApiKey] = useRecoilState(showApiKeyState);

  const handleModelChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedModel(event.target.value as ChatModel);
  };

  const handlePromptChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(event.target.value);
  };

  const handleApiKeyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setApiKey(event.target.value);
  };

  const toggleShowApiKey = () => {
    setShowApiKey(!showApiKey);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(apiKey).then(() => {
      toast("API Key copied to clipboard!")
    }).catch(err => {
      console.error('Failed to copy API Key: ', err);
    });
  };

  return (
    <div className="flex w-full flex-grow flex-col h-full border p-4 rounded-md">
      <div className="w-full">
        <label htmlFor="model-select">Select OpenAI Model</label>
        <select
          id="model-select"
          value={selectedModel}
          onChange={handleModelChange}
          className="border rounded p-2 w-full"
        >
          <option value="o1-preview">O1 Preview</option>
          <option value="o1-preview-2024-09-12">O1 Preview 2024-09-12</option>
          <option value="o1-mini">O1 Mini</option>
          <option value="o1-mini-2024-09-12">O1 Mini 2024-09-12</option>
          <option value="gpt-4o">GPT-4O</option>
          <option value="gpt-4o-2024-08-06">GPT-4O 2024-08-06</option>
          <option value="gpt-4o-2024-05-13">GPT-4O 2024-05-13</option>
          <option value="gpt-4o-realtime-preview">GPT-4O Realtime Preview</option>
          <option value="gpt-4o-realtime-preview-2024-10-01">GPT-4O Realtime Preview 2024-10-01</option>
          <option value="gpt-4o-audio-preview">GPT-4O Audio Preview</option>
          <option value="gpt-4o-audio-preview-2024-10-01">GPT-4O Audio Preview 2024-10-01</option>
          <option value="chatgpt-4o-latest">ChatGPT-4O Latest</option>
          <option value="gpt-4o-mini">GPT-4O Mini</option>
          <option value="gpt-4o-mini-2024-07-18">GPT-4O Mini 2024-07-18</option>
          <option value="gpt-4-turbo">GPT-4 Turbo</option>
          <option value="gpt-4-turbo-2024-04-09">GPT-4 Turbo 2024-04-09</option>
          <option value="gpt-4-0125-preview">GPT-4 0125 Preview</option>
          <option value="gpt-4-turbo-preview">GPT-4 Turbo Preview</option>
          <option value="gpt-4-1106-preview">GPT-4 1106 Preview</option>
          <option value="gpt-4-vision-preview">GPT-4 Vision Preview</option>
          <option value="gpt-4">GPT-4</option>
          <option value="gpt-4-0314">GPT-4 0314</option>
          <option value="gpt-4-0613">GPT-4 0613</option>
          <option value="gpt-4-32k">GPT-4 32K</option>
          <option value="gpt-4-32k-0314">GPT-4 32K 0314</option>
          <option value="gpt-4-32k-0613">GPT-4 32K 0613</option>
          <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
          <option value="gpt-3.5-turbo-16k">GPT-3.5 Turbo 16K</option>
          <option value="gpt-3.5-turbo-0301">GPT-3.5 Turbo 0301</option>
          <option value="gpt-3.5-turbo-0613">GPT-3.5 Turbo 0613</option>
          <option value="gpt-3.5-turbo-1106">GPT-3.5 Turbo 1106</option>
          <option value="gpt-3.5-turbo-0125">GPT-3.5 Turbo 0125</option>
          <option value="gpt-3.5-turbo-16k-0613">GPT-3.5 Turbo 16K 0613</option>
        </select>
      </div>
      <div className="w-full mt-4">
        <label htmlFor="openai-api-key">OpenAI API Key</label>
        <div className="flex items-center">
          <input
            id="openai-api-key"
            type={showApiKey ? 'text' : 'password'}
            value={apiKey}
            onChange={handleApiKeyChange}
            className="border rounded p-2 w-full"
          />
          <Button onClick={toggleShowApiKey} variant="outline" size="lg" className="p-2 ml-2">
            {showApiKey ? <EyeOff /> : <Eye />}
          </Button>
          <Button onClick={copyToClipboard} variant="outline" size="lg" className="p-2 ml-2">
            <Copy />
          </Button>
        </div>
      </div>
      <div className="w-full mt-4">
        <label htmlFor="prompt">Prompt</label>
        <textarea
          id="prompt"
          value={prompt}
          onChange={handlePromptChange}
          className="w-full p-1 text-lg"
          rows={15}
        />
      </div>
    </div>
  );
}
