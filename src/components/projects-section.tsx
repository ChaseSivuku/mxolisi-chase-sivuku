import { useState } from "react"
import { useInView } from "@/hooks/use-in-view"
import { ExternalLink, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const projects = [
  {
    id: 1,
    title: "Smart-Grid-Link",
    description: "A full-stack peer-to-peer energy trading platform with real-time electricity exchange, IoT monitoring, AI optimization, and secure dashboards.",
    image: "/SGL.png",
    tags: ["Node.js", "TypeScript", "Firebase", " CSS"],
    category: "fullstack", 
    liveUrl: "https://sgl-app-99e58.web.app",
    githubUrl: "https://github.com/ChaseSivuku/Smart-Grid-Link.git",
  },
  {
    id: 2,
    title: "HopIn Hotel Booking System",
    description: "A hotel booking system with a modern, user-friendly interface and a focus on usability and performance.",
    image: "/HopIn.png",
    tags: ["React", "TypeScript", "Node.js", "Express", "Stripe Payments", "REST API"],
    category: "backend",
    liveUrl: "https://hop-in-booking-system.vercel.app/",
    githubUrl: "https://github.com/MRNMT/HopInBookingSystem",
  },
  {
    id: 3,
    title: "Dynamic-Dev-Cards",
    description: "Getting data from a spreadsheet dynamically and displaying it using DOM manipulation and Express",
    image: "/Dynamic-Dev-Cards.png",
    tags: ["HTML", "Node.js", "DOM Manipulation", "Express"],
    category: "backend",
    liveUrl: "https://dynamic-dev-cards.onrender.com/",
    githubUrl: "https://github.com/ChaseSivuku/dynamic-dev-cards.git",
  },
  {
    id: 4,
    title: "React UI Challenge",
    description: "A frontend challenge to replicate a design from Dribbble.",
    image: "/ui-challenge.png",
    tags: ["React", "CSS"],
    category: "frontend",
    liveUrl: "https://task-8-2-ui-challenge.vercel.app/",
    githubUrl: "https://github.com/ChaseSivuku/Task-8.2-UI-Challenge.git",
  },
  {
    id: 5,
    title: "Weather App",
    description: "A simple weather app that displays the weather for a given location.",
    image: "/weather.png",
    tags: ["Tailwind CSS", "React", "API requests"],
    category: "fullstack",
    liveUrl: "https://task-4-weather-app-react.vercel.app",
    githubUrl: "https://github.com/ChaseSivuku/Task-4---Weather-App-React-.git",
  },
  {
    id: 6,
    title: "Job Application Tracker",
    description: "Simple job application tracker built with React and JSON-Server. Add, edit, and delete job applications with ease.",
    image: "/job.png",
    tags: ["React", "CSS", "REST API", "JSON-Server"],
    category: "restapi",
    liveUrl: "https://react-job-application-tracker-g0y3.onrender.com",
    githubUrl: "https://github.com/ChaseSivuku/React-Job-Application-Tracker.git",
  },
]

const filters = [
  { label: "All", value: "all" },
  { label: "Full Stack", value: "fullstack" },
  { label: "Frontend", value: "frontend" },
  { label: "Backend", value: "backend" },
  { label: "Rest API", value: "restapi" },
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
