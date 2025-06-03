"use client";

import { useState, useRef, useEffect } from "react";
import { 
  Play, Pause, Volume2, VolumeX, SkipBack, SkipForward, 
  Maximize, Minimize, Settings, ChevronLeft 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger 
} from "@/components/ui/sheet";
import type { VideoQuality, Subtitle } from "@/lib/types";

interface VideoPlayerProps {
  title: string;
  videoUrl: string;
  videoQualityOptions: VideoQuality[];
  subtitles?: Subtitle[];
  poster?: string;
  onBack?: () => void;
}

export default function VideoPlayer({
  title,
  videoUrl,
  videoQualityOptions,
  subtitles,
  poster,
  onBack
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [selectedQuality, setSelectedQuality] = useState<string>(
    videoQualityOptions[videoQualityOptions.length - 1]?.quality ?? "1080p"
  );
  const [selectedSubtitle, setSelectedSubtitle] = useState<string | null>(null);
  const [showQualityMenu, setShowQualityMenu] = useState(false);
  
  // Hide controls after inactivity
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    const handleActivity = () => {
      setShowControls(true);
      clearTimeout(timeout);
      
      if (isPlaying) {
        timeout = setTimeout(() => {
          setShowControls(false);
        }, 3000);
      }
    };
    
    const playerElement = playerRef.current;
    if (playerElement) {
      playerElement.addEventListener("mousemove", handleActivity);
      playerElement.addEventListener("click", handleActivity);
    }
    
    return () => {
      clearTimeout(timeout);
      if (playerElement) {
        playerElement.removeEventListener("mousemove", handleActivity);
        playerElement.removeEventListener("click", handleActivity);
      }
    };
  }, [isPlaying]);
  
  // Set up video event listeners
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    
    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
    };
    
    const handleLoadedMetadata = () => {
      setDuration(video.duration);
    };
    
    const handleEnded = () => {
      setIsPlaying(false);
    };
    
    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("ended", handleEnded);
    
    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("ended", handleEnded);
    };
  }, []);
  
  // Fullscreen change detection
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);
  
  // Handle play/pause
  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    
    if (isPlaying) {
      video.pause();
    } else {
      void video.play();
    }
    
    setIsPlaying(!isPlaying);
  };
  
  // Handle mute/unmute
  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    
    video.muted = !isMuted;
    setIsMuted(!isMuted);
  };
  
  // Handle volume change
  const handleVolumeChange = (value: number[]) => {
    const video = videoRef.current;
    if (!video) return;
    
    const newVolume = value[0];
    video.volume = newVolume;
    setVolume(newVolume);
    
    if (newVolume === 0) {
      video.muted = true;
      setIsMuted(true);
    } else if (isMuted) {
      video.muted = false;
      setIsMuted(false);
    }
  };
  
  // Handle seek
  const handleSeek = (value: number[]) => {
    const video = videoRef.current;
    if (!video) return;
    
    const seekTime = value[0];
    video.currentTime = seekTime;
    setCurrentTime(seekTime);
  };
  
  // Handle quality change
  const changeQuality = (quality: string) => {
    const video = videoRef.current;
    if (!video) return;
    
    const currentTime = video.currentTime;
    const wasPlaying = isPlaying;
    
    const option = videoQualityOptions.find(opt => opt.quality === quality);
    if (option) {
      video.src = option.url;
      video.currentTime = currentTime;
      
      if (wasPlaying) {
        void video.play().then(() => {
          setIsPlaying(true);
        }).catch(error => {
          console.error("Error playing video:", error);
          setIsPlaying(false);
        });
      }
      
      setSelectedQuality(quality);
      setShowQualityMenu(false);
    }
  };
  
  // Handle subtitle change
  const changeSubtitle = (language: string | null) => {
    const video = videoRef.current;
    if (!video) return;
    
    // Remove all existing text tracks
    while (video.textTracks.length > 0) {
      // This is a workaround for removing text tracks
      // TypeScript doesn't have proper types for this operation
      const track = video.textTracks[0];
      track?.mode && (track.mode = 'disabled');
    }
    
    if (language && subtitles) {
      const subtitle = subtitles.find(sub => sub.language === language);
      if (subtitle) {
        const track = document.createElement("track");
        track.kind = "subtitles";
        track.label = subtitle.language;
        track.srclang = subtitle.language.toLowerCase().substring(0, 2);
        track.src = subtitle.url;
        track.default = true;
        
        video.appendChild(track);
      }
    }
    
    setSelectedSubtitle(language);
  };
  
  // Handle fullscreen toggle
  const toggleFullscreen = () => {
    if (!playerRef.current) return;
    
    if (!document.fullscreenElement) {
      void playerRef.current.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err instanceof Error ? err.message : 'Unknown error'}`);
      });
    } else {
      void document.exitFullscreen();
    }
  };
  
  // Format time (seconds to MM:SS)
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  // Get current video source based on selected quality
  const currentVideoSource = videoQualityOptions.find(
    opt => opt.quality === selectedQuality
  )?.url ?? videoUrl;
  
  return (
    <div 
      ref={playerRef}
      className="relative w-full h-full bg-black overflow-hidden"
    >
      {/* Video */}
      <video
        ref={videoRef}
        src={currentVideoSource}
        poster={poster}
        className="w-full h-full object-contain"
        onClick={togglePlay}
      />
      
      {/* Back button - always visible */}
      {onBack && (
        <button
          onClick={onBack}
          className="absolute top-4 left-4 z-20 bg-black/50 p-2 rounded-full hover:bg-black/70 transition-colors"
        >
          <ChevronLeft className="h-6 w-6 text-white" />
          <span className="sr-only">Back</span>
        </button>
      )}
      
      {/* Controls overlay */}
      <div 
        className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 flex flex-col justify-between p-4 transition-opacity duration-300 ${
          showControls ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Top controls */}
        <div className="flex items-center justify-between">
          <h2 className="text-white text-lg font-medium">{title}</h2>
        </div>
        
        {/* Center play/pause button */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Button
            variant="ghost"
            size="icon"
            className="h-16 w-16 rounded-full bg-black/30 hover:bg-black/50 text-white"
            onClick={togglePlay}
          >
            {isPlaying ? (
              <Pause className="h-8 w-8" />
            ) : (
              <Play className="h-8 w-8" />
            )}
          </Button>
        </div>
        
        {/* Bottom controls */}
        <div className="space-y-2">
          {/* Progress bar */}
          <div 
            ref={progressBarRef}
            className="relative h-1 bg-white/30 rounded-full cursor-pointer"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const percent = (e.clientX - rect.left) / rect.width;
              if (videoRef.current) {
                const newTime = percent * duration;
                videoRef.current.currentTime = newTime;
                setCurrentTime(newTime);
              }
            }}
          >
            <div 
              className="absolute top-0 left-0 h-full bg-red-600 rounded-full"
              style={{ width: `${(currentTime / duration) * 100}%` }}
            />
          </div>
          
          {/* Controls row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {/* Play/Pause */}
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-white hover:bg-white/10"
                onClick={togglePlay}
              >
                {isPlaying ? (
                  <Pause className="h-5 w-5" />
                ) : (
                  <Play className="h-5 w-5" />
                )}
              </Button>
              
              {/* Skip backward 10s */}
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-white hover:bg-white/10"
                onClick={() => {
                  if (videoRef.current) {
                    videoRef.current.currentTime = Math.max(0, currentTime - 10);
                  }
                }}
              >
                <SkipBack className="h-5 w-5" />
              </Button>
              
              {/* Skip forward 10s */}
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-white hover:bg-white/10"
                onClick={() => {
                  if (videoRef.current) {
                    videoRef.current.currentTime = Math.min(duration, currentTime + 10);
                  }
                }}
              >
                <SkipForward className="h-5 w-5" />
              </Button>
              
              {/* Volume */}
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-white hover:bg-white/10"
                  onClick={toggleMute}
                >
                  {isMuted || volume === 0 ? (
                    <VolumeX className="h-5 w-5" />
                  ) : (
                    <Volume2 className="h-5 w-5" />
                  )}
                </Button>
              </div>
              
              {/* Time */}
              <div className="text-white text-sm">
                {formatTime(currentTime)} / {formatTime(duration)}
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              {/* Quality selector */}
              <Sheet open={showQualityMenu} onOpenChange={setShowQualityMenu}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-white hover:bg-white/10"
                  >
                    <Settings className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="bg-zinc-900 text-white border-zinc-800">
                  <SheetHeader>
                    <SheetTitle className="text-white">Settings</SheetTitle>
                  </SheetHeader>
                  <div className="py-4">
                    <h3 className="mb-2 text-sm font-medium">Quality</h3>
                    <div className="space-y-1">
                      {videoQualityOptions.map((option) => (
                        <button
                          key={option.quality}
                          className={`w-full text-left px-3 py-2 rounded-md ${
                            selectedQuality === option.quality
                              ? "bg-white/20"
                              : "hover:bg-white/10"
                          }`}
                          onClick={() => changeQuality(option.quality)}
                        >
                          {option.quality}
                        </button>
                      ))}
                    </div>
                    
                    {subtitles && subtitles.length > 0 && (
                      <>
                        <h3 className="mt-4 mb-2 text-sm font-medium">Subtitles</h3>
                        <div className="space-y-1">
                          <button
                            className={`w-full text-left px-3 py-2 rounded-md ${
                              selectedSubtitle === null
                                ? "bg-white/20"
                                : "hover:bg-white/10"
                            }`}
                            onClick={() => changeSubtitle(null)}
                          >
                            Off
                          </button>
                          {subtitles.map((subtitle) => (
                            <button
                              key={subtitle.language}
                              className={`w-full text-left px-3 py-2 rounded-md ${
                                selectedSubtitle === subtitle.language
                                  ? "bg-white/20"
                                  : "hover:bg-white/10"
                              }`}
                              onClick={() => changeSubtitle(subtitle.language)}
                            >
                              {subtitle.language}
                            </button>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
              
              {/* Fullscreen toggle */}
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-white hover:bg-white/10"
                onClick={toggleFullscreen}
              >
                {isFullscreen ? (
                  <Minimize className="h-5 w-5" />
                ) : (
                  <Maximize className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 