'use client'

import Image from 'next/image'
import { urlFor } from '@/lib/sanity/image'

// Types for Portable Text blocks - using flexible types to handle various Sanity content
type PortableTextBlock = {
  _key: string
  _type: string
  children?: Array<{
    _key: string
    _type: string
    marks?: string[]
    text?: string
  }>
  level?: number
  listItem?: 'bullet' | 'number' | string
  markDefs?: Array<{
    _key: string
    _type: string
    href?: string
  }>
  style?: string // Allow any string for flexibility
  // For image blocks
  alt?: string
  asset?: {
    _id: string
    url: string
  }
  caption?: string
  // For video embeds
  url?: string
  // Allow additional properties
  [key: string]: unknown
}

type PortableTextRendererProps = {
  className?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any[] // Use any[] to accept various Sanity content structures
}

export function PortableTextRenderer({ className = '', value }: PortableTextRendererProps) {
  if (!value || !Array.isArray(value)) {
    return null
  }

  const renderMark = (
    mark: string,
    text: string,
    markDefs: Array<{ _key: string; _type: string; href?: string }> = []
  ): React.ReactNode => {
    // Check for link marks
    const linkDef = markDefs.find((def) => def._key === mark && def._type === 'link')
    if (linkDef?.href) {
      return (
        <a
          className="text-[var(--color-primary)] hover:underline"
          href={linkDef.href}
          rel="noopener noreferrer"
          target={linkDef.href.startsWith('http') ? '_blank' : undefined}
        >
          {text}
        </a>
      )
    }

    // Standard marks
    switch (mark) {
      case 'strong':
        return <strong className="font-semibold">{text}</strong>
      case 'em':
        return <em>{text}</em>
      case 'underline':
        return <span className="underline">{text}</span>
      case 'code':
        return (
          <code className="px-1.5 py-0.5 bg-[var(--color-accent-light)] rounded text-sm font-mono">
            {text}
          </code>
        )
      default:
        return text
    }
  }

  const renderChildren = (
    children: Array<{
      _key: string
      _type: string
      marks?: string[]
      text?: string
    }>,
    markDefs: Array<{ _key: string; _type: string; href?: string }> = []
  ): React.ReactNode => {
    return children.map((child) => {
      if (child._type !== 'span' || !child.text) {
        return null
      }

      let content: React.ReactNode = child.text

      // Apply marks in reverse order to nest properly
      const marks = child.marks || []
      for (const mark of [...marks].reverse()) {
        content = renderMark(mark, content as string, markDefs)
      }

      return <span key={child._key}>{content}</span>
    })
  }

  const renderBlock = (block: PortableTextBlock, index: number): React.ReactNode => {
    // Handle image blocks
    if (block._type === 'image' && block.asset) {
      return (
        <figure key={block._key || index} className="my-8">
          <div className="relative aspect-video rounded-lg overflow-hidden bg-[var(--color-accent-light)]">
            <Image
              fill
              alt={block.alt || ''}
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 800px"
              src={urlFor(block).width(1200).url()}
            />
          </div>
          {block.caption && (
            <figcaption className="mt-2 text-sm text-center text-muted">{block.caption}</figcaption>
          )}
        </figure>
      )
    }

    // Handle video embeds
    if (block._type === 'videoEmbed' && block.url) {
      const videoUrl = block.url
      const isYouTube = videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be')
      const isVimeo = videoUrl.includes('vimeo.com')

      if (isYouTube || isVimeo) {
        let embedUrl = videoUrl
        if (isYouTube) {
          const videoId = videoUrl.includes('youtu.be')
            ? videoUrl.split('youtu.be/')[1]?.split('?')[0]
            : videoUrl.split('v=')[1]?.split('&')[0]
          embedUrl = `https://www.youtube.com/embed/${videoId}`
        } else if (isVimeo) {
          const videoId = videoUrl.split('vimeo.com/')[1]?.split('?')[0]
          embedUrl = `https://player.vimeo.com/video/${videoId}`
        }

        return (
          <div key={block._key || index} className="my-8 aspect-video">
            <iframe
              allowFullScreen
              className="w-full h-full rounded-lg"
              src={embedUrl}
              title="Video"
            />
          </div>
        )
      }
    }

    // Handle text blocks
    if (block._type !== 'block' || !block.children) {
      return null
    }

    const content = renderChildren(block.children, block.markDefs)

    // Handle list items
    if (block.listItem === 'bullet') {
      return (
        <li key={block._key || index} className="ml-4">
          {content}
        </li>
      )
    }
    if (block.listItem === 'number') {
      return (
        <li key={block._key || index} className="ml-4">
          {content}
        </li>
      )
    }

    // Handle different styles
    switch (block.style) {
      case 'h2':
        return (
          <h2
            key={block._key || index}
            className="text-2xl font-bold text-[var(--color-text)] mt-8 mb-4"
          >
            {content}
          </h2>
        )
      case 'h3':
        return (
          <h3
            key={block._key || index}
            className="text-xl font-semibold text-[var(--color-text)] mt-6 mb-3"
          >
            {content}
          </h3>
        )
      case 'h4':
        return (
          <h4
            key={block._key || index}
            className="text-lg font-semibold text-[var(--color-text)] mt-4 mb-2"
          >
            {content}
          </h4>
        )
      case 'blockquote':
        return (
          <blockquote
            key={block._key || index}
            className="my-6 pl-4 border-l-4 border-[var(--color-primary)] italic text-muted"
          >
            {content}
          </blockquote>
        )
      case 'normal':
      default:
        return (
          <p key={block._key || index} className="mb-4 leading-relaxed">
            {content}
          </p>
        )
    }
  }

  // Group consecutive list items
  const groupedBlocks: Array<PortableTextBlock | PortableTextBlock[]> = []
  let currentList: PortableTextBlock[] = []
  let currentListType: 'bullet' | 'number' | null = null

  for (const block of value) {
    if (block.listItem) {
      if (currentListType === block.listItem) {
        currentList.push(block)
      } else {
        if (currentList.length > 0) {
          groupedBlocks.push(currentList)
        }
        currentList = [block]
        currentListType = block.listItem
      }
    } else {
      if (currentList.length > 0) {
        groupedBlocks.push(currentList)
        currentList = []
        currentListType = null
      }
      groupedBlocks.push(block)
    }
  }
  if (currentList.length > 0) {
    groupedBlocks.push(currentList)
  }

  return (
    <div className={`prose prose-lg max-w-none ${className}`}>
      {groupedBlocks.map((item, index) => {
        if (Array.isArray(item)) {
          // Render list
          const firstItem = item[0]
          if (!firstItem) return null
          const listType = firstItem.listItem
          const ListTag = listType === 'number' ? 'ol' : 'ul'
          return (
            <ListTag
              key={`list-${index}`}
              className={`my-4 ${listType === 'number' ? 'list-decimal' : 'list-disc'} pl-6`}
            >
              {item.map((block, blockIndex) => renderBlock(block, blockIndex))}
            </ListTag>
          )
        }
        return renderBlock(item, index)
      })}
    </div>
  )
}
