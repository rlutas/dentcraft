'use client'

import { useState } from 'react'
import { DoctorVideoCard } from './DoctorVideoCard'

type Video = {
  videoId: string
  posterSrc: string
  posterAlt: string
  doctorName: string
  doctorRole: string
  delay?: string
}

type Props = {
  videos: Video[]
}

export function DoctorVideosGrid({ videos }: Props) {
  const [activeId, setActiveId] = useState<string | null>(null)

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
      {videos.map((v) => (
        <DoctorVideoCard
          key={v.videoId}
          {...v}
          isPlaying={activeId === v.videoId}
          onPlay={() => setActiveId(v.videoId)}
        />
      ))}
    </div>
  )
}
