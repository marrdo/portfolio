"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, Terminal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path
  }

  const scrollToContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const contactSection = document.getElementById("contact")
    if (contactSection && pathname === "/") {
      contactSection.scrollIntoView({ behavior: "smooth" })
    } else {
      window.location.href = "/#contact"
    }
    setIsMenuOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-primary/20 bg-background/80 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Terminal className="h-6 w-6 text-primary" />
          <Link href="/" className="text-xl font-bold">
            DEV<span className="text-primary">/</span>PORTFOLIO
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/"
            className={`text-sm font-medium transition-colors ${isActive("/") ? "text-primary" : "hover:text-primary"}`}
          >
            Home
          </Link>
          <Link
            href="/projects"
            className={`text-sm font-medium transition-colors ${isActive("/projects") ? "text-primary" : "hover:text-primary"}`}
          >
            Projects
          </Link>
          <Link
            href="/blog"
            className={`text-sm font-medium transition-colors ${isActive("/blog") ? "text-primary" : "hover:text-primary"}`}
          >
            Blog
          </Link>
          <a
            href="#contact"
            onClick={scrollToContact}
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Contact
          </a>
          <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-background">
            Resume
          </Button>
          <ThemeToggle />
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6 text-primary" /> : <Menu className="h-6 w-6 text-primary" />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden absolute w-full bg-background border-b border-primary/20 py-4">
          <nav className="container flex flex-col gap-4">
            <Link
              href="/"
              className={`text-sm font-medium transition-colors ${isActive("/") ? "text-primary" : "hover:text-primary"}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/projects"
              className={`text-sm font-medium transition-colors ${isActive("/projects") ? "text-primary" : "hover:text-primary"}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Projects
            </Link>
            <Link
              href="/blog"
              className={`text-sm font-medium transition-colors ${isActive("/blog") ? "text-primary" : "hover:text-primary"}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Blog
            </Link>
            <a
              href="#contact"
              onClick={scrollToContact}
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Contact
            </a>
            <Button
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-background w-fit"
            >
              Resume
            </Button>
          </nav>
        </div>
      )}
    </header>
  )
}
