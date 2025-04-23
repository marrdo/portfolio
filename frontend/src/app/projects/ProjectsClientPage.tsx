"use client"

import { Suspense } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ProjectCard } from "@/components/project-card"
import { ProjectsLoading } from "@/components/loading-skeletons"
import { getProjects, mapProjectsResponse } from "@/lib/api"

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="container py-12 md:py-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">My Projects</h1>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A collection of my recent web development projects. Each project showcases different skills and
            technologies.
          </p>
        </div>

        <Suspense fallback={<ProjectsLoading />}>
          <ProjectsList />
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}

async function ProjectsList() {
  try {
    const projectsData = await getProjects()
    const projects = mapProjectsResponse(projectsData)

    if (!projects.length) {
      return (
        <div className="text-center py-20">
          <p className="text-muted-foreground">No projects found. Check back soon!</p>
        </div>
      )
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>
    )
  } catch (error) {
    console.error("Failed to load projects:", error)
    return (
      <div className="text-center py-10">
        <h3 className="text-xl font-bold mb-4">Failed to load projects</h3>
        <p className="text-muted-foreground mb-6">There was an error loading the projects. Please try again later.</p>
        <button
          onClick={() => window.location.reload()}
          className="bg-primary hover:bg-primary/90 text-background px-4 py-2 rounded-md"
        >
          Retry
        </button>
      </div>
    )
  }
}
