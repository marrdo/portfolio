"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getSkills } from "@/lib/api"
import { RefreshCw } from "lucide-react"
import { motion } from "framer-motion"

export function SkillsSection() {
  const [skills, setSkills] = useState<Record<string, { name: string; level: number }[]>>({
    frontend: [],
    backend: [],
    tools: [],
  })
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const skillsData = await getSkills()

        // Group skills by category
        const groupedSkills: Record<string, { name: string; level: number }[]> = {}

        skillsData.forEach((skill) => {
          if (!groupedSkills[skill.category]) {
            groupedSkills[skill.category] = []
          }

          groupedSkills[skill.category].push({
            name: skill.name,
            level: skill.level,
          })
        })

        setSkills(groupedSkills)
      } catch (err) {
        console.error("Failed to fetch skills:", err)
        setError("Failed to load skills. Please try again later.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchSkills()
  }, [])

  const handleRetry = () => {
    const fetchSkills = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const skillsData = await getSkills()

        // Group skills by category
        const groupedSkills: Record<string, { name: string; level: number }[]> = {}

        skillsData.forEach((skill) => {
          if (!groupedSkills[skill.category]) {
            groupedSkills[skill.category] = []
          }

          groupedSkills[skill.category].push({
            name: skill.name,
            level: skill.level,
          })
        })

        setSkills(groupedSkills)
      } catch (err) {
        console.error("Failed to fetch skills:", err)
        setError("Failed to load skills. Please try again later.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchSkills()
  }

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="space-y-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="flex justify-between">
                <div className="h-4 w-24 bg-muted animate-pulse rounded"></div>
                <div className="h-4 w-12 bg-muted animate-pulse rounded"></div>
              </div>
              <div className="h-2 w-full bg-muted animate-pulse rounded-full"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <motion.div
        className="text-center py-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="text-xl font-bold mb-4">Oops! Something went wrong</h3>
        <p className="text-muted-foreground mb-6">{error}</p>
        <button
          onClick={handleRetry}
          className="bg-primary hover:bg-primary/90 text-background px-4 py-2 rounded-md flex items-center gap-2 mx-auto"
        >
          <RefreshCw className="h-4 w-4" />
          Retry
        </button>
      </motion.div>
    )
  }

  // Get categories from the skills object
  const categories = Object.keys(skills)

  if (categories.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-muted-foreground">No skills found. Check back soon!</p>
      </div>
    )
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Tabs defaultValue={categories[0]} className="max-w-3xl mx-auto">
        <TabsList className="grid w-full grid-cols-3 bg-background/50 border border-primary/20">
          {categories.map((category) => (
            <TabsTrigger
              key={category}
              value={category}
              className="data-[state=active]:bg-primary data-[state=active]:text-background capitalize"
            >
              {category}
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map((category) => (
          <TabsContent key={category} value={category} className="mt-6">
            <Card className="bg-card/50 border border-primary/20">
              <CardContent className="p-6">
                <div className="grid gap-6">
                  {skills[category].map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <div className="flex justify-between mb-1">
                        <span>{skill.name}</span>
                        <span className="text-primary">{skill.level}%</span>
                      </div>
                      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-primary rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.level}%` }}
                          transition={{ duration: 1, delay: 0.2 + index * 0.1 }}
                        ></motion.div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </motion.div>
  )
}
