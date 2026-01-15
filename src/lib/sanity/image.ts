import imageUrlBuilder, { type SanityImageSource } from '@sanity/image-url'
import { client } from './client'

const builder = imageUrlBuilder(client)

/**
 * Generate optimized image URLs from Sanity image assets
 *
 * @param source - Sanity image source (from CMS)
 * @returns ImageUrlBuilder instance for chaining transformations
 *
 * @example
 * // Basic usage
 * urlFor(image).url()
 *
 * // With dimensions
 * urlFor(image).width(800).height(600).url()
 *
 * // With quality
 * urlFor(image).width(1200).quality(80).url()
 *
 * // With auto format
 * urlFor(image).width(800).auto('format').url()
 *
 * // For blur placeholder
 * urlFor(image).width(20).blur(10).url()
 */
export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

/**
 * Helper to generate srcset for responsive images
 *
 * @param source - Sanity image source
 * @param widths - Array of widths to generate
 * @param quality - Image quality (default 75)
 * @returns srcset string for use in img or source elements
 */
export function generateSrcSet(
  source: SanityImageSource,
  widths: number[] = [320, 640, 768, 1024, 1280, 1536],
  quality: number = 75
): string {
  return widths
    .map((w) => `${urlFor(source).width(w).quality(quality).auto('format').url()} ${w}w`)
    .join(', ')
}

/**
 * Helper to generate blur data URL for image placeholders
 *
 * @param source - Sanity image source
 * @returns URL for a small blurred version of the image
 */
export function getBlurDataURL(source: SanityImageSource): string {
  return urlFor(source).width(20).blur(10).quality(30).url()
}
