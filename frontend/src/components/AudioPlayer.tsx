import React, { useState, useRef, useEffect } from 'react';
import { formatTime } from '@/lib/utils';
import { Track } from '@/types';

interface AudioPlayerProps {
  tracks: Track[];
}

export default function AudioPlayer({ tracks }: AudioPlayerProps) {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [showPlaylist, setShowPlaylist] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const currentTrack = tracks[currentTrackIndex] ?? tracks[0];

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  if (!currentTrack) return null;

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  };

  const nextTrack = () => {
    const nextIdx = (currentTrackIndex + 1) % tracks.length;
    setCurrentTrackIndex(nextIdx);
    setCurrentTime(0);
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch(() => {});
      }
    }, 150);
  };

  const prevTrack = () => {
    const prevIdx = (currentTrackIndex - 1 + tracks.length) % tracks.length;
    setCurrentTrackIndex(prevIdx);
    setCurrentTime(0);
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch(() => {});
      }
    }, 150);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration || 0);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const seekTo = parseFloat(e.target.value);
    setCurrentTime(seekTo);
    if (audioRef.current) {
      audioRef.current.currentTime = seekTo;
    }
  };

  const selectTrack = (index: number) => {
    setCurrentTrackIndex(index);
    setShowPlaylist(false);
    setCurrentTime(0);
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch(() => {});
      }
    }, 150);
  };

  return (
    <section
      id="experience"
      className="relative z-30 bg-[#121214] border-y border-white/10 shadow-2xl"
    >
      <audio
        ref={audioRef}
        src={currentTrack.audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={nextTrack}
        preload="metadata"
      />

      <div className="w py-3 sm:py-4">
        <div className="flex items-center justify-between gap-3 sm:gap-6">
          {/* Track Info & Vinyl Animation */}
          <div className="flex items-center gap-3 sm:gap-4 w-auto sm:w-1/4 shrink-0">
            <div className="relative overflow-hidden rounded-full w-12 h-12 sm:w-14 sm:h-14 shrink-0 border-2 border-white/20 shadow-md">
              <img
                src={currentTrack.coverImage}
                alt={currentTrack.title}
                className={`w-full h-full object-cover rounded-full pointer-events-none select-none spin-slow ${
                  isPlaying ? 'running' : 'paused'
                }`}
              />
              <div className="absolute inset-0 m-auto w-3.5 h-3.5 rounded-full bg-neutral-900 border border-white/40" />
            </div>

            <div className="flex flex-col justify-center min-w-0">
              <h4 className="font-semibold text-white truncate max-w-[130px] sm:max-w-[200px] text-xs sm:text-sm">
                {currentTrack.title}
              </h4>
              <p className="text-gray-400 text-[11px] sm:text-xs truncate max-w-[130px] sm:max-w-[180px]">
                {currentTrack.artist}
              </p>
            </div>
          </div>

          {/* Central Playback Controls & Progress Bar */}
          <div className="flex items-center flex-1 sm:w-1/2 gap-3 sm:gap-6 justify-center sm:justify-start">
            <div className="flex items-center gap-2 sm:gap-4 shrink-0">
              <button
                onClick={prevTrack}
                aria-label="Previous Track"
                className="text-gray-300 hover:text-white hover:scale-110 transition p-1 cursor-pointer"
              >
                <i className="ri-skip-back-fill text-lg sm:text-xl" />
              </button>

              <button
                onClick={togglePlay}
                aria-label="Play or Pause"
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-accent hover:bg-accent-hover text-white flex items-center justify-center shadow-lg shadow-accent/30 hover:scale-105 transition cursor-pointer"
              >
                {isPlaying ? (
                  <i className="ri-pause-fill text-xl" />
                ) : (
                  <i className="ri-play-fill text-xl translate-x-0.5" />
                )}
              </button>

              <button
                onClick={nextTrack}
                aria-label="Next Track"
                className="text-gray-300 hover:text-white hover:scale-110 transition p-1 cursor-pointer"
              >
                <i className="ri-skip-forward-fill text-lg sm:text-xl" />
              </button>
            </div>

            {/* Desktop Seekbar */}
            <div className="hidden sm:flex items-center w-full max-w-md gap-3 text-xs text-gray-400 font-mono">
              <span className="w-10 shrink-0 text-right">
                {formatTime(currentTime)}
              </span>
              <input
                type="range"
                min={0}
                max={duration || 100}
                value={currentTime}
                onChange={handleSeek}
                className="w-full accent-accent h-1.5 cursor-pointer bg-neutral-800"
                aria-label="Seek bar"
              />
              <span className="w-10 shrink-0">{formatTime(duration)}</span>
            </div>
          </div>

          {/* Volume Control & Playlist Toggle */}
          <div className="flex items-center gap-2 sm:gap-4 w-auto sm:w-1/4 justify-end">
            <div className="relative">
              <button
                onClick={() => setShowPlaylist(!showPlaylist)}
                aria-label="Toggle Playlist"
                className={`p-2 rounded-full transition-colors cursor-pointer ${
                  showPlaylist
                    ? 'bg-accent text-white'
                    : 'text-gray-400 hover:text-white hover:bg-neutral-800'
                }`}
              >
                <i className="ri-play-list-line text-lg" />
              </button>

              {showPlaylist && (
                <div className="absolute right-0 bottom-full mb-3 w-72 sm:w-80 bg-neutral-900/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-3 z-50">
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10">
                    <span className="text-xs uppercase font-semibold text-accent tracking-wider">
                      Concert Tracks
                    </span>
                    <span className="text-[10px] text-gray-400">
                      {tracks.length} Tracks
                    </span>
                  </div>
                  <div className="space-y-1 max-h-56 overflow-y-auto">
                    {tracks.map((track, idx) => (
                      <button
                        key={track.id}
                        onClick={() => selectTrack(idx)}
                        className={`w-full flex items-center justify-between p-2 rounded-xl text-left transition-colors cursor-pointer ${
                          idx === currentTrackIndex
                            ? 'bg-accent/20 text-accent font-medium border border-accent/30'
                            : 'text-gray-300 hover:bg-white/5 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <i
                            className={`${
                              idx === currentTrackIndex && isPlaying
                                ? 'ri-volume-up-fill text-accent'
                                : 'ri-music-fill text-gray-500'
                            } text-sm shrink-0`}
                          />
                          <div className="min-w-0">
                            <p className="text-xs truncate">{track.title}</p>
                            <p className="text-[10px] text-gray-400 truncate">
                              {track.artist}
                            </p>
                          </div>
                        </div>
                        <span className="text-[10px] text-gray-500 shrink-0 ml-2">
                          {track.duration}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="hidden md:flex items-center gap-2 w-28">
              <button
                onClick={() => setVolume(volume === 0 ? 0.8 : 0)}
                aria-label="Toggle mute"
                className="text-gray-400 hover:text-white cursor-pointer"
              >
                {volume === 0 ? (
                  <i className="ri-volume-mute-line text-lg" />
                ) : (
                  <i className="ri-volume-down-line text-lg" />
                )}
              </button>
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-full accent-accent h-1 cursor-pointer bg-neutral-800"
                aria-label="Volume slider"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
