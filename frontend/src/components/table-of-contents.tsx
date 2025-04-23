"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import type { HeadingResponse } from "@/lib/api"

interface TableOfContentsProps {
  headings: HeadingResponse[]
}

export function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("")

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: "0px 0px -80% 0px" },
    )

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => {
      headings.forEach((heading) => {
        const element = document.getElementById(heading.id)
        if (element) {
          observer.unobserve(element)
        }
      })
    }
  }, [headings])

  return (
    <nav className="space-y-2 text-sm">
      {headings.map((heading) => (
        <a
          key={heading.id}
          href={`#${heading.id}`}
          className={cn("block text-muted-foreground hover:text-primary transition-colors py-1", {
            "text-primary font-medium": activeId === heading.id,
            "pl-2": heading.level === 2,
            "pl-4": heading.level === 3,
            "pl-6": heading.level === 4,
            "pl-8": heading.level === 5,
            "pl-10": heading.level === 6,
          })}
        >
          {heading.text}
        </a>
      ))}
    </nav>
  )
}
