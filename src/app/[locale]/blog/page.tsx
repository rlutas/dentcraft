import { BookOpen, Calendar, ChevronLeft, ChevronRight, Tag, User } from 'lucide-react'
import type { Metadata } from 'next'
import Image from 'next/image'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { urlFor } from '@/lib/sanity/image'
import {
  getBlogCategories,
  getBlogPosts,
  getBlogPostsCount,
  type Locale,
} from '@/lib/sanity/queries'
import { generatePageMetadata, type Locale as SEOLocale } from '@/lib/seo'

const POSTS_PER_PAGE = 10

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
  slug: string
  title: string
}

type BlogCategory = {
  _id: string
  slug: string
  title: string
}

type PageProps = {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ category?: string; page?: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale })

  return generatePageMetadata({
    title: t('blog.title'),
    description: t('blog.subtitle'),
    locale: locale as SEOLocale,
    path: '/blog',
  })
}

export default async function BlogPage({ params, searchParams }: PageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  const resolvedSearchParams = await searchParams
  const categorySlug = resolvedSearchParams.category
  const currentPage = parseInt(resolvedSearchParams.page || '1', 10)
  const offset = (currentPage - 1) * POSTS_PER_PAGE

  // Build options object without undefined values (exactOptionalPropertyTypes compliance)
  const blogPostOptions: { categorySlug?: string; limit: number; offset: number } = {
    limit: POSTS_PER_PAGE,
    offset,
  }
  if (categorySlug) {
    blogPostOptions.categorySlug = categorySlug
  }

  const [posts, categories, totalCount] = await Promise.all([
    getBlogPosts(locale as Locale, blogPostOptions),
    getBlogCategories(locale as Locale),
    getBlogPostsCount(categorySlug),
  ])

  const totalPages = Math.ceil(totalCount / POSTS_PER_PAGE)

  return (
    <BlogPageContent
      categories={categories as BlogCategory[]}
      categorySlug={categorySlug}
      currentPage={currentPage}
      posts={posts as BlogPost[]}
      totalPages={totalPages}
    />
  )
}

