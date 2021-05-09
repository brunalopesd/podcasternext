import { platform } from 'node:process';
import { createContext, useState, ReactNode, useContext } from 'react'

type Episode ={
  title: string;
  members: string;
  thumbnail: string;
  duration: number;
  url: string;
}

type PlayerContextData ={
  episodeList: Episode[];
  currentEpisodeIndex: number;
  isPlaying: boolean;
  play: (episode: Episode) => void;
  togglePlay: () => void;
  setPlayingState: (state: boolean) => void;
  playList:(list: Episode[], index: number) => void;
  playPrevious: () => void;
  playNext: () => void;
  hasNext: boolean;
  hasPrevious: boolean;
  isLooping: boolean;
  isShuffling: boolean;
  toggleLoop: () => void;
  toggleShuffle: () => void;
}

export const PlayerContext = createContext({} as PlayerContextData);

type PlayerContextProviderProps = {
  children: ReactNode;

}

export function PlayerContextProvider({children}: PlayerContextProviderProps) {
  const [episodeList, setEpisodeList] = useState([]);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);



  function play(episode: Episode){
    setEpisodeList([episode]);
    setCurrentEpisodeIndex(0);
    setIsPlaying(true);
  }


  function playList(list: Episode[], index: number){
    setEpisodeList(list);
    setCurrentEpisodeIndex(index);
    setIsPlaying(true);
  }

  function togglePlay(){
    setIsPlaying(!isPlaying);
  }

  function toggleLoop(){
    setIsLooping(!isLooping);
  }

  function toggleShuffle(){
    setIsShuffling(!isShuffling);
  }

  function setPlayingState(state: boolean){
    setIsPlaying(state);
  }

  const hasPrevious = currentEpisodeIndex >0;
  const hasNext = currentEpisodeIndex + 1 < episodeList.length

  function playNext() {
    if(isShuffling) {
      const nexrRandomEpisodeIndex = Math.floor(Math.random() * episodeList.length)
      setCurrentEpisodeIndex(nexrRandomEpisodeIndex);
    } else if(hasNext) {
      setCurrentEpisodeIndex(currentEpisodeIndex + 1);
    }
  }

  function playPrevious() {
    if(hasPrevious) {
      setCurrentEpisodeIndex(currentEpisodeIndex - 1);
    }
  }

  return (<PlayerContext.Provider 
  value={ 
    {episodeList,
    currentEpisodeIndex, 
    play, 
    isPlaying,
    isLooping,
    togglePlay, 
    setPlayingState,
    playList,
    playNext,
    playPrevious,
    hasNext,
    hasPrevious,
    toggleLoop,
    isShuffling,
    toggleShuffle,
    }}>
  {children}
  </PlayerContext.Provider>)
}

export const usePlayer= () => {
  return useContext(PlayerContext)
}