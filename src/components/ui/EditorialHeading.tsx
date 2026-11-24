import { cn } from '@/lib/utils'

type Props = {
  bold: string
  italic: string
  as?: 'h1' | 'h2' | 'h3'
  /** 'light' = deep brown on cream/white; 'dark' = white + sand italic on dark bands. */
  tone?: 'light' | 'dark'
  size?: 'hero' | 'section' | 'compact'
  className?: string
}

const sizes = {
  hero: 'text-4xl md:text-5xl lg:text-6xl',
  section: 'text-3xl md:text-4xl lg:text-5xl',
  compact: 'text-3xl md:text-4xl',
}

/**
 * Static "Bold / serif italic" heading — same voice as AnimatedServiceHeading,
 * but server-rendered and visible on first paint (safe for h1 / LCP text).
 */
export function EditorialHeading({ bold, italic, as: Tag = 'h2', tone = 'light', size = 'section', className }: Props) {
  return (
    <Tag
      className={cn(
        'font-bold leading-[0.95] tracking-normal',
        sizes[size],
        tone === 'dark' ? 'text-white' : 'text-[#2a2118]',
        className,
      )}
    >
      <span className="block">{bold}</span>{' '}
      <span
        className={cn(
          'block font-serif italic font-medium pb-1 mt-1 tracking-wide',
          tone === 'dark' ? 'text-[#d4c4b0]' : 'text-[#8b7355]',
        )}
      >
        {italic}
      </span>
    </Tag>
  )
}
