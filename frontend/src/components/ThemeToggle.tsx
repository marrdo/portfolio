"use client"

import { useState, useEffect } from "react"
import { Sun, Moon } from "lucide-react"

const ThemeToggle = () => {
  const [theme, setTheme] = useState(() => {
    if (typeof localStorage !== "undefined" && localStorage.getItem("theme")) {
      return localStorage.getItem("theme")
    }
    if (typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark"
    }
    return "light"
  })

  useEffect(() => {
    const root = document.documentElement
    if (theme === "dark") {
      root.classList.add("dark")
    } else {
      root.classList.remove("dark")
    }
    localStorage.setItem("theme", theme || "light")
  }, [theme])

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"))
  }

  return (
    <button
      onClick={toggleTheme}
      className="fixed bottom-5 right-5 p-3 rounded-full bg-primary text-white shadow-lg hover:bg-primary/90 transition-all duration-300 z-50"
      aria-label="Toggle theme"
    >
      {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
    </button>
  )
}

export default ThemeToggle
