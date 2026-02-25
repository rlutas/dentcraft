'use client'

import { Share2 } from 'lucide-react'

export function ShareButton({ title, text }: { title: string; text: string }) {
  const handleShare = () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      navigator.share({
        title,
        text,
        url: window.location.href,
      })
    } else if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(window.location.href)
    }
  }

  return (
    <button
      className="p-2 rounded-lg bg-[var(--color-accent-light)] hover:bg-[var(--color-accent)] transition-colors"
      onClick={handleShare}
      type="button"
      aria-label="Share"
    >
      <Share2 className="w-5 h-5" strokeWidth={1.5} />
    </button>
  )
}
