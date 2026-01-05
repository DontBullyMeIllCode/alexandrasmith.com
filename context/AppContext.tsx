"use client";

import { ActionDispatch, createContext, useContext, useReducer } from "react";
import * as THREE from "three";

export type AppState = {
  // Action State
  enterExperience: boolean;
  // Ready States
  musicReady: boolean;
  canvasReady: boolean;
  // Music States
  listener: THREE.AudioListener | null;
  audio: THREE.Audio | null;
  audioLoader: THREE.AudioLoader | null;
  audioAnalyser: THREE.AudioAnalyser | null;
};
export type AppDispatch = typeof appStateReducer;

export const AppContext = createContext<AppState | null>(null);
export const AppDispatchContext = createContext<ActionDispatch<
  [action: { type: string }]
> | null>(null);

type AppProviderProps = {
  children: React.ReactNode;
};

export function AppProvider({ children }: AppProviderProps) {
  const [appState, dispatch] = useReducer(appStateReducer, initialAppState);

  return (
    <AppContext value={appState}>
      <AppDispatchContext value={dispatch}>{children}</AppDispatchContext>
    </AppContext>
  );
}

export function useAppContext() {
  return useContext(AppContext)!;
}

export function useAppDispatch() {
  return useContext(AppDispatchContext)!;
}

function appStateReducer(appState: AppState, action: { type: string }) {
  switch (action.type) {
    case "init": {
      const listener = new THREE.AudioListener();
      const audio = new THREE.Audio(listener);
      const audioLoader = new THREE.AudioLoader();
      const audioAnalyser = new THREE.AudioAnalyser(audio);

      return {
        ...appState,
        listener,
        audio,
        audioLoader,
        audioAnalyser,
      };
    }
    case "canvasReady": {
      return {
        ...appState,
        canvasReady: true,
      };
    }
    case "musicReady": {
      return {
        ...appState,
        musicReady: true,
      };
    }
    case "begin": {
      return {
        ...appState,
        enterExperience: true,
      };
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}

const initialAppState = {
  // Action State
  enterExperience: false,
  // Ready States
  musicReady: false,
  canvasReady: false,
  // Music States
  listener: null,
  audio: null,
  audioLoader: null,
  audioAnalyser: null,
};
