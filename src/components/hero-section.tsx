import { useEffect, useState } from "react"
import { ArrowDown, Download, FolderOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import profileImage from "@/assets/chase.png"
import resumePdf from "@/assets/Mxolisi Sivuku Resume PDF.pdf"

export function HeroSection() {
  const [greeting, setGreeting] = useState("")
  const fullGreeting = "Hello, I'm"

  useEffect(() => {
    let index = 0
    const timer = setInterval(() => {
      if (index <= fullGreeting.length) {
        setGreeting(fullGreeting.slice(0, index))
        index++
      } else {
        clearInterval(timer)
      }
    }, 100)
    return () => clearInterval(timer)
  }, [])

  return (
    <section id="home" className="min-h-screen flex flex-col justify-center px-6 pt-20 relative">
      <div className="max-w-6xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="order-2 lg:order-1">
            <p className="text-primary text-lg mb-4 h-7">
              {greeting}
              <span className="animate-pulse">|</span>
            </p>
            <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 text-balance">Mxolisi Chase Sivuku</h1>
            <h2 className="text-xl md:text-2xl text-primary font-medium mb-6">Full Stack Developer</h2>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl mb-10">
              I build reliable, user-focused web systems that balance clean design with solid engineering. 
              My work sits at the intersection of backend logic and front-end usability, creating 
              solutions that not only look good but are built for performance, scalability, and 
              real-world functionality.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" asChild>
                <a href="#projects" className="gap-2">
                  <FolderOpen className="h-5 w-5" />
                  View Projects
                </a>
              </Button>
              <Button size="lg" variant="outline" className="gap-2 bg-transparent" asChild>
                <a href={resumePdf} download="Mxolisi Sivuku Resume.pdf">
                  <Download className="h-5 w-5" />
                  Download CV
                </a>
              </Button>
            </div>
          </div>

          {/* Profile Image */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md">
              <div className={cn(
                "absolute inset-0 bg-primary/20 rounded-2xl blur-3xl",
                "transform scale-105 opacity-50"
              )} />
              <div className="relative">
                <img
                  src={profileImage}
                  alt="Mxolisi Chase Sivuku"
                  className={cn(
                    "w-full h-auto rounded-2xl object-contain",
                    "border-4 border-primary/20 shadow-2xl",
                    "ring-4 ring-primary/10",
                    "transition-transform duration-300 hover:scale-105",
                    "bg-card/50 backdrop-blur-sm"
                  )}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce hidden md:block">
          <a href="#about" aria-label="Scroll to about section">
            <ArrowDown className="h-6 w-6 text-muted-foreground" />
          </a>
        </div>
      </div>
    </section>
  )
}