async function BlogPageContent({
  categories,
  categorySlug,
  currentPage,
  posts,
  totalPages,
}: {
  categories: BlogCategory[]
  categorySlug: string | undefined
  currentPage: number
  posts: BlogPost[]
  totalPages: number
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

  // Calculate reading time (rough estimate: 200 words per minute)
  const estimateReadingTime = (excerpt: string | null) => {
    if (!excerpt) return 3
    const words = excerpt.split(/\s+/).length
    const minutes = Math.ceil((words * 5) / 200) // Multiply by 5 since excerpt is just a preview
    return Math.max(minutes, 3) // Minimum 3 minutes
  }

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="gradient-hero">
        <div className="container section">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[var(--color-primary)]/10 mb-6">
              <BookOpen className="w-8 h-8 text-[var(--color-primary)]" strokeWidth={1.5} />
            </div>
            <h1 className="mb-6">{t('blog.title')}</h1>
            <p className="text-body-lg text-muted max-w-2xl mx-auto">{t('blog.subtitle')}</p>
          </div>
        </div>
      </section>

      {/* Categories Filter */}
      {categories.length > 0 && (
        <section className="py-6 bg-white border-b border-[var(--color-border)]">
          <div className="container">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-sm font-medium text-muted">{t('blog.filterBy')}:</span>
              <Link
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  !categorySlug
                    ? 'bg-[var(--color-primary)] text-white'
                    : 'bg-[var(--color-accent-light)] text-[var(--color-text)] hover:bg-[var(--color-accent)]'
                }`}
                href="/blog"
              >
                {t('blog.allCategories')}
              </Link>
              {categories.map((category) => (
                <Link
                  key={category._id}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    categorySlug === category.slug
                      ? 'bg-[var(--color-primary)] text-white'
                      : 'bg-[var(--color-accent-light)] text-[var(--color-text)] hover:bg-[var(--color-accent)]'
                  }`}
                  href={`/blog?category=${category.slug}` as '/blog'}
                >
                  {category.title}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Blog Posts */}
      <section className="section bg-white">
        <div className="container">
          {posts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post) => (
                  <article key={post._id} className="card overflow-hidden group">
                    {/* Cover Image */}
                    <Link
                      href={{ params: { slug: post.slug }, pathname: '/blog/[slug]' }}
                    >
                      <div className="aspect-[16/10] relative overflow-hidden bg-[var(--color-accent-light)]">
                        {post.coverImage?.asset ? (
                          <Image
                            fill
                            alt={post.coverImage.alt || post.title}
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            src={urlFor(post.coverImage).width(600).height(375).url()}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <BookOpen
                              className="w-16 h-16 text-[var(--color-muted)]"
                              strokeWidth={1}
                            />
                          </div>
                        )}
                        {/* Category Badge */}
                        {post.category && (
                          <span className="absolute top-4 left-4 px-3 py-1 bg-[var(--color-primary)] text-white text-xs font-medium rounded-full">
                            {post.category.title}
                          </span>
                        )}
                      </div>
                    </Link>

                    {/* Content */}
                    <div className="p-6">
                      {/* Meta */}
                      <div className="flex items-center gap-4 text-sm text-muted mb-3">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" strokeWidth={1.5} />
                          {formatDate(post.publishedAt)}
                        </span>
                        <span className="flex items-center gap-1">
                          <BookOpen className="w-4 h-4" strokeWidth={1.5} />
                          {estimateReadingTime(post.excerpt)} {t('blog.minRead')}
                        </span>
                      </div>

                      {/* Title */}
                      <h2 className="text-xl font-semibold text-[var(--color-text)] mb-3 line-clamp-2 group-hover:text-[var(--color-primary)] transition-colors">
                        <Link
                          href={{ params: { slug: post.slug }, pathname: '/blog/[slug]' }}
                        >
                          {post.title}
                        </Link>
                      </h2>

                      {/* Excerpt */}
                      {post.excerpt && (
                        <p className="text-body text-muted line-clamp-3 mb-4">{post.excerpt}</p>
                      )}

                      {/* Author */}
                      {post.author && (
                        <div className="flex items-center gap-3 pt-4 border-t border-[var(--color-border)]">
                          {post.author.photo?.asset ? (
                            <Image
                              alt={post.author.name}
                              className="rounded-full"
                              height={36}
                              src={urlFor(post.author.photo).width(72).height(72).url()}
                              width={36}
                            />
                          ) : (
                            <div className="w-9 h-9 rounded-full bg-[var(--color-accent-light)] flex items-center justify-center">
                              <User className="w-4 h-4 text-[var(--color-muted)]" strokeWidth={1.5} />
                            </div>
                          )}
                          <span className="text-sm font-medium text-[var(--color-text)]">
                            {post.author.name}
                          </span>
                        </div>
                      )}
                    </div>
                  </article>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-12">
                  {/* Previous Page */}
                  {currentPage > 1 ? (
                    <Link
                      className="p-2 rounded-lg bg-[var(--color-accent-light)] hover:bg-[var(--color-accent)] transition-colors"
                      href={
                        `${categorySlug ? `/blog?category=${categorySlug}&page=${currentPage - 1}` : `/blog?page=${currentPage - 1}`}` as '/blog'
                      }
                    >
                      <ChevronLeft className="w-5 h-5" strokeWidth={1.5} />
                    </Link>
                  ) : (
                    <span className="p-2 rounded-lg bg-[var(--color-accent-light)] opacity-50 cursor-not-allowed">
                      <ChevronLeft className="w-5 h-5" strokeWidth={1.5} />
                    </span>
                  )}

                  {/* Page Numbers */}
                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                      <Link
                        key={pageNum}
                        className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-medium transition-colors ${
                          pageNum === currentPage
                            ? 'bg-[var(--color-primary)] text-white'
                            : 'bg-[var(--color-accent-light)] text-[var(--color-text)] hover:bg-[var(--color-accent)]'
                        }`}
                        href={
                          `${categorySlug ? `/blog?category=${categorySlug}&page=${pageNum}` : `/blog?page=${pageNum}`}` as '/blog'
                        }
                      >
                        {pageNum}
                      </Link>
                    ))}
                  </div>

                  {/* Next Page */}
                  {currentPage < totalPages ? (
                    <Link
                      className="p-2 rounded-lg bg-[var(--color-accent-light)] hover:bg-[var(--color-accent)] transition-colors"
                      href={
                        `${categorySlug ? `/blog?category=${categorySlug}&page=${currentPage + 1}` : `/blog?page=${currentPage + 1}`}` as '/blog'
                      }
                    >
                      <ChevronRight className="w-5 h-5" strokeWidth={1.5} />
                    </Link>
                  ) : (
                    <span className="p-2 rounded-lg bg-[var(--color-accent-light)] opacity-50 cursor-not-allowed">
                      <ChevronRight className="w-5 h-5" strokeWidth={1.5} />
                    </span>
                  )}
                </div>
              )}
            </>
          ) : (
            /* Empty State */
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[var(--color-accent-light)] mb-6">
                <Tag className="w-8 h-8 text-[var(--color-muted)]" strokeWidth={1.5} />
              </div>
              <h2 className="text-2xl font-semibold text-[var(--color-text)] mb-2">
                {t('blog.noPosts')}
              </h2>
              <p className="text-body text-muted mb-6">{t('blog.noPostsDescription')}</p>
              {categorySlug && (
                <Link className="btn btn-secondary" href="/blog">
                  {t('blog.viewAllPosts')}
                </Link>
              )}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-[var(--color-accent-light)]">
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
