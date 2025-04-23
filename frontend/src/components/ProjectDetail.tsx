"use client"

import { useState, useEffect } from "react"

interface Project {
  id: number
  title: string
  slug: string
  description: string
  longDescription?: string
  image: string
  technologies: string[]
  features?: string[]
  demoUrl: string | null
  githubUrl: string | null
  featured: boolean
}

interface ProjectDetailProps {
  slug?: string
}

const ProjectDetail = ({ slug }: ProjectDetailProps) => {
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProject = async () => {
      try {
        // In a real implementation, this would fetch from the API
        const response = await fetch(`/api/curriculum/proyecto/${slug}/`)
        if (!response.ok) {
          throw new Error("Failed to fetch project")
        }
        const data = await response.json()
        setProject(data)
      } catch (err) {
        console.error("Error fetching project:", err)
        setError("Failed to load project. Please try again later.")

        // Fallback data for development
        if (slug === "secure-auth") {
          setProject({
            id: 1,
            title: "Secure Authentication System",
            slug: "secure-auth",
            description:
              "A robust authentication system with multi-factor authentication, JWT, and role-based access control.",
            longDescription:
              "This project implements a comprehensive authentication system designed with security as the primary focus. It features multi-factor authentication, JWT token management, and role-based access control to ensure that users can only access the resources they are authorized for. The system is built with modern best practices for security, including password hashing, rate limiting, and protection against common attacks such as CSRF, XSS, and SQL injection.",
            image: "/projects/auth-system.jpg",
            technologies: ["React", "Node.js", "JWT", "MongoDB", "Express", "Redis"],
            features: [
              "Multi-factor authentication",
              "JWT token management",
              "Role-based access control",
              "Password hashing with bcrypt",
              "Rate limiting to prevent brute force attacks",
              "CSRF protection",
              "XSS protection",
              "Comprehensive logging and monitoring",
            ],
            demoUrl: "https://auth-demo.example.com",
            githubUrl: "https://github.com/example/secure-auth",
            featured: true,
          })
        } else {
          // Generic fallback for other slugs
          setProject({
            id: 999,
            title: "Project Not Found",
            slug: slug || "unknown",
            description: "This project could not be loaded.",
            image: "/placeholder.svg?height=600&width=800",
            technologies: [],
            demoUrl: null,
            githubUrl: null,
            featured: false,
          })
        }
      } finally {
        setLoading(false)
      }
    }

    if (slug) {
      fetchProject()
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

  if (error || !project) {
    return (
      <div className="container px-4 mx-auto py-12">
        <div className="max-w-3xl mx-auto text-center p-8 bg-red-50 dark:bg-red-900/20 rounded-lg">
          <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">Project Not Found</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {error || "We couldn't find the project you're looking for."}
          </p>
          <a
            href="/projects"
            className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors duration-300"
          >
            Back to Projects
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="container px-4 mx-auto py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <a href="/projects" className="inline-flex items-center text-primary hover:underline mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            Back to Projects
          </a>

          <h1 className="text-3xl md:text-4xl font-bold mb-4">{project.title}</h1>

          <div className="flex flex-wrap gap-2 mb-6">
            {project.technologies.map((tech, i) => (
              <span key={i} className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-lightShades/5 rounded-lg overflow-hidden shadow-lg border border-gray-200 dark:border-gray-800 mb-8">
          <img
            src={project.image || `/placeholder.svg?height=600&width=800`}
            alt={project.title}
            className="w-full h-auto object-cover"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="md:col-span-2">
            <div className="bg-white dark:bg-lightShades/5 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-800">
              <h2 className="text-2xl font-bold mb-4">Project Overview</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-6">{project.description}</p>

              {project.longDescription && (
                <div className="text-gray-600 dark:text-gray-400 space-y-4">
                  {project.longDescription.split("\n").map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>
              )}

              {project.features && project.features.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-xl font-bold mb-4">Key Features</h3>
                  <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400">
                    {project.features.map((feature, i) => (
                      <li key={i}>{feature}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          <div>
            <div className="bg-white dark:bg-lightShades/5 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-800 sticky top-20">
              <h3 className="text-xl font-bold mb-4">Project Links</h3>

              <div className="space-y-4">
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-full px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors duration-300"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Live Demo
                  </a>
                )}

                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-full px-4 py-2 bg-gray-100 dark:bg-darkShades text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-darkShades/70 transition-colors duration-300"
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
                      className="h-5 w-5 mr-2"
                    >
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                    </svg>
                    View on GitHub
                  </a>
                )}
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-bold mb-3">Technologies Used</h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, i) => (
                    <span key={i} className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectDetail
