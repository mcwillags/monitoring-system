import { useEffect, useRef } from 'react';

const AUDIO_FILES = {
  LOVE_SOSA: '/dangerAudio.mp3',
  CHEAP: '/dangerAudio1.0.mp3',
};

export type AudioFiles = keyof typeof AUDIO_FILES;
export const useAudio = (audioFile: AudioFiles, audioPlayTime = 5000) => {
  const audio = useRef(new Audio(AUDIO_FILES[audioFile]));

  useEffect(() => {
    audio.current.playbackRate = 1;
    audio.current.volume = 1;
  }, []);

  const playSound = async (callback: () => void) => {
    await audio.current.play();

    await new Promise((res) => setTimeout(res, audioPlayTime));

    callback();

    audio.current.currentTime = 0;
    await audio.current.pause();
  };

  return {
    playSound,
  };
};
