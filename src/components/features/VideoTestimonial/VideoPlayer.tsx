'use client'

import { Pause, Play, Volume2, VolumeOff, X } from 'lucide-react'
import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'

type VideoSource = {
  type: 'youtube' | 'vimeo' | 'direct'
  url: string
  videoId?: string
}

type VideoPlayerProps = {
  className?: string
  onClose?: () => void
  posterUrl?: string
  showCloseButton?: boolean
  title?: string
  videoUrl: string
}

// Parse video URL to determine source type and extract video ID
function parseVideoUrl(url: string): VideoSource {
  // YouTube patterns
  const youtubePatterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/,
  ]

  for (const pattern of youtubePatterns) {
    const match = url.match(pattern)
    if (match && match[1]) {
      return { type: 'youtube', url, videoId: match[1] }
    }
  }

  // Vimeo patterns
  const vimeoPatterns = [
    /vimeo\.com\/(\d+)/,
    /player\.vimeo\.com\/video\/(\d+)/,
  ]

  for (const pattern of vimeoPatterns) {
    const match = url.match(pattern)
    if (match && match[1]) {
      return { type: 'vimeo', url, videoId: match[1] }
    }
  }

  // Direct video file
  return { type: 'direct', url }
}

// Generate YouTube thumbnail URL
function getYouTubeThumbnail(videoId: string): string {
  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
}

// Generate Vimeo thumbnail URL (placeholder - actual thumbnails require API call)
function getVimeoThumbnail(): string {
  return '' // Vimeo requires API call for thumbnails
}

