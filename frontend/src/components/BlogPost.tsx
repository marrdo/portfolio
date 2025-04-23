"use client"

import { useState, useEffect } from "react"

interface BlogPost {
  id: number
  title: string
  slug: string
  content: string
  coverImage: string | null
  publishedAt: string
  readingTime: string
  tags: string[]
  author: {
    name: string
    avatar: string
    bio: string
  }
}

interface BlogPostProps {
  slug?: string
}

const BlogPost = ({ slug }: BlogPostProps) => {
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [headings, setHeadings] = useState<{ id: string; text: string; level: number }[]>([])

  useEffect(() => {
    const fetchPost = async () => {
      try {
        // In a real implementation, this would fetch from the API
        const response = await fetch(`/api/blog/posts/${slug}/`)
        if (!response.ok) {
          throw new Error("Failed to fetch blog post")
        }
        const data = await response.json()
        setPost(data)

        // Also fetch headings for table of contents
        try {
          const headingsResponse = await fetch(`/api/blog/post/${slug}/headings/`)
          if (headingsResponse.ok) {
            const headingsData = await headingsResponse.json()
            setHeadings(headingsData)
          }
        } catch (err) {
          console.error("Error fetching headings:", err)
        }
      } catch (err) {
        console.error("Error fetching blog post:", err)
        setError("Failed to load blog post. Please try again later.")

        // Fallback data for development
        if (slug === "building-secure-authentication") {
          setPost({
            id: 1,
            title: "Building Secure Authentication Systems",
            slug: "building-secure-authentication",
            content: `
# Building Secure Authentication Systems

Authentication is one of the most critical aspects of web application security. A poorly implemented authentication system can lead to data breaches, account takeovers, and other security incidents.

## Common Authentication Vulnerabilities

### 1. Weak Password Policies

Many applications still allow users to create weak passwords that are easy to guess or brute force. A strong password policy should require:

- Minimum length of 12 characters
- A mix of uppercase and lowercase letters
- Numbers and special characters
- No common dictionary words or patterns

### 2. Lack of Multi-Factor Authentication

Relying solely on passwords is no longer sufficient for protecting sensitive accounts. Multi-factor authentication (MFA) adds an additional layer of security by requiring users to provide a second form of verification.

### 3. Insecure Password Storage

Storing passwords in plaintext or using weak hashing algorithms like MD5 or SHA-1 is a recipe for disaster. Always use strong, adaptive hashing algorithms like bcrypt, Argon2, or PBKDF2 with appropriate work factors.

## Best Practices for Secure Authentication

### Implement Proper Password Hashing

\`\`\`javascript
// Example using bcrypt in Node.js
const bcrypt = require('bcrypt');
const saltRounds = 12;

async function hashPassword(password) {
  const salt = await bcrypt.genSalt(saltRounds);
  return await bcrypt.hash(password, salt);
}

async function verifyPassword(password, hash) {
  return await bcrypt.compare(password, hash);
}
\`\`\`

### Use JWT Tokens Securely

JSON Web Tokens (JWT) are commonly used for maintaining user sessions, but they must be implemented correctly:

- Use strong signing keys
- Set appropriate expiration times
- Store tokens securely (HttpOnly cookies)
- Implement token refresh mechanisms

### Protect Against Brute Force Attacks

Implement rate limiting to prevent attackers from making multiple login attempts:

\`\`\`javascript
// Example rate limiting middleware with Express
const rateLimit = require('express-rate-limit');

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 attempts per window
  message: 'Too many login attempts, please try again later'
});

app.post('/login', loginLimiter, loginController);
\`\`\`

## Conclusion

Building secure authentication systems requires careful planning and implementation. By following industry best practices and staying up-to-date with security trends, you can significantly reduce the risk of authentication-related vulnerabilities in your applications.

Remember that security is an ongoing process, not a one-time implementation. Regularly review and update your authentication mechanisms to address new threats and vulnerabilities as they emerge.
            `,
            coverImage: "/blog/auth-security.jpg",
            publishedAt: "2023-04-15T12:00:00Z",
            readingTime: "8 min read",
            tags: ["Security", "Authentication", "Web Development"],
            author: {
              name: "Jane Doe",
              avatar: "/authors/jane-doe.jpg",
              bio: "Security engineer and web developer with 10+ years of experience in building secure applications.",
            },
          })

          setHeadings([
            { id: "building-secure-authentication-systems", text: "Building Secure Authentication Systems", level: 1 },
            { id: "common-authentication-vulnerabilities", text: "Common Authentication Vulnerabilities", level: 2 },
            { id: "weak-password-policies", text: "Weak Password Policies", level: 3 },
            { id: "lack-of-multi-factor-authentication", text: "Lack of Multi-Factor Authentication", level: 3 },
            { id: "insecure-password-storage", text: "Insecure Password Storage", level: 3 },
            {
              id: "best-practices-for-secure-authentication",
              text: "Best Practices for Secure Authentication",
              level: 2,
            },
            { id: "implement-proper-password-hashing", text: "Implement Proper Password Hashing", level: 3 },
            { id: "use-jwt-tokens-securely", text: "Use JWT Tokens Securely", level: 3 },
            { id: "protect-against-brute-force-attacks", text: "Protect Against Brute Force Attacks", level: 3 },
            { id: "conclusion", text: "Conclusion", level: 2 },
          ])
        } else {
          // Generic fallback for other slugs
          setPost({
            id: 999,
            title: "Blog Post Not Found",
            slug: slug || "unknown",
            content: "This blog post could not be loaded.",
            coverImage: "/placeholder.svg?height=600&width=800",
            publishedAt: new Date().toISOString(),
            readingTime: "0 min read",
            tags: [],
            author: {
              name: "Unknown Author",
              avatar: "/placeholder.svg?height=100&width=100",
              bio: "",
            },
          })
        }
      } finally {
        setLoading(false)
      }
    }

    if (slug) {
      fetchPost()
    }
  }, [slug])

  if (loading) {
    return (
      <div className="container px-4 mx-auto py-12">
        <div className="flex justify-center items-center h-60">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className="container px-4 mx-auto py-12">
        <div className="max-w-3xl mx-auto text-center p-8 bg-red-50 dark:bg-red-900/20 rounded-lg">
          <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">Blog Post Not Found</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {error || "We couldn't find the blog post you're looking for."}
          </p>
          <a
            href="/blog"
            className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors duration-300"
          >
            Back to Blog
          </a>
        </div>
      </div>
    )
  }

  // Function to render markdown content
  const renderMarkdown = () => {
    // In a real implementation, you would use a markdown parser
    // For now, we'll just split by newlines and render basic HTML
    return (
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <div dangerouslySetInnerHTML={{ __html: formatMarkdown(post.content) }} />
      </div>
    )
  }

  // Simple markdown formatter (in a real app, use a proper markdown library)
  const formatMarkdown = (markdown: string) => {
    const html = markdown
      // Headers
      .replace(/^# (.*$)/gm, '<h1 id="$1">$1</h1>')
      .replace(/^## (.*$)/gm, '<h2 id="$1">$1</h2>')
      .replace(/^### (.*$)/gm, '<h3 id="$1">$1</h3>')
      // Bold
      .replace(/\*\*(.*)\*\*/gm, "<strong>$1</strong>")
      // Italic
      .replace(/\*(.*)\*/gm, "<em>$1</em>")
      // Code blocks
      .replace(/```([\s\S]*?)```/gm, "<pre><code>$1</code></pre>")
      // Inline code
      .replace(/`([^`]+)`/gm, "<code>$1</code>")
      // Paragraphs
      .replace(/^\s*(\n)?(.+)/gm, (m) => (/<(\/)?(h\d|ul|ol|li|blockquote|pre|img)/.test(m) ? m : "<p>" + m + "</p>"))
      // Line breaks
      .replace(/\n/gm, "<br>")

    return html
  }

  return (
    <div className="container px-4 mx-auto py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <a href="/blog" className="inline-flex items-center text-primary hover:underline mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            Back to Blog
          </a>
        </div>

        <article>
          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>

            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag, i) => (
                <a
                  key={i}
                  href={`/blog?tag=${tag}`}
                  className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full hover:bg-primary/20 transition-colors"
                >
                  {tag}
                </a>
              ))}
            </div>

            <div className="flex items-center mb-6">
              <img
                src={post.author.avatar || `/placeholder.svg?height=50&width=50`}
                alt={post.author.name}
                className="w-12 h-12 rounded-full object-cover mr-4"
              />
              <div>
                <div className="font-medium">{post.author.name}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {new Date(post.publishedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}{" "}
                  • {post.readingTime}
                </div>
              </div>
            </div>

            {post.coverImage && (
              <div className="mb-8">
                <img
                  src={post.coverImage || "/placeholder.svg"}
                  alt={post.title}
                  className="w-full h-auto rounded-lg shadow-md"
                />
              </div>
            )}
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {headings.length > 0 && (
              <div className="lg:col-span-1 order-2 lg:order-1">
                <div className="sticky top-20">
                  <div className="bg-white dark:bg-lightShades/5 p-4 rounded-lg shadow-md border border-gray-200 dark:border-gray-800">
                    <h3 className="text-lg font-bold mb-3">Table of Contents</h3>
                    <nav>
                      <ul className="space-y-2 text-sm">
                        {headings.map((heading, index) => (
                          <li
                            key={index}
                            className={`${heading.level === 1 ? "font-medium" : ""} ${heading.level === 3 ? "ml-4" : ""}`}
                          >
                            <a
                              href={`#${heading.id}`}
                              className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
                            >
                              {heading.text}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </nav>
                  </div>
                </div>
              </div>
            )}

            <div className={`${headings.length > 0 ? "lg:col-span-3" : "lg:col-span-4"} order-1 lg:order-2`}>
              <div className="bg-white dark:bg-lightShades/5 p-6 md:p-8 rounded-lg shadow-md border border-gray-200 dark:border-gray-800">
                {renderMarkdown()}
              </div>

              <div className="mt-8 bg-white dark:bg-lightShades/5 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-800">
                <h3 className="text-xl font-bold mb-4">Share this article</h3>
                <div className="flex space-x-4">
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://example.com/blog/${post.slug}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6"
                    >
                      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                    </svg>
                  </a>
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://example.com/blog/${post.slug}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6"
                    >
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                      <rect x="2" y="9" width="4" height="12"></rect>
                      <circle cx="4" cy="4" r="2"></circle>
                    </svg>
                  </a>
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://example.com/blog/${post.slug}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6"
                    >
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                    </svg>
                  </a>
                </div>
              </div>

              <div className="mt-8 bg-white dark:bg-lightShades/5 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-800">
                <h3 className="text-xl font-bold mb-4">About the author</h3>
                <div className="flex items-start">
                  <img
                    src={post.author.avatar || `/placeholder.svg?height=80&width=80`}
                    alt={post.author.name}
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div>
                    <div className="font-bold text-lg mb-2">{post.author.name}</div>
                    <p className="text-gray-600 dark:text-gray-400">{post.author.bio}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  )
}

export default BlogPost
