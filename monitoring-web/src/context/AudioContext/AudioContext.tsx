import { createContext, PropsWithChildren, useContext, useState } from 'react';

import { AudioFiles, useAudio } from '@hooks';

interface IAudioContext {
  startPlaying: () => void;
}

interface AudioContextProviderProps {
  audioFile?: AudioFiles;
}

const AudioContext = createContext({} as IAudioContext);

export const useAudioPlayer = () => {
  return useContext(AudioContext);
};

export const AudioContextProvider = ({
  children,
  audioFile = 'CHEAP',
}: PropsWithChildren<AudioContextProviderProps>) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const { playSound } = useAudio(audioFile, 22_000);

  const startPlaying = () => {
    if (isPlaying) return;
    playSound(() => {
      setIsPlaying(false);
    });

    setIsPlaying(true);
  };

  return <AudioContext.Provider value={{ startPlaying }}>{children}</AudioContext.Provider>;
};
