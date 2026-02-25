import { ArrowLeft, BookOpen, Calendar, Clock, Share2 } from 'lucide-react'
import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { ShareButton } from '@/components/blog/ShareButton'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { Link } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'
import { urlFor } from '@/lib/sanity/image'
import { getBlogPostBySlug, getBlogPosts, getBlogPostSlugs, type Locale } from '@/lib/sanity/queries'
import { getArticleSchema, getBreadcrumbSchema, getFAQSchema } from '@/lib/schema'
import { generateDynamicPageMetadata, siteConfig, type Locale as SEOLocale } from '@/lib/seo'
import { PortableTextRenderer } from '@/components/ui/PortableTextRenderer'

type BlogPost = {
  _id: string
  author: {
    _id: string
    name: string
    photo: {
      asset: {
        _id: string
        url: string
      }
    } | null
    slug: string
    bio?: string
    jobTitle?: string
  } | null
  category: {
    _id: string
    slug: string
    title: string
  } | null
  content: Array<{
    _key: string
    _type: string
    children?: Array<{
      _key: string
      _type: string
      marks?: string[]
      text?: string
    }>
    style?: string
    [key: string]: unknown
  }>
  coverImage: {
    alt: string | null
    asset: {
      _id: string
      url: string
    }
  } | null
  excerpt: string | null
  featured: boolean
  publishedAt: string | null
  seo: {
    metaDescription: string | null
    metaTitle: string | null
    noIndex: boolean | null
    ogImage: {
      asset: {
        _id: string
        url: string
      }
    } | null
  } | null
  slug: string
  title: string
}

type PageProps = {
  params: Promise<{ locale: string; slug: string }>
}

