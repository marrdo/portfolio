"use client"

import { useState, useEffect } from "react"

interface Skill {
  id: number
  name: string
  icon: string
  level: number
  category: string
}

const SkillsReact = () => {
  const [skills, setSkills] = useState<Skill[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeCategory, setActiveCategory] = useState("all")

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await fetch("/api/curriculum/abilities/")
        if (!response.ok) {
          throw new Error("Failed to fetch skills")
        }
        const data = await response.json()
        setSkills(data)
      } catch (err) {
        console.error("Error fetching skills:", err)
        setError("Failed to load skills. Please try again later.")
        // Fallback data for development
        setSkills([
          { id: 1, name: "JavaScript", icon: "javascript", level: 90, category: "frontend" },
          { id: 2, name: "React", icon: "react", level: 85, category: "frontend" },
          { id: 3, name: "Node.js", icon: "nodejs", level: 80, category: "backend" },
          { id: 4, name: "Python", icon: "python", level: 75, category: "backend" },
          { id: 5, name: "Django", icon: "django", level: 70, category: "backend" },
          { id: 6, name: "Docker", icon: "docker", level: 65, category: "devops" },
          { id: 7, name: "AWS", icon: "aws", level: 60, category: "devops" },
          { id: 8, name: "Cybersecurity", icon: "shield", level: 80, category: "security" },
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchSkills()
  }, [])

  const categories = [
    { id: "all", name: "All Skills" },
    { id: "frontend", name: "Frontend" },
    { id: "backend", name: "Backend" },
    { id: "devops", name: "DevOps" },
    { id: "security", name: "Security" },
  ]

  const filteredSkills = activeCategory === "all" ? skills : skills.filter((skill) => skill.category === activeCategory)

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
    <div className="animate-fadeIn">
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeCategory === category.id
                ? "bg-primary text-white"
                : "bg-gray-200 dark:bg-darkShades text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-darkShades/70"
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredSkills.map((skill) => (
          <div
            key={skill.id}
            className="bg-white dark:bg-lightShades/5 p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-800 hover:border-primary/50 dark:hover:border-primary/50"
          >
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 flex items-center justify-center bg-primary/10 rounded-md text-primary mr-3">
                <span className="text-xl">
                  {/* Placeholder for icon */}
                  {skill.name.charAt(0)}
                </span>
              </div>
              <h3 className="font-bold">{skill.name}</h3>
            </div>
            <div className="w-full bg-gray-200 dark:bg-darkShades rounded-full h-2.5">
              <div
                className="bg-primary h-2.5 rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${skill.level}%` }}
              ></div>
            </div>
            <div className="mt-2 text-right text-sm text-gray-600 dark:text-gray-400">{skill.level}%</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SkillsReact
