#!/usr/bin/env npx tsx

/**
 * Google Reviews Sync Script for Dentcraft
 *
 * This script fetches Google reviews using SerpAPI and saves them to the local JSON file.
 * It can also import reviews from a manual JSON file.
 *
 * Usage:
 *   # Fetch from SerpAPI (requires SERPAPI_KEY environment variable)
 *   npm run sync-reviews
 *
 *   # Import from a manual JSON file
 *   npm run sync-reviews -- --import /path/to/reviews.json
 *
 *   # Merge new reviews with existing (don't overwrite)
 *   npm run sync-reviews -- --merge
 *
 *   # Dry run (show what would be saved without saving)
 *   npm run sync-reviews -- --dry-run
 *
 * Environment Variables:
 *   SERPAPI_KEY - Your SerpAPI API key (get one at https://serpapi.com)
 *
 * @author Dentcraft Development Team
 */

import * as fs from 'fs'
import * as path from 'path'

// Configuration
const CONFIG = {
  // Dentcraft Google Place ID (extracted from Google Maps URL)
  PLACE_ID: 'ChIJL242SZwFOEcRGfUpTMfB-MU',
  // Data CID for the place
  DATA_CID: '0x4738059c49336e2f:0xc5f8c1c74c29f519',
  // Output file path
  OUTPUT_FILE: path.join(__dirname, '..', 'src', 'data', 'google-reviews.json'),
  // SerpAPI endpoint
  SERPAPI_ENDPOINT: 'https://serpapi.com/search.json',
  // Google Maps URL for reviews
  GOOGLE_MAPS_URL:
    'https://www.google.com/maps/place/DENTCRAFT/@47.7897,22.8747,17z/data=!4m8!3m7!1s0x4738059c49336e2f:0xc5f8c1c74c29f519!8m2!3d47.7897!4d22.8747!9m1!1b1!16s%2Fg%2F11j20h5jw3',
}

// TypeScript interfaces
interface GoogleReview {
  id: string
  author: string
  rating: number
  date: string
  text: string
  photoUrl: string | null
  relativeDate?: string | undefined
  localGuide?: boolean | undefined
  reviewCount?: number | undefined
  photoCount?: number | undefined
}

interface GoogleReviewsData {
  placeId: string
  rating: number
  totalReviews: number
  lastUpdated: string
  googleMapsUrl: string
  reviews: GoogleReview[]
}

interface SerpAPIReview {
  user?: {
    name?: string
    link?: string
    thumbnail?: string
    reviews?: number
    photos?: number
    local_guide?: boolean
  }
  rating?: number
  date?: string
  snippet?: string
  likes?: number
  response?: {
    date?: string
    snippet?: string
  }
}

interface SerpAPIResponse {
  place_info?: {
    rating?: number
    reviews?: number
  }
  reviews?: SerpAPIReview[]
  error?: string
}

interface ImportedReview {
  author?: string
  name?: string
  rating?: number
  stars?: number
  date?: string
  time?: string
  text?: string
  review?: string
  content?: string
  snippet?: string
  photoUrl?: string
  photo?: string
  avatar?: string
  thumbnail?: string
  profile_photo_url?: string
}

// Parsed arguments type
interface ParsedArgs {
  import: string | undefined
  merge: boolean
  dryRun: boolean
  help: boolean
}

// Parse command line arguments
function parseArgs(): ParsedArgs {
  const args = process.argv.slice(2)
  const result: ParsedArgs = { merge: false, dryRun: false, help: false, import: undefined }

  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case '--import':
      case '-i':
        result.import = args[++i]
        break
      case '--merge':
      case '-m':
        result.merge = true
        break
      case '--dry-run':
      case '-d':
        result.dryRun = true
        break
      case '--help':
      case '-h':
        result.help = true
        break
    }
  }

  return result
}

// Show help message
function showHelp(): void {
  console.log(`
Google Reviews Sync Script for Dentcraft
=========================================

Usage:
  npm run sync-reviews [options]

Options:
  --import, -i <file>  Import reviews from a JSON file
  --merge, -m          Merge new reviews with existing (don't overwrite)
  --dry-run, -d        Show what would be saved without saving
  --help, -h           Show this help message

Environment Variables:
  SERPAPI_KEY          Your SerpAPI API key (required for API fetch)

Examples:
  # Fetch from SerpAPI
  SERPAPI_KEY=your_key npm run sync-reviews

  # Import from file and merge with existing
  npm run sync-reviews -- --import ./reviews-export.json --merge

  # Dry run to preview changes
  npm run sync-reviews -- --dry-run
`)
}

