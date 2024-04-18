"use client";
import { Download, Pause, Play, Volume2, VolumeX } from "lucide-react";
import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Howl, Howler } from "howler";

interface AudioPlayerProps {
  src: string;
}

const AudioPlayer: FC<AudioPlayerProps> = ({ src }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentDuration, setCurrentDuration] = useState("00:00");
  const [totalDuration, setTotalDuration] = useState("00:00");
  const sound = useRef<Howl | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const handlePlay = useCallback(() => {
    setIsPlaying(true);
    intervalRef.current = setInterval(() => {
      if (sound.current) {
        const currentTime = sound.current.seek();
        setProgress((currentTime / sound.current.duration()) * 100);
        setCurrentDuration(formatTime(currentTime));
      }
    }, 100);
  }, []);

  const handlePause = useCallback(() => {
    setIsPlaying(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  }, []);

  const handleStop = useCallback(() => {
    setIsPlaying(false);
    setProgress(0);
    setCurrentDuration("00:00");
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  }, []);

  const handleEnd = useCallback(() => {
    setIsPlaying(false);
    setProgress(0);
    setCurrentDuration("00:00");
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  }, []);

  const togglePlay = useCallback(() => {
    if (sound.current) {
      if (isPlaying) {
        sound.current.pause();
        handlePause();
      } else {
        sound.current.play();
        handlePlay();
      }
    }
  }, [isPlaying, handlePlay, handlePause]);

  const toggleMute = useCallback(() => {
    if (sound.current) {
      sound.current.mute(!isMuted);
      setIsMuted(!isMuted);
    }
  }, [isMuted]);

  const handleSliderValueChange = useCallback(
    (value: number) => {
      if (sound.current) {
        const seekTime = (value / 100) * sound.current.duration();
        sound.current.seek(seekTime);
        setCurrentDuration(formatTime(seekTime));
        setProgress(value);

        if (isPlaying) {
          handlePause();
          handlePlay();
        }
      }
    },
    [isPlaying, handlePause, handlePlay]
  );

  const formatTime = useCallback((time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  }, []);

  const handleDownload = useCallback(() => {
    const link = document.createElement("a");
    link.href = src;
    link.download = "audio.mp3";
    link.click();
  }, [src]);

  useEffect(() => {
    sound.current = new Howl({
      src: [src],
      html5: true,
      onplay: handlePlay,
      onpause: handlePause,
      onstop: handleStop,
      onend: handleEnd,
      onload: () => {
        if (sound.current) {
          setTotalDuration(formatTime(sound.current.duration()));
        }
      },
    });

    return () => {
      sound.current?.unload();
    };
  }, [src, handlePlay, handlePause, handleStop, handleEnd, formatTime]);
  return (
    <div className="p-4 rounded-lg border w-full max-w-lg flex items-center gap-4">
      <button
        className="size-12 flex items-center justify-center rounded-full bg-primary hover:bg-primary/90 transition-colors text-transparent focus:ring-2 ring-offset-2 focus-within:ring-primary shrink-0"
        onClick={togglePlay}
      >
        {isPlaying ? (
          <Pause size={24} className="fill-white" />
        ) : (
          <Play size={24} className="fill-white" />
        )}
      </button>
      <div className="w-full flex items-center gap-2.5">
        <div className="flex items-center gap-2.5 w-full">
          <span className="text-muted-foreground font-mono text-sm font-medium">
            {currentDuration}
          </span>
          <Slider
            className="cursor-pointer"
            value={[progress]}
            onValueChange={(value) => handleSliderValueChange(value[0])}
            max={100}
            step={1}
          />
          <span className="text-muted-foreground font-mono text-sm font-medium">
            {totalDuration}
          </span>
        </div>

        <div className="flex gap-2.5 text-muted-foreground">
          <button
            className="hover:text-primary transition-colors"
            onClick={toggleMute}
          >
            {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>
          <button
            onClick={handleDownload}
            className="hover:text-primary transition-colors"
          >
            <Download size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
