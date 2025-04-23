import { Suspense } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { BlogPostLoading } from "@/components/loading-skeletons"
import { getBlogPostBySlug, getBlogPostHeadings, mapBlogPostsResponse } from "@/lib/api"
import { notFound } from "next/navigation"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Share2, Facebook, Twitter, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TableOfContents } from "@/components/table-of-contents"
import type { Metadata } from "next"

interface BlogPostPageProps {
  params: { slug: string }
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  try {
    const post = await getBlogPostBySlug(params.slug)
    const mappedPost = mapBlogPostsResponse([post])[0]

    return {
      title: `${mappedPost.title} | Developer Portfolio`,
      description: mappedPost.excerpt,
    }
  } catch (error) {
    return {
      title: "Blog Post | Developer Portfolio",
      description: "Read our latest blog post",
    }
  }
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="container py-12 md:py-20">
        <Suspense fallback={<BlogPostLoading />}>
          <BlogPostContent slug={params.slug} />
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}

async function BlogPostContent({ slug }: { slug: string }) {
  try {
    const [postData, headingsData] = await Promise.all([getBlogPostBySlug(slug), getBlogPostHeadings(slug)])

    const post = mapBlogPostsResponse([postData])[0]

    return (
      <article className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{post.readingTime} min read</span>
            </div>
          </div>

          {post.coverImage && (
            <div className="relative aspect-video w-full mb-8 rounded-lg overflow-hidden">
              <Image src={post.coverImage || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
            </div>
          )}

          <div className="flex items-center gap-3 mb-8">
            <div className="relative w-10 h-10 rounded-full overflow-hidden bg-muted">
              <Image
                src={post.author.avatar || "/placeholder.svg?height=40&width=40"}
                alt={post.author.name}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <div className="font-medium">{post.author.name}</div>
              <div className="text-sm text-muted-foreground">{post.author.title}</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <div
              className="prose dark:prose-invert max-w-none mb-8"
              dangerouslySetInnerHTML={{ __html: post.content || "" }}
            />

            <div className="flex flex-wrap gap-2 mb-8">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="border-t border-border pt-6">
              <div className="flex items-center gap-4">
                <span className="font-medium">Share:</span>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Facebook className="h-4 w-4" />
                  <span className="sr-only">Share on Facebook</span>
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Twitter className="h-4 w-4" />
                  <span className="sr-only">Share on Twitter</span>
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Linkedin className="h-4 w-4" />
                  <span className="sr-only">Share on LinkedIn</span>
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Share2 className="h-4 w-4" />
                  <span className="sr-only">Copy link</span>
                </Button>
              </div>
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="sticky top-24">
              <h3 className="font-medium mb-4">Table of Contents</h3>
              <TableOfContents headings={headingsData} />
            </div>
          </div>
        </div>
      </article>
    )
  } catch (error) {
    console.error(`Failed to load blog post with slug ${slug}:`, error)
    notFound()
  }
}
