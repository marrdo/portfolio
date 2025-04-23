import { Terminal } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-orange-500/20 bg-black py-8">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <Terminal className="h-5 w-5 text-orange-500" />
            <span className="text-lg font-bold">
              DEV<span className="text-orange-500">/</span>PORTFOLIO
            </span>
          </div>

          <div className="text-center md:text-right">
            <p className="text-sm text-gray-400">© {new Date().getFullYear()} [Your Name]. All rights reserved.</p>
            <p className="text-xs text-gray-500 mt-1">Built with Next.js and Tailwind CSS</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
