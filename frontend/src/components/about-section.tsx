import { User, Code, Server, Globe, Terminal } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function AboutSection() {
  return (
    <section id="about" className="py-20 relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,97,0,0.1),transparent_70%)]"></div>
      <div className="container relative z-10">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/2">
            <div className="relative">
              <div className="aspect-square w-full max-w-md mx-auto overflow-hidden rounded-lg border-2 border-orange-500/50 bg-black/50">
                <div className="absolute inset-0 flex items-center justify-center text-orange-500">
                  <User className="w-24 h-24" />
                </div>
                {/* Replace with your actual image */}
                {/* <img 
                  src="/your-photo.jpg" 
                  alt="Your Name" 
                  className="w-full h-full object-cover"
                /> */}
              </div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 border-2 border-orange-500/50 rounded-lg"></div>
              <div className="absolute -top-4 -left-4 w-32 h-32 border-2 border-orange-500/50 rounded-lg"></div>
            </div>
          </div>

          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold mb-2">About Me</h2>
            <div className="w-20 h-1 bg-orange-500 mb-6"></div>
            <p className="text-gray-400 mb-6">
              I'm a passionate web developer with a focus on creating secure, efficient, and user-friendly applications.
              With expertise in both frontend and backend technologies, I bring a holistic approach to solving complex
              problems.
            </p>
            <p className="text-gray-400 mb-8">
              My background in cybersecurity gives me a unique perspective on building robust applications that not only
              look great but are also built with security best practices in mind.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card className="bg-black/50 border border-orange-500/20">
                <CardContent className="p-4 flex items-center gap-3">
                  <Code className="text-orange-500 h-5 w-5" />
                  <span>Frontend Development</span>
                </CardContent>
              </Card>
              <Card className="bg-black/50 border border-orange-500/20">
                <CardContent className="p-4 flex items-center gap-3">
                  <Server className="text-orange-500 h-5 w-5" />
                  <span>Backend Development</span>
                </CardContent>
              </Card>
              <Card className="bg-black/50 border border-orange-500/20">
                <CardContent className="p-4 flex items-center gap-3">
                  <Globe className="text-orange-500 h-5 w-5" />
                  <span>Web Security</span>
                </CardContent>
              </Card>
              <Card className="bg-black/50 border border-orange-500/20">
                <CardContent className="p-4 flex items-center gap-3">
                  <Terminal className="text-orange-500 h-5 w-5" />
                  <span>DevOps</span>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/50 to-transparent"></div>
    </section>
  )
}
