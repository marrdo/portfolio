// API utility functions for fetching data from Django Rest Framework

// Base API URL - replace with your actual API URL in production
const API_BASE_URL = "https://portfolio-backend-i67j.onrender.com"


// Generic fetch function with error handling
async function fetchAPI<T>(endpoint: string): Promise<T> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error)
    throw error
  }
}

// Curriculum API endpoints
export async function getProyectos() {
  return fetchAPI<ProjectResponse[]>("/api/curriculum/proyectos/")
}

export async function getProjectBySlug(slug: string) {
  return fetchAPI<ProjectResponse>(`/api/curriculum/proyecto/${slug}/`)
}

export async function getSkills() {
  return fetchAPI<SkillResponse[]>("/api/curriculum/habilidades/")
}

export async function getProfile(slug: string) {
  return fetchAPI<ProfileResponse>(`/api/curriculum/perfil/${slug}/`)
}

export async function getExperiences() {
  return fetchAPI<ExperienceResponse[]>("/api/curriculum/experiencias/")
}

export async function getEducation() {
  return fetchAPI<EducationResponse[]>("/api/curriculum/educaciones/")
}

// Blog API endpoints
export async function getBlogPosts() {
  return fetchAPI<BlogPostResponse[]>("/api/blog/posts/")
}

export async function getBlogPostBySlug(slug: string) {
  return fetchAPI<BlogPostResponse>(`/api/blog/posts/${slug}/`)
}

export async function getBlogPostHeadings(slug: string) {
  return fetchAPI<HeadingResponse[]>(`/api/blog/post/${slug}/headings/`)
}

// API Response Types
export interface ProjectResponse {
  id: number
  title: string
  slug: string
  description: string
  image: string
  tags: string[]
  demo_url: string
  github_url: string
  created_at: string
  updated_at: string
}

export interface SkillResponse {
  id: number
  name: string
  level: number
  category: string
}

export interface ProfileResponse {
  id: number
  name: string
  title: string
  bio: string
  avatar: string
  email: string
  phone: string
  location: string
  social_links: {
    github?: string
    linkedin?: string
    twitter?: string
    website?: string
  }
}

export interface ExperienceResponse {
  id: number
  company: string
  position: string
  description: string
  start_date: string
  end_date: string | null
  current: boolean
}

export interface EducationResponse {
  id: number
  institution: string
  degree: string
  field: string
  start_date: string
  end_date: string | null
  current: boolean
}

export interface BlogPostResponse {
  id: number
  title: string
  slug: string
  excerpt: string
  content: string
  cover_image: string
  published_date: string
  reading_time: number
  tags: string[]
  author: {
    name: string
    title: string
    avatar: string
  }
}

export interface HeadingResponse {
  id: string
  text: string
  level: number
}

// App Types
export interface ProjectType {
  title: string
  description: string
  image: string
  tags: string[]
  demoUrl: string
  githubUrl: string
  slug: string
}

export interface BlogPostType {
  slug: string
  title: string
  excerpt: string
  content: string
  date: string
  readingTime: number
  coverImage: string
  tags: string[]
  author: {
    name: string
    title: string
    avatar: string
  }
}

// Map API responses to our app types
export function mapProjectsResponse(projects: ProjectResponse[]): ProjectType[] {
  return projects.map((project) => ({
    title: project.title,
    description: project.description,
    image: project.image,
    tags: project.tags,
    demoUrl: project.demo_url,
    githubUrl: project.github_url,
    slug: project.slug,
  }))
}

export function mapBlogPostsResponse(posts: BlogPostResponse[]): BlogPostType[] {
  return posts.map((post) => ({
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    content: post.content,
    date: new Date(post.published_date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    readingTime: post.reading_time,
    coverImage: post.cover_image,
    tags: post.tags,
    author: {
      name: post.author.name,
      title: post.author.title,
      avatar: post.author.avatar,
    },
  }))
}