export async function generateStaticParams() {
  const slugs = await getBlogPostSlugs()
  const params: Array<{ locale: string; slug: string }> = []

  for (const { slug } of slugs) {
    for (const locale of routing.locales) {
      params.push({ locale, slug })
    }
  }

  return params
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params
  const post = await getBlogPostBySlug(slug, locale as Locale) as BlogPost | null

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  // Convert SEO data to expected format with correct types
  const seoData = post.seo ? {
    metaTitle: post.seo.metaTitle,
    metaDescription: post.seo.metaDescription,
    ogImage: post.seo.ogImage?.asset ? { asset: { _ref: post.seo.ogImage.asset._id } } : null,
    noIndex: post.seo.noIndex || false,
  } : null

  // Build options object conditionally to avoid undefined values (exactOptionalPropertyTypes)
  const metadataOptions: Parameters<typeof generateDynamicPageMetadata>[0] = {
    title: post.title,
    locale: locale as SEOLocale,
    path: '/blog/[slug]',
    slug,
    seo: seoData,
    imageUrlBuilder: (img) => urlFor(img).width(1200).height(630).url(),
  }

  if (post.excerpt) {
    metadataOptions.description = post.excerpt
  }

  if (post.coverImage?.asset) {
    const imgUrl = post.coverImage.asset.url
    metadataOptions.fallbackImage = (imgUrl.startsWith('/') || imgUrl.startsWith('http'))
      ? imgUrl
      : urlFor(post.coverImage).width(1200).height(630).url()
  }

  const metadata = await generateDynamicPageMetadata(metadataOptions)

  // Add article-specific OG tags
  const articleUrl = locale === 'ro' ? `${siteConfig.baseUrl}/blog/${post.slug}` : `${siteConfig.baseUrl}/${locale}/blog/${post.slug}`
  return {
    ...metadata,
    openGraph: {
      ...metadata.openGraph,
      type: 'article',
      url: articleUrl,
      ...(post.publishedAt ? { publishedTime: post.publishedAt } : {}),
      ...(post.author?.name ? { authors: [post.author.name] } : {}),
      ...(post.category?.title ? { section: post.category.title } : {}),
    },
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { locale, slug } = await params
  setRequestLocale(locale)

  const post = await getBlogPostBySlug(slug, locale as Locale) as BlogPost | null

  if (!post) {
    notFound()
  }

  // Fetch related posts from the same category
  const relatedPosts = post.category
    ? await getBlogPosts(locale as Locale, {
        categorySlug: post.category.slug,
        limit: 3,
      })
    : []

  // Filter out current post from related posts
  const filteredRelatedPosts = (relatedPosts as BlogPost[]).filter((p) => p._id !== post._id)

  return <BlogPostContent locale={locale} post={post} relatedPosts={filteredRelatedPosts.slice(0, 2)} />
}

async function BlogPostContent({
  locale,
  post,
  relatedPosts,
}: {
  locale: string
  post: BlogPost
  relatedPosts: BlogPost[]
}) {
  const t = await getTranslations()

  const localeMap: Record<string, string> = { ro: 'ro-RO', en: 'en-US', hu: 'hu-HU' }
  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return t('blog.noDate')
    return new Date(dateStr).toLocaleDateString(localeMap[locale] || 'ro-RO', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  }

  // Resolve cover image URL — local images use direct path, Sanity images use urlFor
  const getCoverImageUrl = (width: number, height: number) => {
    if (!post.coverImage?.asset) return ''
    const url = post.coverImage.asset.url
    if (url.startsWith('/') || url.startsWith('http')) return url
    return urlFor(post.coverImage).width(width).height(height).url()
  }

  // Resolve author photo URL
  const getAuthorPhotoUrl = (width: number, height: number) => {
    if (!post.author?.photo?.asset) return null
    const url = post.author.photo.asset.url
    if (url.startsWith('/') || url.startsWith('http')) return url
    return urlFor(post.author.photo).width(width).height(height).url()
  }

  // Calculate reading time and word count
  const getContentStats = () => {
    if (!post.content) return { readingTime: 5, wordCount: 0 }
    const textContent = post.content
      .filter((block) => block._type === 'block')
      .map((block) =>
        (block.children || [])
          .map((child: { text?: string }) => child.text || '')
          .join(' ')
      )
      .join(' ')
    const wordCount = textContent.split(/\s+/).length
    const readingTime = Math.max(Math.ceil(wordCount / 200), 3)
    return { readingTime, wordCount }
  }

  // Extract FAQ pairs from content for schema
  const extractFAQs = () => {
    if (!post.content) return []
    const faqs: { question: string; answer: string }[] = []
    let currentQuestion = ''

    for (const block of post.content) {
      if (block._type !== 'block' || !block.children) continue
      const text = (block.children || [])
        .map((c: { text?: string }) => c.text || '')
        .join('')

      // Detect bold-only paragraphs ending with ? as FAQ questions
      const isBoldQuestion = block.style === 'normal'
        && block.children?.length === 1
        && block.children[0]?.marks?.includes('strong')
        && text.endsWith('?')

      if (isBoldQuestion) {
        currentQuestion = text
      } else if (currentQuestion && block.style === 'normal') {
        faqs.push({ question: currentQuestion, answer: text })
        currentQuestion = ''
      }
    }
    return faqs
  }

  const { readingTime, wordCount } = getContentStats()
  const faqs = extractFAQs()
  const articleUrl = locale === 'ro' ? `${siteConfig.baseUrl}/blog/${post.slug}` : `${siteConfig.baseUrl}/${locale}/blog/${post.slug}`
  const authorPhotoUrl = getAuthorPhotoUrl(144, 144)
  const authorPhotoSmall = getAuthorPhotoUrl(72, 72)

  return (
    <div className="flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getArticleSchema({
            title: post.title,
            description: post.excerpt || '',
            url: articleUrl,
            datePublished: post.publishedAt || new Date().toISOString(),
            ...(post.author?.name ? { author: post.author.name } : {}),
            ...(post.author?.slug ? { authorUrl: `${siteConfig.baseUrl}/echipa/${post.author.slug}` } : {}),
            ...(post.author?.jobTitle ? { authorJobTitle: post.author.jobTitle } : {}),
            ...(post.coverImage?.asset ? {
              image: getCoverImageUrl(1200, 630).startsWith('/') ? `${siteConfig.baseUrl}${getCoverImageUrl(1200, 630)}` : getCoverImageUrl(1200, 630)
            } : {}),
            wordCount,
            ...(post.category?.title ? { articleSection: post.category.title } : {}),
            inLanguage: locale,
          }))
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getBreadcrumbSchema([
            { name: t('navigation.home'), url: locale === 'ro' ? siteConfig.baseUrl : `${siteConfig.baseUrl}/${locale}` },
            { name: 'Blog', url: locale === 'ro' ? `${siteConfig.baseUrl}/blog` : `${siteConfig.baseUrl}/${locale}/blog` },
            { name: post.title, url: articleUrl },
          ]))
        }}
      />
      {faqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(getFAQSchema(faqs)) }}
        />
      )}

      {/* Hero Section */}
      <section className="gradient-hero pt-28 pb-10 md:pt-36 md:pb-14">
        <div className="container">
          <ScrollReveal animation="fade-up">
            <div className="max-w-4xl mx-auto">
              {/* Breadcrumb Navigation */}
              <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm mb-8">
                <Link className="text-[#8b7355]/70 hover:text-[#8b7355] transition-colors" href="/">
                  {t('navigation.home')}
                </Link>
                <span className="text-[#8b7355]/40">/</span>
                <Link className="text-[#8b7355]/70 hover:text-[#8b7355] transition-colors" href="/blog">
                  Blog
                </Link>
                {post.category && (
                  <>
                    <span className="text-[#8b7355]/40">/</span>
                    <Link
                      className="text-[#8b7355] font-medium"
                      href={`/blog?category=${post.category.slug}` as '/blog'}
                    >
                      {post.category.title}
                    </Link>
                  </>
                )}
              </nav>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--color-foreground)] mb-8 leading-[1.15] tracking-tight">
                {post.title}
              </h1>

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-4 md:gap-6 text-[var(--color-muted-foreground)]">
                {/* Author */}
                {post.author && (
                  <Link
                    className="flex items-center gap-2.5 hover:text-[#8b7355] transition-colors"
                    href={{ params: { slug: post.author.slug }, pathname: '/echipa/[slug]' }}
                  >
                    {authorPhotoSmall ? (
                      <div className="w-9 h-9 rounded-full ring-2 ring-[#e8e0d5] overflow-hidden flex-shrink-0 relative">
                        <Image
                          fill
                          alt={post.author.name}
                          className="object-cover object-top scale-[1.8] origin-top"
                          src={authorPhotoSmall}
                        />
                      </div>
                    ) : (
                      <div className="w-9 h-9 rounded-full bg-[#faf6f1] border border-[#e8e0d5] flex items-center justify-center">
                        <span className="text-xs font-bold text-[#8b7355]">
                          {post.author.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                        </span>
                      </div>
                    )}
                    <span className="font-medium text-[var(--color-foreground)]">{post.author.name}</span>
                  </Link>
                )}

                <span className="hidden md:block w-px h-5 bg-[#d4c4b0]" />

                {/* Date */}
                <time className="flex items-center gap-1.5" dateTime={post.publishedAt || undefined}>
                  <Calendar className="w-4 h-4" strokeWidth={1.5} />
                  {formatDate(post.publishedAt)}
                </time>

                {/* Reading Time */}
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" strokeWidth={1.5} />
                  {readingTime} {t('blog.minRead')}
                </span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Cover Image */}
      {post.coverImage?.asset && (
        <section style={{ backgroundColor: '#ffffff' }}>
          <div className="container max-w-4xl -mt-6 md:-mt-8">
            <figure className="relative aspect-[16/9] rounded-2xl md:rounded-3xl overflow-hidden shadow-[0_8px_40px_-8px_rgba(0,0,0,0.12)] border border-[#e8e0d5]">
              <Image
                fill
                priority
                alt={post.coverImage.alt || post.title}
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 896px"
                src={getCoverImageUrl(1200, 675)}
              />
            </figure>
          </div>
        </section>
      )}

      {/* Content */}
      <article className="pt-10 pb-16 md:pt-14 md:pb-20" style={{ backgroundColor: '#ffffff' }}>
        <div className="container">
          <div className="max-w-[740px] mx-auto">
            {/* Excerpt */}
            {post.excerpt && (
              <p className="text-xl md:text-[1.35rem] text-[var(--color-muted-foreground)] leading-[1.8] mb-10 pb-10 border-b border-[#e8e0d5]">
                {post.excerpt}
              </p>
            )}

            {/* Article Content */}
            {post.content && (
              <PortableTextRenderer
                className="text-[var(--color-foreground)] text-[1.0625rem] leading-[1.85] [&>p]:mb-6 [&>h2]:mt-12 [&>h2]:mb-5 [&>h3]:mt-10 [&>h3]:mb-4 [&>blockquote]:my-8 [&>blockquote]:border-[#8b7355] [&>figure]:my-10"
                value={post.content}
              />
            )}

            {/* Share Section */}
            <div className="mt-14 p-5 md:p-6 bg-[#faf6f1] border border-[#e8e0d5] rounded-2xl">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <span className="flex items-center gap-2.5 text-[var(--color-foreground)] font-medium text-sm">
                  <div className="w-9 h-9 rounded-full bg-white border border-[#e8e0d5] flex items-center justify-center">
                    <Share2 className="w-4 h-4 text-[#8b7355]" strokeWidth={1.5} />
                  </div>
                  {t('blog.shareArticle')}
                </span>
                <div className="flex gap-2">
                  <ShareButton title={post.title} text={post.excerpt || ''} />
                </div>
              </div>
            </div>

            {/* Author Bio - E-E-A-T */}
            {post.author && (
              <div className="mt-10 p-6 md:p-8 bg-[#faf6f1] border border-[#e8e0d5] rounded-2xl md:rounded-3xl">
                <div className="flex flex-col sm:flex-row items-start gap-5">
                  {authorPhotoUrl ? (
                    <div className="w-[88px] h-[88px] rounded-2xl ring-3 ring-[#e8e0d5] overflow-hidden flex-shrink-0 relative">
                      <Image
                        fill
                        alt={post.author.name}
                        className="object-cover object-top scale-[1.8] origin-top"
                        src={authorPhotoUrl}
                      />
                    </div>
                  ) : (
                    <div className="w-[88px] h-[88px] rounded-2xl bg-white border-2 border-[#e8e0d5] flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl font-bold text-[#8b7355]">
                        {post.author.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </span>
                    </div>
                  )}
                  <div className="flex-1">
                    <p className="text-xs font-semibold tracking-widest uppercase text-[#8b7355] mb-1">{t('blog.writtenBy')}</p>
                    <Link
                      className="text-lg font-bold text-[var(--color-foreground)] hover:text-[#8b7355] transition-colors"
                      href={{ params: { slug: post.author.slug }, pathname: '/echipa/[slug]' }}
                    >
                      {post.author.name}
                    </Link>
                    {post.author.jobTitle && (
                      <p className="text-sm text-[#8b7355] font-medium mt-0.5">{post.author.jobTitle}</p>
                    )}
                    {post.author.bio && (
                      <p className="text-sm text-[var(--color-muted-foreground)] leading-relaxed mt-2">
                        {post.author.bio}
                      </p>
                    )}
                    <Link
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-[#8b7355] hover:text-[#2a2118] transition-colors mt-3"
                      href={{ params: { slug: post.author.slug }, pathname: '/echipa/[slug]' }}
                    >
                      {t('blog.viewAllPosts')}
                      <ArrowLeft className="w-3.5 h-3.5 rotate-180" strokeWidth={2} />
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="section" style={{ backgroundColor: '#f5f0e8' }}>
          <div className="container">
            <ScrollReveal animation="fade-up">
              <div className="text-center mb-10">
                <span className="inline-block text-xs font-semibold tracking-widest uppercase text-[#8b7355] mb-3">Blog</span>
                <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-foreground)]">
                  {t('blog.relatedPosts')}
                </h2>
              </div>
            </ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {relatedPosts.map((relatedPost, index) => (
                <ScrollReveal key={relatedPost._id} animation="fade-up" delay={index * 200}>
                  <article className="bg-white border border-[#e8e0d5] rounded-2xl md:rounded-3xl shadow-[0_4px_24px_-4px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_50px_-12px_rgba(139,115,85,0.2)] hover:border-[#d4c4b0] hover:-translate-y-1.5 transition-all duration-300 overflow-hidden group">
                    <Link href={{ params: { slug: relatedPost.slug }, pathname: '/blog/[slug]' }}>
                      <div className="aspect-[16/10] relative overflow-hidden bg-[#f5f0e8]">
                        {relatedPost.coverImage?.asset ? (
                          <Image
                            fill
                            alt={relatedPost.coverImage.alt || relatedPost.title}
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                            sizes="(max-width: 768px) 100vw, 400px"
                            src={relatedPost.coverImage.asset.url.startsWith('/') ? relatedPost.coverImage.asset.url : urlFor(relatedPost.coverImage).width(600).height(375).url()}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <BookOpen className="w-12 h-12 text-[#8b7355]/40" strokeWidth={1} />
                          </div>
                        )}
                      </div>
                    </Link>
                    <div className="p-6">
                      <div className="flex items-center gap-2 text-sm text-[var(--color-muted-foreground)] mb-3">
                        <Calendar className="w-3.5 h-3.5" strokeWidth={1.5} />
                        {formatDate(relatedPost.publishedAt)}
                      </div>
                      <h3 className="text-lg font-semibold text-[var(--color-foreground)] line-clamp-2 group-hover:text-[#8b7355] transition-colors">
                        <Link href={{ params: { slug: relatedPost.slug }, pathname: '/blog/[slug]' }}>
                          {relatedPost.title}
                        </Link>
                      </h3>
                    </div>
                  </article>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

    </div>
  )
}
