"use client"

import { useState, useEffect } from "react"

interface BlogPost {
  id: number
  title: string
  slug: string
  excerpt: string
  coverImage: string | null
  publishedAt: string
  readingTime: string
  tags: string[]
}

const BlogList = () => {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/blog/posts/")
        if (!response.ok) {
          throw new Error("Failed to fetch blog posts")
        }
        const data = await response.json()
        setPosts(data)
      } catch (err) {
        console.error("Error fetching blog posts:", err)
        setError("Failed to load blog posts. Please try again later.")
        // Fallback data for development
        setPosts([
          {
            id: 1,
            title: "Building Secure Authentication Systems",
            slug: "building-secure-authentication",
            excerpt:
              "Learn how to build robust authentication systems with security best practices to protect your users and data.",
            coverImage: "/blog/auth-security.jpg",
            publishedAt: "2023-04-15T12:00:00Z",
            readingTime: "8 min read",
            tags: ["Security", "Authentication", "Web Development"],
          },
          {
            id: 2,
            title: "The Future of Web Development with React and Astro",
            slug: "future-web-development-react-astro",
            excerpt:
              "Exploring how Astro and React are changing the landscape of modern web development with performance-first approaches.",
            coverImage: "/blog/react-astro.jpg",
            publishedAt: "2023-03-22T10:30:00Z",
            readingTime: "6 min read",
            tags: ["React", "Astro", "Web Development"],
          },
          {
            id: 3,
            title: "Implementing Zero Trust Security in Web Applications",
            slug: "zero-trust-security-web-apps",
            excerpt: "A comprehensive guide to implementing zero trust security principles in your web applications.",
            coverImage: "/blog/zero-trust.jpg",
            publishedAt: "2023-02-10T09:15:00Z",
            readingTime: "12 min read",
            tags: ["Security", "Zero Trust", "Best Practices"],
          },
          {
            id: 4,
            title: "Optimizing Django REST Framework for Performance",
            slug: "optimizing-django-rest-framework",
            excerpt: "Tips and techniques to improve the performance of your Django REST Framework APIs.",
            coverImage: "/blog/django-performance.jpg",
            publishedAt: "2023-01-05T14:45:00Z",
            readingTime: "10 min read",
            tags: ["Django", "API", "Performance"],
          },
          {
            id: 5,
            title: "Creating Accessible Web Applications with React",
            slug: "accessible-web-apps-react",
            excerpt:
              "Learn how to build web applications that are accessible to all users, including those with disabilities.",
            coverImage: "/blog/accessibility.jpg",
            publishedAt: "2022-12-18T11:20:00Z",
            readingTime: "9 min read",
            tags: ["React", "Accessibility", "Web Development"],
          },
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  // Get all unique tags
  const allTags = Array.from(new Set(posts.flatMap((post) => post.tags)))

  // Filter posts based on search term and selected tag
  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      searchTerm === "" ||
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesTag = selectedTag === null || post.tags.includes(selectedTag)

    return matchesSearch && matchesTag
  })

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center p-8 bg-red-50 dark:bg-red-900/20 rounded-lg">
        <p className="text-red-600 dark:text-red-400">{error}</p>
        <button
          className="mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 pl-10 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-lightShades/10"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        <div className="md:w-64">
          <select
            value={selectedTag || ""}
            onChange={(e) => setSelectedTag(e.target.value === "" ? null : e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-lightShades/10"
          >
            <option value="">All Tags</option>
            {allTags.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
        </div>
      </div>

      {filteredPosts.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-xl font-bold mb-2">No posts found</h3>
          <p className="text-gray-600 dark:text-gray-400">Try adjusting your search or filter criteria</p>
          <button
            onClick={() => {
              setSearchTerm("")
              setSelectedTag(null)
            }}
            className="mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="space-y-8">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white dark:bg-lightShades/5 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-800 group"
            >
              <a href={`/blog/${post.slug}`} className="block">
                <div className="md:flex">
                  {post.coverImage && (
                    <div className="md:w-1/3 relative overflow-hidden h-48 md:h-auto">
                      <img
                        src={post.coverImage || `/placeholder.svg?height=300&width=500`}
                        alt={post.title}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}

                  <div className={`p-6 ${post.coverImage ? "md:w-2/3" : "w-full"}`}>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {post.tags.slice(0, 3).map((tag, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                          onClick={(e) => {
                            e.preventDefault()
                            setSelectedTag(tag)
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <h2 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">
                      {post.title}
                    </h2>

                    <p className="text-gray-600 dark:text-gray-400 mb-4">{post.excerpt}</p>

                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <span>
                        {new Date(post.publishedAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                      <span className="mx-2">•</span>
                      <span>{post.readingTime}</span>
                    </div>
                  </div>
                </div>
              </a>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}

export default BlogList