// Load existing reviews from JSON file
function loadExistingReviews(): GoogleReviewsData | null {
  try {
    if (fs.existsSync(CONFIG.OUTPUT_FILE)) {
      const content = fs.readFileSync(CONFIG.OUTPUT_FILE, 'utf-8')
      return JSON.parse(content) as GoogleReviewsData
    }
  } catch (error) {
    console.warn('Warning: Could not load existing reviews file:', error)
  }
  return null
}

// Save reviews to JSON file
function saveReviews(data: GoogleReviewsData, dryRun: boolean): void {
  const jsonContent = JSON.stringify(data, null, 2)

  if (dryRun) {
    console.log('\n--- DRY RUN: Would save the following data ---\n')
    console.log(jsonContent)
    console.log('\n--- End of dry run ---\n')
    return
  }

  // Ensure directory exists
  const dir = path.dirname(CONFIG.OUTPUT_FILE)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }

  fs.writeFileSync(CONFIG.OUTPUT_FILE, jsonContent + '\n', 'utf-8')
  console.log(`Reviews saved to: ${CONFIG.OUTPUT_FILE}`)
}

// Get current date in YYYY-MM-DD format
function getCurrentDateString(): string {
  const parts = new Date().toISOString().split('T')
  return parts[0] ?? new Date().toISOString().substring(0, 10)
}

// Generate unique ID for a review
function generateReviewId(author: string, date: string, index: number): string {
  const baseId = `${author.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${date.replace(/[^a-z0-9]/g, '-')}`
  return `${baseId}-${index}`
}

