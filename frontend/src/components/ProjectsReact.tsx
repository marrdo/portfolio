"use client"

import { useState, useEffect } from "react"

interface Project {
  id: number
  title: string
  slug: string
  description: string
  image: string
  technologies: string[]
  demoUrl: string | null
  githubUrl: string | null
  featured: boolean
}

interface ProjectsProps {
  featured?: boolean
  limit?: number
}

const ProjectsReact = ({ featured = false, limit }: ProjectsProps) => {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("/api/curriculum/projects/")
        if (!response.ok) {
          throw new Error("Failed to fetch projects")
        }
        const data = await response.json()
        setProjects(data)
      } catch (err) {
        console.error("Error fetching projects:", err)
        setError("Failed to load projects. Please try again later.")
        // Fallback data for development
        setProjects([
          {
            id: 1,
            title: "Secure Authentication System",
            slug: "secure-auth",
            description:
              "A robust authentication system with multi-factor authentication, JWT, and role-based access control.",
            image: "/projects/auth-system.jpg",
            technologies: ["React", "Node.js", "JWT", "MongoDB"],
            demoUrl: "https://auth-demo.example.com",
            githubUrl: "https://github.com/example/secure-auth",
            featured: true,
          },
          {
            id: 2,
            title: "Vulnerability Scanner Dashboard",
            slug: "vuln-scanner",
            description: "A dashboard for monitoring and managing security vulnerabilities in web applications.",
            image: "/projects/vuln-scanner.jpg",
            technologies: ["Vue.js", "Django", "PostgreSQL", "Docker"],
            demoUrl: "https://scanner-demo.example.com",
            githubUrl: "https://github.com/example/vuln-scanner",
            featured: true,
          },
          {
            id: 3,
            title: "E-commerce Platform",
            slug: "ecommerce",
            description: "A full-featured e-commerce platform with secure payment processing and inventory management.",
            image: "/projects/ecommerce.jpg",
            technologies: ["React", "Node.js", "Stripe", "MySQL"],
            demoUrl: "https://shop-demo.example.com",
            githubUrl: "https://github.com/example/ecommerce",
            featured: false,
          },
          {
            id: 4,
            title: "Real-time Chat Application",
            slug: "chat-app",
            description: "End-to-end encrypted chat application with real-time messaging and file sharing.",
            image: "/projects/chat-app.jpg",
            technologies: ["React", "Socket.io", "Express", "MongoDB"],
            demoUrl: "https://chat-demo.example.com",
            githubUrl: "https://github.com/example/chat-app",
            featured: false,
          },
          {
            id: 5,
            title: "Portfolio Website Generator",
            slug: "portfolio-gen",
            description: "A tool for developers to create customized portfolio websites with minimal configuration.",
            image: "/projects/portfolio-gen.jpg",
            technologies: ["React", "Tailwind CSS", "Next.js"],
            demoUrl: "https://portfolio-gen-demo.example.com",
            githubUrl: "https://github.com/example/portfolio-gen",
            featured: true,
          },
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  // Filter projects based on props
  let displayProjects = projects

  if (featured) {
    displayProjects = projects.filter((project) => project.featured)
  }

  if (limit && limit > 0) {
    displayProjects = displayProjects.slice(0, limit)
  }

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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {displayProjects.map((project) => (
        <div
          key={project.id}
          className="bg-white dark:bg-lightShades/5 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-800 group"
        >
          <div className="relative overflow-hidden h-48">
            <div className="absolute inset-0 bg-primary/20 group-hover:bg-primary/0 transition-all duration-300"></div>
            <img
              src={project.image || `/placeholder.svg?height=300&width=500`}
              alt={project.title}
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
            />
          </div>

          <div className="p-6">
            <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">
              <a href={`/projects/${project.slug}`}>{project.title}</a>
            </h3>

            <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">{project.description}</p>

            <div className="flex flex-wrap gap-2 mb-4">
              {project.technologies.slice(0, 3).map((tech, i) => (
                <span key={i} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                  {tech}
                </span>
              ))}
              {project.technologies.length > 3 && (
                <span className="px-2 py-1 bg-gray-100 dark:bg-darkShades text-gray-600 dark:text-gray-400 text-xs rounded-full">
                  +{project.technologies.length - 3} more
                </span>
              )}
            </div>

            <div className="flex gap-3">
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-primary hover:underline"
                >
                  Live Demo
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary"
                >
                  GitHub
                </a>
              )}
              <a
                href={`/projects/${project.slug}`}
                className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary ml-auto"
              >
                Details
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ProjectsReact
