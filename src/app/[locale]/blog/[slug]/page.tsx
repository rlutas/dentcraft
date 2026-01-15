import { ArrowLeft, BookOpen, Calendar, Clock, Share2, User } from 'lucide-react'
import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'
import { urlFor } from '@/lib/sanity/image'
import { getBlogPostBySlug, getBlogPosts, getBlogPostSlugs, type Locale } from '@/lib/sanity/queries'
import { generateDynamicPageMetadata, type Locale as SEOLocale } from '@/lib/seo'
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
    metadataOptions.fallbackImage = urlFor(post.coverImage).width(1200).height(630).url()
  }

  return generateDynamicPageMetadata(metadataOptions)
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

  return <BlogPostContent post={post} relatedPosts={filteredRelatedPosts.slice(0, 2)} />
}

async function BlogPostContent({
  post,
  relatedPosts,
}: {
  post: BlogPost
  relatedPosts: BlogPost[]
}) {
  const t = await getTranslations()

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return t('blog.noDate')
    return new Date(dateStr).toLocaleDateString('ro-RO', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  }

  // Calculate reading time based on content
  const calculateReadingTime = () => {
    if (!post.content) return 5
    const textContent = post.content
      .filter((block) => block._type === 'block')
      .map((block) =>
        (block.children || [])
          .map((child: { text?: string }) => child.text || '')
          .join(' ')
      )
      .join(' ')
    const words = textContent.split(/\s+/).length
    const minutes = Math.ceil(words / 200)
    return Math.max(minutes, 3)
  }

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="gradient-hero">
        <div className="container section">
          <div className="max-w-4xl mx-auto">
            {/* Back Link */}
            <Link
              className="inline-flex items-center gap-2 text-sm text-muted hover:text-[var(--color-primary)] mb-8 transition-colors"
              href="/blog"
            >
              <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
              {t('blog.viewAllPosts')}
            </Link>

            {/* Category Badge */}
            {post.category && (
              <Link
                className="inline-block px-3 py-1 bg-[var(--color-primary)] text-white text-sm font-medium rounded-full mb-4"
                href={`/blog?category=${post.category.slug}` as '/blog'}
              >
                {post.category.title}
              </Link>
            )}

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--color-text)] mb-6">
              {post.title}
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 md:gap-6 text-muted">
              {/* Author */}
              {post.author && (
                <Link
                  className="flex items-center gap-2 hover:text-[var(--color-primary)] transition-colors"
                  href={{ params: { slug: post.author.slug }, pathname: '/echipa/[slug]' }}
                >
                  {post.author.photo?.asset ? (
                    <Image
                      alt={post.author.name}
                      className="rounded-full"
                      height={32}
                      src={urlFor(post.author.photo).width(64).height(64).url()}
                      width={32}
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-[var(--color-accent-light)] flex items-center justify-center">
                      <User className="w-4 h-4" strokeWidth={1.5} />
                    </div>
                  )}
                  <span className="font-medium">{post.author.name}</span>
                </Link>
              )}

              {/* Date */}
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" strokeWidth={1.5} />
                {formatDate(post.publishedAt)}
              </span>

              {/* Reading Time */}
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" strokeWidth={1.5} />
                {calculateReadingTime()} {t('blog.minRead')}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Cover Image */}
      {post.coverImage?.asset && (
        <section className="bg-white">
          <div className="container max-w-4xl -mt-8">
            <div className="relative aspect-[16/9] rounded-2xl overflow-hidden shadow-xl">
              <Image
                fill
                priority
                alt={post.coverImage.alt || post.title}
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 896px"
                src={urlFor(post.coverImage).width(1200).height(675).url()}
              />
            </div>
          </div>
        </section>
      )}

      {/* Content */}
      <section className="section bg-white">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            {/* Excerpt */}
            {post.excerpt && (
              <p className="text-xl text-muted leading-relaxed mb-8 pb-8 border-b border-[var(--color-border)]">
                {post.excerpt}
              </p>
            )}

            {/* Article Content */}
            {post.content && (
              <PortableTextRenderer
                className="text-[var(--color-text)]"
                value={post.content}
              />
            )}

            {/* Share Section */}
            <div className="mt-12 pt-8 border-t border-[var(--color-border)]">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <span className="flex items-center gap-2 text-muted">
                  <Share2 className="w-5 h-5" strokeWidth={1.5} />
                  {t('blog.shareArticle')}
                </span>
                <div className="flex gap-2">
                  {/* Share buttons would go here - simplified for now */}
                  <button
                    className="p-2 rounded-lg bg-[var(--color-accent-light)] hover:bg-[var(--color-accent)] transition-colors"
                    onClick={() => {
                      if (typeof navigator !== 'undefined' && navigator.share) {
                        navigator.share({
                          text: post.excerpt || '',
                          title: post.title,
                          url: window.location.href,
                        })
                      }
                    }}
                    type="button"
                  >
                    <Share2 className="w-5 h-5" strokeWidth={1.5} />
                  </button>
                </div>
              </div>
            </div>

            {/* Author Bio */}
            {post.author && (
              <div className="mt-12 p-6 bg-[var(--color-accent-light)] rounded-2xl">
                <div className="flex items-start gap-4">
                  {post.author.photo?.asset ? (
                    <Image
                      alt={post.author.name}
                      className="rounded-full"
                      height={64}
                      src={urlFor(post.author.photo).width(128).height(128).url()}
                      width={64}
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-[var(--color-accent)] flex items-center justify-center flex-shrink-0">
                      <User className="w-8 h-8 text-[var(--color-muted)]" strokeWidth={1.5} />
                    </div>
                  )}
                  <div>
                    <p className="text-sm text-muted mb-1">{t('blog.writtenBy')}</p>
                    <Link
                      className="text-lg font-semibold text-[var(--color-text)] hover:text-[var(--color-primary)] transition-colors"
                      href={{ params: { slug: post.author.slug }, pathname: '/echipa/[slug]' }}
                    >
                      {post.author.name}
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="section bg-[var(--color-accent-light)]">
          <div className="container">
            <h2 className="text-2xl font-bold text-[var(--color-text)] mb-8 text-center">
              {t('blog.relatedPosts')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {relatedPosts.map((relatedPost) => (
                <article key={relatedPost._id} className="card overflow-hidden group">
                  <Link href={{ params: { slug: relatedPost.slug }, pathname: '/blog/[slug]' }}>
                    <div className="aspect-[16/10] relative overflow-hidden bg-white">
                      {relatedPost.coverImage?.asset ? (
                        <Image
                          fill
                          alt={relatedPost.coverImage.alt || relatedPost.title}
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 768px) 100vw, 400px"
                          src={urlFor(relatedPost.coverImage).width(600).height(375).url()}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <BookOpen className="w-12 h-12 text-[var(--color-muted)]" strokeWidth={1} />
                        </div>
                      )}
                    </div>
                  </Link>
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-sm text-muted mb-2">
                      <Calendar className="w-4 h-4" strokeWidth={1.5} />
                      {formatDate(relatedPost.publishedAt)}
                    </div>
                    <h3 className="text-lg font-semibold text-[var(--color-text)] line-clamp-2 group-hover:text-[var(--color-primary)] transition-colors">
                      <Link href={{ params: { slug: relatedPost.slug }, pathname: '/blog/[slug]' }}>
                        {relatedPost.title}
                      </Link>
                    </h3>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="section bg-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-text)] mb-4">
              {t('cta.title')}
            </h2>
            <p className="text-body-lg text-muted mb-8">{t('cta.subtitle')}</p>
            <Link className="btn btn-primary" href="/contact">
              {t('common.bookAppointment')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
