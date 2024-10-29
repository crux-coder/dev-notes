'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Copy, Eye, EyeOff, SidebarClose, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { useRecoilState } from 'recoil';
import { selectedModelState, promptState, apiKeyState, showApiKeyState } from './atoms';
import { ChatModel } from 'openai/resources';

const OpenAIModels = [
  { value: "o1-preview", label: "O1 Preview" },
  { value: "o1-preview-2024-09-12", label: "O1 Preview 2024-09-12" },
  { value: "o1-mini", label: "O1 Mini" },
  { value: "o1-mini-2024-09-12", label: "O1 Mini 2024-09-12" },
  { value: "gpt-4o", label: "GPT-4O" },
  { value: "gpt-4o-2024-08-06", label: "GPT-4O 2024-08-06" },
  { value: "gpt-4o-2024-05-13", label: "GPT-4O 2024-05-13" },
  { value: "gpt-4o-realtime-preview", label: "GPT-4O Realtime Preview" },
  { value: "gpt-4o-realtime-preview-2024-10-01", label: "GPT-4O Realtime Preview 2024-10-01" },
  { value: "gpt-4o-audio-preview", label: "GPT-4O Audio Preview" },
  { value: "gpt-4o-audio-preview-2024-10-01", label: "GPT-4O Audio Preview 2024-10-01" },
  { value: "chatgpt-4o-latest", label: "ChatGPT-4O Latest" },
  { value: "gpt-4o-mini", label: "GPT-4O Mini" },
  { value: "gpt-4o-mini-2024-07-18", label: "GPT-4O Mini 2024-07-18" },
  { value: "gpt-4-turbo", label: "GPT-4 Turbo" },
  { value: "gpt-4-turbo-2024-04-09", label: "GPT-4 Turbo 2024-04-09" },
  { value: "gpt-4-0125-preview", label: "GPT-4 0125 Preview" },
  { value: "gpt-4-turbo-preview", label: "GPT-4 Turbo Preview" },
  { value: "gpt-4-1106-preview", label: "GPT-4 1106 Preview" },
  { value: "gpt-4-vision-preview", label: "GPT-4 Vision Preview" },
  { value: "gpt-4", label: "GPT-4" },
  { value: "gpt-4-0314", label: "GPT-4 0314" },
  { value: "gpt-4-0613", label: "GPT-4 0613" },
  { value: "gpt-4-32k", label: "GPT-4 32K" },
  { value: "gpt-4-32k-0314", label: "GPT-4 32K 0314" },
  { value: "gpt-4-32k-0613", label: "GPT-4 32K 0613" },
  { value: "gpt-3.5-turbo", label: "GPT-3.5 Turbo" },
  { value: "gpt-3.5-turbo-16k", label: "GPT-3.5 Turbo 16K" },
  { value: "gpt-3.5-turbo-0301", label: "GPT-3.5 Turbo 0301" },
  { value: "gpt-3.5-turbo-0613", label: "GPT-3.5 Turbo 0613" },
  { value: "gpt-3.5-turbo-1106", label: "GPT-3.5 Turbo 1106" },
  { value: "gpt-3.5-turbo-0125", label: "GPT-3.5 Turbo 0125" },
  { value: "gpt-3.5-turbo-16k-0613", label: "GPT-3.5 Turbo 16K 0613" },
];

export default function SettingsDrawer({ isDrawerOpen, setIsDrawerOpen }: { isDrawerOpen: boolean, setIsDrawerOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
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

  if (!isDrawerOpen) {
    return null;
  }

  return (
    <div className="flex w-full flex-grow flex-col h-full border p-2 rounded-md">
      <div className="flex justify-between items-center pb-2">
        <h2 className="text-lg font-bold">Settings</h2>
        <Button onClick={() => setIsDrawerOpen(false)} variant="outline" size="sm" className="p-1">
          <X />
        </Button>
      </div>
      <hr />
      <div className="w-full mt-4">
        <label htmlFor="model-select">Select OpenAI Model</label>
        <select
          id="model-select"
          value={selectedModel}
          onChange={handleModelChange}
          className="border rounded p-2 w-full"
        >
          {OpenAIModels.map(model => (
            <option key={model.value} value={model.value}>{model.label}</option>
          ))}
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
