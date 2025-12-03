import { useState } from "react"
import { useInView } from "@/hooks/use-in-view"
import { ExternalLink, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "A full-stack e-commerce solution with real-time inventory, payment processing, and admin dashboard.",
    image: "/modern-ecommerce-dashboard-dark-theme.jpg",
    tags: ["Next.js", "TypeScript", "Stripe", "PostgreSQL"],
    category: "fullstack",
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: 2,
    title: "AI Content Generator",
    description: "An AI-powered content generation tool using GPT-4 for blog posts, social media, and marketing copy.",
    image: "/ai-writing-assistant-interface-dark-theme.jpg",
    tags: ["React", "OpenAI", "Node.js", "MongoDB"],
    category: "ai",
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: 3,
    title: "Real-time Chat App",
    description: "A scalable real-time messaging platform with end-to-end encryption and file sharing capabilities.",
    image: "/modern-chat-application-dark-mode.jpg",
    tags: ["Socket.io", "React", "Redis", "Express"],
    category: "fullstack",
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: 4,
    title: "Portfolio Dashboard",
    description: "A cryptocurrency portfolio tracker with real-time price updates and performance analytics.",
    image: "/crypto-portfolio-dashboard-dark-theme.jpg",
    tags: ["Vue.js", "Chart.js", "WebSocket", "Python"],
    category: "frontend",
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: 5,
    title: "DevOps Pipeline Tool",
    description: "An automated CI/CD pipeline visualization and management tool for development teams.",
    image: "/devops-pipeline-visualization-dark-theme.jpg",
    tags: ["Docker", "Kubernetes", "Go", "React"],
    category: "devops",
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: 6,
    title: "Task Management App",
    description: "A collaborative project management tool with Kanban boards, time tracking, and team analytics.",
    image: "/kanban-project-management-dark-theme.jpg",
    tags: ["Next.js", "Prisma", "tRPC", "Tailwind"],
    category: "fullstack",
    liveUrl: "#",
    githubUrl: "#",
  },
]

const filters = [
  { label: "All", value: "all" },
  { label: "Full Stack", value: "fullstack" },
  { label: "Frontend", value: "frontend" },
  { label: "AI/ML", value: "ai" },
  { label: "DevOps", value: "devops" },
]

export function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState("all")
  const { ref, isInView } = useInView({ threshold: 0.1 })

  const filteredProjects =
    activeFilter === "all" ? projects : projects.filter((project) => project.category === activeFilter)

  return (
    <section id="projects" className="py-24 px-6 bg-secondary/30" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-primary text-sm font-medium tracking-wider uppercase mb-4">My Work</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-balance">Featured Projects</h2>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-2">
            {filters.map((filter) => (
              <Button
                key={filter.value}
                variant={activeFilter === filter.value ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveFilter(filter.value)}
                className="transition-all"
              >
                {filter.label}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className={cn(
                "group rounded-xl bg-card border border-border overflow-hidden",
                "hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5",
                "transition-all duration-500",
                isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
              )}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                  <Button size="sm" asChild>
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Live Demo
                    </a>
                  </Button>
                  <Button size="sm" variant="outline" asChild>
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4 mr-2" />
                      Code
                    </a>
                  </Button>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="px-2 py-1 text-xs rounded-full bg-secondary text-secondary-foreground">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
