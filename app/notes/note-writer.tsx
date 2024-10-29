'use client';

import React, { useCallback, useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { apiKeyState, currentNotes, promptState, selectedModelState } from './atoms';
import { useCompletion } from 'ai/react'

export default function NoteWriter() {
  const [note, setNote] = useRecoilState(currentNotes);
  const apiKey = useRecoilValue(apiKeyState);
  const prompt = useRecoilValue(promptState);
  const model = useRecoilValue(selectedModelState);
  const { isLoading, complete, completion } = useCompletion({ api: '/api/generate', body: { apiKey, model } });

  const handleKeyDown = useCallback(async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.ctrlKey && e.key === 'i') {
      e.preventDefault();
      await complete(prompt + '\n Notes so far: ' + note);
    }
  }, [note]);

  useEffect(() => {
    if (completion) {
      setNote(completion);
    }
  }, [completion]);

  return (
    <div className="flex w-full flex-grow h-full border rounded-md">
      <textarea
        id="note"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        onKeyDown={handleKeyDown}
        className="w-full h-full bg-transparent p-4 text-lg outline-none resize-none"
      />
    </div>
  );
}
