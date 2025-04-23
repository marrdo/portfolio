import { Suspense } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { SkillsSection } from "@/components/skills-section"
import { SkillsLoading } from "@/components/loading-skeletons"

export const metadata = {
  title: "Skills | Developer Portfolio",
  description: "My technical skills and expertise",
}

export default function SkillsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="container py-12 md:py-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">My Skills</h1>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            I've worked with a variety of technologies and tools throughout my career. Here's a breakdown of my
            technical expertise.
          </p>
        </div>

        <Suspense fallback={<SkillsLoading />}>
          <SkillsSection />
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}
