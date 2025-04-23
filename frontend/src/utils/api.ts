// API utility functions for fetching data from Django REST Framework

/**
 * Base API URL
 */
const API_BASE_URL = "/api"

/**
 * Generic fetch function with error handling
 */
export async function fetchAPI<T>(endpoint: string): Promise<T> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`)

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    return (await response.json()) as T
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error)
    throw error
  }
}

/**
 * Curriculum API endpoints
 */
export const curriculumAPI = {
  getProjects: () => fetchAPI("/curriculum/projects/"),
  getProject: (slug: string) => fetchAPI(`/curriculum/proyecto/${slug}/`),
  getAbilities: () => fetchAPI("/curriculum/abilities/"),
  getProfile: (slug: string) => fetchAPI(`/curriculum/profile/${slug}/`),
  getExperiences: () => fetchAPI("/curriculum/experiences/"),
  getEducations: () => fetchAPI("/curriculum/educations/"),
}

/**
 * Blog API endpoints
 */
export const blogAPI = {
  getPosts: () => fetchAPI("/blog/posts/"),
  getPost: (slug: string) => fetchAPI(`/blog/posts/${slug}/`),
  getHeadings: (slug: string) => fetchAPI(`/blog/post/${slug}/headings/`),
}

/**
 * Error handling utility
 */
export function handleAPIError(error: unknown): string {
  if (error instanceof Error) {
    return error.message
  }
  return "An unknown error occurred"
}
