import { ChatModel } from "openai/resources";
import { atom, AtomEffect } from "recoil";

export const localStorageEffect =
  <T>(key: string): AtomEffect<T> =>
  ({ setSelf, onSet }) => {
    if (typeof window !== "undefined") {
      const savedValue = localStorage.getItem(key);
      if (savedValue != null) {
        setSelf(JSON.parse(savedValue));
      }

      onSet((newValue, _, isReset) => {
        isReset
          ? localStorage.removeItem(key)
          : localStorage.setItem(key, JSON.stringify(newValue));
      });
    }
  };

export const selectedModelState = atom<ChatModel>({
  key: "selectedModelState",
  default: "gpt-3.5-turbo",
  effects_UNSTABLE: [localStorageEffect("selectedModelState")],
});

export const promptState = atom({
  key: "promptState",
  default: "",
  effects_UNSTABLE: [localStorageEffect("promptState")],
});

export const apiKeyState = atom({
  key: "apiKeyState",
  default: "",
  effects_UNSTABLE: [localStorageEffect("apiKeyState")],
});

export const showApiKeyState = atom({
  key: "showApiKeyState",
  default: false,
  effects_UNSTABLE: [localStorageEffect("showApiKeyState")],
});

export const currentNotes = atom({
  key: "currentNotesState",
  default: "",
  effects_UNSTABLE: [localStorageEffect("currentNotesState")],
});
