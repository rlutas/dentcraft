'use client'

import Image from 'next/image'
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'

type ComparisonSliderProps = {
  afterAlt?: string
  afterLabel?: string
  afterSrc: string
  beforeAlt?: string
  beforeLabel?: string
  beforeSrc: string
  className?: string
}

export function ComparisonSlider({
  afterAlt = 'After',
  afterLabel = 'After',
  afterSrc,
  beforeAlt = 'Before',
  beforeLabel = 'Before',
  beforeSrc,
  className = '',
}: ComparisonSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [sliderPosition, setSliderPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)

  // Calculate position from event coordinates
  const calculatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return 50

    const rect = containerRef.current.getBoundingClientRect()
    const x = clientX - rect.left
    const percentage = (x / rect.width) * 100

    // Clamp between 0 and 100
    return Math.max(0, Math.min(100, percentage))
  }, [])

  // Mouse event handlers
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    setIsDragging(true)
    setSliderPosition(calculatePosition(e.clientX))
  }, [calculatePosition])

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return
    setSliderPosition(calculatePosition(e.clientX))
  }, [isDragging, calculatePosition])

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  // Touch event handlers
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const touch = e.touches[0]
    if (touch) {
      setIsDragging(true)
      setSliderPosition(calculatePosition(touch.clientX))
    }
  }, [calculatePosition])

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isDragging) return
    const touch = e.touches[0]
    if (touch) {
      e.preventDefault() // Prevent scrolling while dragging
      setSliderPosition(calculatePosition(touch.clientX))
    }
  }, [isDragging, calculatePosition])

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false)
  }, [])

  // Global event listeners for mouse/touch move and up
  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', handleMouseUp)
      window.addEventListener('touchmove', handleTouchMove, { passive: false })
      window.addEventListener('touchend', handleTouchEnd)

      return () => {
        window.removeEventListener('mousemove', handleMouseMove)
        window.removeEventListener('mouseup', handleMouseUp)
        window.removeEventListener('touchmove', handleTouchMove)
        window.removeEventListener('touchend', handleTouchEnd)
      }
    }
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove, handleTouchEnd])

  // Keyboard accessibility
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    const step = 5
    switch (e.key) {
      case 'ArrowLeft':
        e.preventDefault()
        setSliderPosition((prev) => Math.max(0, prev - step))
        break
      case 'ArrowRight':
        e.preventDefault()
        setSliderPosition((prev) => Math.min(100, prev + step))
        break
      case 'Home':
        e.preventDefault()
        setSliderPosition(0)
        break
      case 'End':
        e.preventDefault()
        setSliderPosition(100)
        break
    }
  }, [])

  // Memoize styles for performance
  const beforeClipPath = useMemo(() => ({
    clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
  }), [sliderPosition])

  const sliderStyle = useMemo(() => ({
    left: `${sliderPosition}%`,
  }), [sliderPosition])

  return (
    <div
      ref={containerRef}
      aria-label="Before and after comparison slider"
      aria-valuemax={100}
      aria-valuemin={0}
      aria-valuenow={Math.round(sliderPosition)}
      className={`relative w-full aspect-[4/3] overflow-hidden rounded-xl select-none ${className} ${
        isDragging ? 'cursor-grabbing' : 'cursor-grab'
      }`}
      role="slider"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
    >
      {/* After image (bottom layer, fully visible) */}
      <div className="absolute inset-0">
        <Image
          fill
          loading="lazy"
          alt={afterAlt}
          className="object-cover"
          draggable={false}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
          src={afterSrc}
        />
        {/* After label - positioned on right side */}
        <span className="absolute bottom-4 right-4 px-3 py-1.5 bg-[var(--color-primary)] text-white text-sm font-medium rounded-lg shadow-lg z-10">
          {afterLabel}
        </span>
      </div>

      {/* Before image (top layer, clipped to reveal after) */}
      <div
        className="absolute inset-0 transition-none"
        style={beforeClipPath}
      >
        <Image
          fill
          loading="lazy"
          alt={beforeAlt}
          className="object-cover"
          draggable={false}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
          src={beforeSrc}
        />
        {/* Before label - positioned on left side */}
        <span className="absolute bottom-4 left-4 px-3 py-1.5 bg-black/70 text-white text-sm font-medium rounded-lg shadow-lg z-10">
          {beforeLabel}
        </span>
      </div>

      {/* Slider divider line */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg z-20 transform -translate-x-1/2 pointer-events-none"
        style={sliderStyle}
      />

      {/* Slider handle */}
      <div
        className={`absolute top-1/2 z-30 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center transition-transform ${
          isDragging ? 'scale-110' : 'hover:scale-105'
        }`}
        style={sliderStyle}
      >
        {/* Handle arrows */}
        <div className="flex items-center gap-0.5">
          <svg
            className="w-4 h-4 text-[var(--color-primary)]"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.5}
            viewBox="0 0 24 24"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
          <svg
            className="w-4 h-4 text-[var(--color-primary)]"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.5}
            viewBox="0 0 24 24"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </div>
      </div>

      {/* Instruction hint - only shown on first interaction */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-3 py-1.5 bg-black/50 text-white text-xs rounded-full z-10 opacity-0 animate-fade-in-out pointer-events-none">
        Drag to compare
      </div>
    </div>
  )
}

export default ComparisonSlider