// Fetch reviews from SerpAPI
async function fetchFromSerpAPI(): Promise<GoogleReviewsData> {
  const apiKey = process.env['SERPAPI_KEY']

  if (!apiKey) {
    throw new Error(
      'SERPAPI_KEY environment variable is required. Get your key at https://serpapi.com'
    )
  }

  console.log('Fetching reviews from SerpAPI...')

  // Build the API URL
  const params = new URLSearchParams({
    engine: 'google_maps_reviews',
    data_id: CONFIG.DATA_CID,
    api_key: apiKey,
    hl: 'ro', // Romanian language
    sort_by: 'newestFirst',
  })

  const url = `${CONFIG.SERPAPI_ENDPOINT}?${params.toString()}`

  try {
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`SerpAPI request failed: ${response.status} ${response.statusText}`)
    }

    const data = (await response.json()) as SerpAPIResponse

    if (data.error) {
      throw new Error(`SerpAPI error: ${data.error}`)
    }

    // Transform SerpAPI response to our format
    const reviews: GoogleReview[] = (data.reviews || []).map((review, index) => ({
      id: generateReviewId(review.user?.name || 'anonymous', review.date || '', index),
      author: review.user?.name || 'Anonymous',
      rating: review.rating || 5,
      date: review.date || '',
      text: review.snippet || '',
      photoUrl: review.user?.thumbnail || null,
      localGuide: review.user?.local_guide || false,
      reviewCount: review.user?.reviews,
      photoCount: review.user?.photos,
    }))

    return {
      placeId: CONFIG.PLACE_ID,
      rating: data.place_info?.rating || 4.8,
      totalReviews: data.place_info?.reviews || reviews.length,
      lastUpdated: getCurrentDateString(),
      googleMapsUrl: CONFIG.GOOGLE_MAPS_URL,
      reviews,
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to fetch from SerpAPI: ${error.message}`)
    }
    throw error
  }
}

// Import reviews from a JSON file
function importFromFile(filePath: string): GoogleReviewsData {
  console.log(`Importing reviews from: ${filePath}`)

  if (!fs.existsSync(filePath)) {
    throw new Error(`Import file not found: ${filePath}`)
  }

  const content = fs.readFileSync(filePath, 'utf-8')
  const imported = JSON.parse(content) as
    | ImportedReview[]
    | { reviews: ImportedReview[] }
    | GoogleReviewsData

  // Handle different import formats
  let reviews: ImportedReview[]

  if (Array.isArray(imported)) {
    // Plain array of reviews
    reviews = imported
  } else if ('reviews' in imported && Array.isArray(imported.reviews)) {
    // Object with reviews array
    reviews = imported.reviews as ImportedReview[]
  } else {
    throw new Error('Invalid import format. Expected array of reviews or object with reviews array.')
  }

  // Transform to our format
  const transformedReviews: GoogleReview[] = reviews.map((review, index) => ({
    id: generateReviewId(review.author || review.name || 'anonymous', review.date || review.time || '', index),
    author: review.author || review.name || 'Anonymous',
    rating: review.rating || review.stars || 5,
    date: review.date || review.time || '',
    text: review.text || review.review || review.content || review.snippet || '',
    photoUrl: review.photoUrl || review.photo || review.avatar || review.thumbnail || review.profile_photo_url || null,
  }))

  // Calculate average rating
  const avgRating =
    transformedReviews.length > 0
      ? Math.round(
          (transformedReviews.reduce((sum, r) => sum + r.rating, 0) / transformedReviews.length) * 10
        ) / 10
      : 4.8

  return {
    placeId: CONFIG.PLACE_ID,
    rating: avgRating,
    totalReviews: transformedReviews.length,
    lastUpdated: getCurrentDateString(),
    googleMapsUrl: CONFIG.GOOGLE_MAPS_URL,
    reviews: transformedReviews,
  }
}

// Merge two review datasets
function mergeReviews(existing: GoogleReviewsData, newData: GoogleReviewsData): GoogleReviewsData {
  console.log('Merging reviews...')

  // Create a map of existing reviews by author and text (for deduplication)
  const existingSet = new Set(existing.reviews.map((r) => `${r.author}|${r.text.substring(0, 50)}`))

  // Add new reviews that don't exist
  const newReviews = newData.reviews.filter(
    (r) => !existingSet.has(`${r.author}|${r.text.substring(0, 50)}`)
  )

  console.log(`Found ${newReviews.length} new reviews to add`)

  // Combine and re-sort by date (newest first is approximate since dates are relative)
  const allReviews = [...newReviews, ...existing.reviews]

  // Update existing reviews with photo URLs if they were null
  const updatedReviews = allReviews.map((existingReview) => {
    const matchingNew = newData.reviews.find(
      (n) => n.author === existingReview.author && n.text.substring(0, 30) === existingReview.text.substring(0, 30)
    )
    if (matchingNew && matchingNew.photoUrl && !existingReview.photoUrl) {
      return { ...existingReview, photoUrl: matchingNew.photoUrl }
    }
    return existingReview
  })

  // Re-assign IDs
  const finalReviews = updatedReviews.map((review, index) => ({
    ...review,
    id: String(index + 1),
  }))

  return {
    placeId: CONFIG.PLACE_ID,
    rating: newData.rating || existing.rating,
    totalReviews: Math.max(finalReviews.length, newData.totalReviews || 0),
    lastUpdated: getCurrentDateString(),
    googleMapsUrl: CONFIG.GOOGLE_MAPS_URL,
    reviews: finalReviews,
  }
}

// Main function
async function main(): Promise<void> {
  console.log('=== Dentcraft Google Reviews Sync ===\n')

  const args = parseArgs()

  if (args.help) {
    showHelp()
    return
  }

  let reviewsData: GoogleReviewsData

  try {
    if (args.import) {
      // Import from file
      reviewsData = importFromFile(args.import)
    } else {
      // Fetch from SerpAPI
      reviewsData = await fetchFromSerpAPI()
    }

    // Merge with existing if requested
    if (args.merge) {
      const existing = loadExistingReviews()
      if (existing) {
        reviewsData = mergeReviews(existing, reviewsData)
      }
    }

    // Save or show dry run
    saveReviews(reviewsData, args.dryRun)

    // Summary
    console.log('\n=== Summary ===')
    console.log(`Total reviews: ${reviewsData.reviews.length}`)
    console.log(`Average rating: ${reviewsData.rating}`)
    console.log(`Reviews with photos: ${reviewsData.reviews.filter((r) => r.photoUrl).length}`)
    console.log(`Last updated: ${reviewsData.lastUpdated}`)
  } catch (error) {
    console.error('\nError:', error instanceof Error ? error.message : error)
    process.exit(1)
  }
}

// Run the script
main()
