import React, { createContext, ReactNode, useContext, useState } from "react";

type Episode = {
  title: string;
  members: string;
  thumbnail: string;
  duration: number;
  url: string;
};

type PlayerContextData = {
  episodeList: Episode[];
  currentEpisodeIndex: number;
  isPlaying: boolean;
  isLooping: boolean;
  isShuffling: boolean;
  hasNext: boolean;
  hasPrevious: boolean;
  play: (episode: Episode) => void;
  togglePlay: () => void;
  toggleLoop: () => void;
  toggleShuffle: () => void;
  setPlayingState: (state: boolean) => void;
  playList: (list: Episode[], index: number) => void;
  playNext: () => void;
  playPreview: () => void;
  clearPlayerState: () => void;
};

export const PlayerContext = createContext({} as PlayerContextData);

type PlayerContextProviderProps = {
  children: ReactNode;
};

export const PlayerContextProvider: React.FC<PlayerContextProviderProps> = ({
  children,
}) => {
  const [episodeList, setEpisodeList] = useState([]);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);

  function play(episode): void {
    setEpisodeList([episode]);
    setCurrentEpisodeIndex(0);
    setIsPlaying(true);
  }

  function playList(list: Episode[], index: number): void {
    setEpisodeList(list);
    setCurrentEpisodeIndex(index);
    setIsPlaying(true);
  }

  function toggleShuffle() {
    setIsShuffling(!isShuffling);
    if (isLooping) {
      setIsLooping(false);
    }
  }

  function togglePlay(): void {
    setIsPlaying(!isPlaying);
  }
  function toggleLoop(): void {
    setIsLooping(!isLooping);
    if (isShuffling) {
      setIsShuffling(false);
    }
  }

  function setPlayingState(state: boolean): void {
    setIsPlaying(state);
  }

  function clearPlayerState() {
    setEpisodeList([]);
    setCurrentEpisodeIndex(0);
  }

  const hasPrevious = currentEpisodeIndex > 0;
  const hasNext = isShuffling || currentEpisodeIndex + 1 < episodeList.length;

  function playNext(): void {
    if (isShuffling) {
      const nextRandomEpisodeIndex = Math.floor(
        Math.random() * episodeList.length
      );
      setCurrentEpisodeIndex(nextRandomEpisodeIndex);
    } else if (hasNext) {
      setCurrentEpisodeIndex(currentEpisodeIndex + 1);
    }
  }

  function playPreview(): void {
    if (hasPrevious) {
      setCurrentEpisodeIndex(currentEpisodeIndex - 1);
    }
  }

  return (
    <PlayerContext.Provider
      value={{
        episodeList,
        currentEpisodeIndex,
        play,
        isPlaying,
        isLooping,
        togglePlay,
        toggleLoop,
        setPlayingState,
        playList,
        playNext,
        playPreview,
        hasNext,
        toggleShuffle,
        isShuffling,
        hasPrevious,
        clearPlayerState,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => {
  return useContext(PlayerContext);
};
