"use client"

import { useState, useEffect } from "react"

interface Experience {
  id: number
  company: string
  position: string
  startDate: string
  endDate: string | null
  description: string
  technologies: string[]
}

const ExperienceReact = () => {
  const [experiences, setExperiences] = useState<Experience[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const response = await fetch("/api/curriculum/experiences/")
        if (!response.ok) {
          throw new Error("Failed to fetch experiences")
        }
        const data = await response.json()
        setExperiences(data)
      } catch (err) {
        console.error("Error fetching experiences:", err)
        setError("Failed to load experiences. Please try again later.")
        // Fallback data for development
        setExperiences([
          {
            id: 1,
            company: "Tech Solutions Inc.",
            position: "Senior Full Stack Developer",
            startDate: "2021-06-01",
            endDate: null,
            description:
              "Leading development of secure web applications, implementing best practices for cybersecurity, and mentoring junior developers.",
            technologies: ["React", "Node.js", "Django", "AWS", "Docker"],
          },
          {
            id: 2,
            company: "Cyber Defense Systems",
            position: "Security Engineer",
            startDate: "2019-03-01",
            endDate: "2021-05-31",
            description:
              "Developed secure authentication systems, performed security audits, and implemented vulnerability management processes.",
            technologies: ["Python", "JavaScript", "Penetration Testing", "OWASP"],
          },
          {
            id: 3,
            company: "WebDev Agency",
            position: "Frontend Developer",
            startDate: "2017-09-01",
            endDate: "2019-02-28",
            description:
              "Created responsive web applications with modern JavaScript frameworks, focusing on performance optimization and accessibility.",
            technologies: ["React", "Vue.js", "CSS/SASS", "Webpack"],
          },
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchExperiences()
  }, [])

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
    <div className="max-w-3xl mx-auto">
      <div className="relative border-l-2 border-primary pl-8 ml-4">
        {experiences.map((exp, index) => (
          <div
            key={exp.id}
            className={`mb-12 transform transition-all duration-500 ${
              index % 2 === 0 ? "hover:translate-x-2" : "hover:translate-x-1"
            }`}
          >
            <div className="absolute -left-4 mt-1 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-full"></div>
            </div>

            <div className="bg-white dark:bg-lightShades/5 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-800">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
                <h3 className="text-xl font-bold">{exp.position}</h3>
                <span className="text-primary font-medium">
                  {new Date(exp.startDate).toLocaleDateString("en-US", { year: "numeric", month: "short" })} -
                  {exp.endDate
                    ? new Date(exp.endDate).toLocaleDateString("en-US", { year: "numeric", month: "short" })
                    : "Present"}
                </span>
              </div>

              <p className="text-gray-700 dark:text-gray-300 mb-2">{exp.company}</p>
              <p className="text-gray-600 dark:text-gray-400 mb-4">{exp.description}</p>

              <div className="flex flex-wrap gap-2">
                {exp.technologies.map((tech, i) => (
                  <span key={i} className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ExperienceReact
