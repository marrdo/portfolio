"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { BlogPostCard } from "@/components/blog-post-card"
import { BlogPostsLoading } from "@/components/loading-skeletons"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, RefreshCw } from "lucide-react"
import { getBlogPosts, mapBlogPostsResponse } from "@/lib/api"
import type { BlogPostType } from "@/lib/types"
import { motion } from "framer-motion"

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPostType[]>([])
  const [filteredPosts, setFilteredPosts] = useState<BlogPostType[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Get all unique tags from posts
  const allTags = Array.from(new Set(posts.flatMap((post) => post.tags)))

  // Fetch blog posts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const postsData = await getBlogPosts()
        const mappedPosts = mapBlogPostsResponse(postsData)
        setPosts(mappedPosts)
        setFilteredPosts(mappedPosts)
      } catch (err) {
        console.error("Failed to fetch blog posts:", err)
        setError("Failed to load blog posts. Please try again later.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchPosts()
  }, [])

  // Filter posts based on search query and selected tags
  useEffect(() => {
    let result = posts

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.excerpt.toLowerCase().includes(query) ||
          post.tags.some((tag) => tag.toLowerCase().includes(query)),
      )
    }

    // Filter by selected tags
    if (selectedTags.length > 0) {
      result = result.filter((post) => selectedTags.every((tag) => post.tags.includes(tag)))
    }

    setFilteredPosts(result)
  }, [searchQuery, selectedTags, posts])

  // Toggle tag selection
  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
  }

  // Retry loading posts
  const handleRetry = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const postsData = await getBlogPosts()
      const mappedPosts = mapBlogPostsResponse(postsData)
      setPosts(mappedPosts)
      setFilteredPosts(mappedPosts)
    } catch (err) {
      console.error("Failed to fetch blog posts:", err)
      setError("Failed to load blog posts. Please try again later.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="container py-12 md:py-20">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold mb-4">Blog</h1>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Thoughts, tutorials, and insights about web development, design, and technology.
          </p>
        </motion.div>

        <motion.div
          className="max-w-4xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="relative mb-8">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input
              placeholder="Search articles..."
              className="pl-10 bg-background border-primary/20 focus:border-primary"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            <span className="text-sm font-medium mr-2">Filter by tag:</span>
            {allTags.map((tag) => (
              <Badge
                key={tag}
                variant={selectedTags.includes(tag) ? "default" : "outline"}
                className={`cursor-pointer ${
                  selectedTags.includes(tag) ? "bg-primary text-background" : "hover:bg-primary hover:text-background"
                }`}
                onClick={() => toggleTag(tag)}
              >
                {tag}
              </Badge>
            ))}
          </div>
        </motion.div>

        {isLoading ? (
          <BlogPostsLoading />
        ) : error ? (
          <motion.div
            className="text-center py-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-xl font-bold mb-4">Oops! Something went wrong</h3>
            <p className="text-muted-foreground mb-6">{error}</p>
            <button
              onClick={handleRetry}
              className="bg-primary hover:bg-primary/90 text-background px-4 py-2 rounded-md flex items-center gap-2 mx-auto"
            >
              <RefreshCw className="h-4 w-4" />
              Retry
            </button>
          </motion.div>
        ) : filteredPosts.length === 0 ? (
          <motion.div
            className="text-center py-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-xl font-bold mb-4">No posts found</h3>
            <p className="text-muted-foreground">
              {searchQuery || selectedTags.length > 0
                ? "Try adjusting your search or filters."
                : "Check back soon for new content!"}
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {filteredPosts.map((post, index) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <BlogPostCard post={post} />
              </motion.div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
