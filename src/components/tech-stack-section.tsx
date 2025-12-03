import { useInView } from "@/hooks/use-in-view"
import { cn } from "@/lib/utils"

const techCategories = [
  {
    title: "Frontend",
    technologies: [
      { name: "React", icon: "⚛️", url: "https://react.dev" },
      { name: "React Native", icon: "📱", url: "https://reactnative.dev" },
      { name: "TypeScript", icon: "📘", url: "https://www.typescriptlang.org" },
      { name: "Tailwind CSS", icon: "🎨", url: "https://tailwindcss.com" },
      { name: "CSS", icon: "💅", url: "https://developer.mozilla.org/en-US/docs/Web/CSS" },
      { name: "Kotlin", icon: "🔷", url: "https://kotlinlang.org" },
    ],
  },
  {
    title: "Backend",
    technologies: [
      { name: "Node.js", icon: "💚", url: "https://nodejs.org" },
      { name: "Express", icon: "🚂", url: "https://expressjs.com" },
      { name: "J2EE", icon: "☕", url: "https://www.oracle.com/java/technologies/java-ee-glance.html" },
      { name: "REST API", icon: "🔗", url: "https://restfulapi.net" },
      { name: "JAVA", icon: "☕", url: "https://www.java.com" },
      { name: "JSON-Server", icon: "📡", url: "https://github.com/typicode/json-server" },
    ],
  },
  {
    title: "Databases",
    technologies: [
      { name: "PostgreSQL", icon: "🐘", url: "https://www.postgresql.org" },
      { name: "PL/SQL", icon: "🗄️", url: "https://www.oracle.com/database/technologies/appdev/plsql.html" },
      { name: "Supabase", icon: "⚡", url: "https://supabase.com" },
      { name: "Firebase", icon: "🔥", url: "https://firebase.google.com" },
    ],
  },
  {
    title: "Tools & Platforms",
    technologies: [
      { name: "Git", icon: "📝", url: "https://git-scm.com" },
      { name: "Glassfish", icon: "🐠", url: "https://glassfish.org" },
      { name: "Figma", icon: "🎨", url: "https://www.figma.com" },
      { name: "VS Code", icon: "💻", url: "https://code.visualstudio.com" },
      { name: "Postman", icon: "📮", url: "https://www.postman.com" },
      { name: "NetBeans", icon: "☕", url: "https://netbeans.apache.org" },
    ],
  },
  {
    title: "Cloud Services",
    technologies: [
      { name: "Vercel", icon: "▲", url: "https://vercel.com" },
      { name: "Render", icon: "🎨", url: "https://render.com" },
      { name: "Netlify", icon: "🌿", url: "https://www.netlify.com" },
    ],
  },
]

export function TechStackSection() {
  const { ref, isInView } = useInView({ threshold: 0.1 })

  return (
    <section id="tech-stack" className="py-24 px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-primary text-sm font-medium tracking-wider uppercase mb-4">Technologies I Work With</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance">Tech Stack</h2>
        </div>

        <div className="space-y-12">
          {techCategories.map((category, categoryIndex) => (
            <div
              key={category.title}
              className={cn(
                "transition-all duration-700",
                isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
              )}
              style={{ transitionDelay: `${categoryIndex * 100}ms` }}
            >
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <span className="w-8 h-px bg-primary"></span>
                {category.title}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                {category.technologies.map((tech, techIndex) => (
                  <a
                    key={tech.name}
                    href={tech.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "group p-4 rounded-lg bg-card border border-border",
                      "hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5",
                      "hover:-translate-y-1 transition-all duration-300",
                      "flex flex-col items-center gap-2",
                      "cursor-pointer",
                    )}
                    style={{ transitionDelay: `${techIndex * 50}ms` }}
                    aria-label={`Visit ${tech.name} website`}
                  >
                    <span className="text-3xl group-hover:scale-110 transition-transform">{tech.icon}</span>
                    <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                      {tech.name}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