export function VideoPlayer({
  className = '',
  onClose,
  posterUrl,
  showCloseButton = false,
  title,
  videoUrl,
}: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [showControls, setShowControls] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const videoSource = parseVideoUrl(videoUrl)

  // Determine poster image
  const poster = posterUrl || (
    videoSource.type === 'youtube' && videoSource.videoId
      ? getYouTubeThumbnail(videoSource.videoId)
      : videoSource.type === 'vimeo'
        ? getVimeoThumbnail()
        : undefined
  )

  // Handle play/pause for direct videos
  const togglePlay = useCallback(() => {
    if (videoSource.type === 'direct' && videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    } else {
      // For YouTube/Vimeo, start playing (embed will handle its own controls)
      setIsPlaying(true)
    }
  }, [isPlaying, videoSource.type])

  // Handle mute toggle for direct videos
  const toggleMute = useCallback(() => {
    if (videoSource.type === 'direct' && videoRef.current) {
      videoRef.current.muted = !isMuted
    }
    setIsMuted(!isMuted)
  }, [isMuted, videoSource.type])

  // Auto-hide controls after 3 seconds
  const resetControlsTimeout = useCallback(() => {
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current)
    }
    setShowControls(true)
    if (isPlaying) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false)
      }, 3000)
    }
  }, [isPlaying])

  // Handle mouse movement to show controls
  const handleMouseMove = useCallback(() => {
    resetControlsTimeout()
  }, [resetControlsTimeout])

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current)
      }
    }
  }, [])

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === ' ' || e.key === 'k') {
        e.preventDefault()
        togglePlay()
      } else if (e.key === 'm') {
        e.preventDefault()
        toggleMute()
      } else if (e.key === 'Escape' && onClose) {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose, toggleMute, togglePlay])

  return (
    <div
      className={`relative w-full aspect-video bg-black rounded-xl overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
    >
      {!isPlaying && poster ? (
        // Thumbnail with play button
        <div className="relative w-full h-full">
          <Image
            fill
            alt={title || 'Video thumbnail'}
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            src={poster}
          />
          <div className="absolute inset-0 bg-black/30" />

          {/* Play button overlay */}
          <button
            aria-label="Play video"
            className="absolute inset-0 flex items-center justify-center group"
            type="button"
            onClick={togglePlay}
          >
            <div className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <Play className="w-9 h-9 text-[var(--color-primary)] ml-1" fill="currentColor" />
            </div>
          </button>

          {/* Title overlay */}
          {title && (
            <div className="absolute bottom-4 left-4 right-4">
              <p className="text-white text-body-lg font-medium drop-shadow-md">
                {title}
              </p>
            </div>
          )}
        </div>
      ) : videoSource.type === 'youtube' && videoSource.videoId ? (
        // YouTube embed
        <iframe
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
          src={`https://www.youtube.com/embed/${videoSource.videoId}?autoplay=1&mute=${isMuted ? 1 : 0}&rel=0`}
          title={title || 'YouTube video'}
        />
      ) : videoSource.type === 'vimeo' && videoSource.videoId ? (
        // Vimeo embed
        <iframe
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
          src={`https://player.vimeo.com/video/${videoSource.videoId}?autoplay=1&muted=${isMuted ? 1 : 0}`}
          title={title || 'Vimeo video'}
        />
      ) : (
        // Direct video file
        <video
          ref={videoRef}
          autoPlay={isPlaying}
          className="w-full h-full object-contain"
          muted={isMuted}
          playsInline
          poster={poster}
          onClick={togglePlay}
          onEnded={() => setIsPlaying(false)}
          onPause={() => setIsPlaying(false)}
          onPlay={() => setIsPlaying(true)}
        >
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}

      {/* Controls overlay for direct video */}
      {videoSource.type === 'direct' && isPlaying && (
        <div
          className={`absolute inset-0 transition-opacity duration-300 ${
            showControls ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* Play/Pause center button */}
          <button
            aria-label={isPlaying ? 'Pause video' : 'Play video'}
            className="absolute inset-0 flex items-center justify-center"
            type="button"
            onClick={togglePlay}
          >
            <div className={`w-16 h-16 rounded-full bg-black/50 flex items-center justify-center transition-opacity ${
              showControls ? 'opacity-100' : 'opacity-0'
            }`}>
              {isPlaying ? (
                <Pause className="w-8 h-8 text-white" fill="currentColor" />
              ) : (
                <Play className="w-8 h-8 text-white ml-1" fill="currentColor" />
              )}
            </div>
          </button>

          {/* Bottom controls bar */}
          <div className={`absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent transition-opacity ${
            showControls ? 'opacity-100' : 'opacity-0'
          }`}>
            <div className="flex items-center justify-between">
              {/* Mute button */}
              <button
                aria-label={isMuted ? 'Unmute' : 'Mute'}
                className="w-10 h-10 rounded-full bg-black/50 flex items-center justify-center hover:bg-black/70 transition-colors"
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  toggleMute()
                }}
              >
                {isMuted ? (
                  <VolumeOff className="w-5 h-5 text-white" />
                ) : (
                  <Volume2 className="w-5 h-5 text-white" />
                )}
              </button>

              {/* Title */}
              {title && (
                <p className="text-white text-body-sm font-medium">
                  {title}
                </p>
              )}

              <div className="w-10" /> {/* Spacer for alignment */}
            </div>
          </div>
        </div>
      )}

      {/* Mute indicator for YouTube/Vimeo */}
      {(videoSource.type === 'youtube' || videoSource.type === 'vimeo') && isPlaying && (
        <button
          aria-label={isMuted ? 'Unmute' : 'Mute'}
          className="absolute bottom-4 left-4 w-10 h-10 rounded-full bg-black/50 flex items-center justify-center hover:bg-black/70 transition-colors z-10"
          type="button"
          onClick={toggleMute}
        >
          {isMuted ? (
            <VolumeOff className="w-5 h-5 text-white" />
          ) : (
            <Volume2 className="w-5 h-5 text-white" />
          )}
        </button>
      )}

      {/* Close button */}
      {showCloseButton && onClose && (
        <button
          aria-label="Close video"
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 flex items-center justify-center hover:bg-black/70 transition-colors z-10"
          type="button"
          onClick={onClose}
        >
          <X className="w-5 h-5 text-white" />
        </button>
      )}
    </div>
  )
}

export default VideoPlayer
