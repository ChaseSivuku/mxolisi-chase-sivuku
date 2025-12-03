import { useInView } from "@/hooks/use-in-view"
import { cn } from "@/lib/utils"

// Import icons
import reactNativeIcon from "@/assets/icons/mobile_11674482.png"
import typescriptIcon from "@/assets/icons/typescript_5968381.png"
import tailwindIcon from "@/assets/icons/icons8-tailwind-css-48.png"
import cssIcon from "@/assets/icons/css.png"
import kotlinIcon from "@/assets/icons/icons8-kotlin-48.png"
import nodejsIcon from "@/assets/icons/node-js.png"
import expressIcon from "@/assets/icons/icons8-express-js-64.png"
import apiIcon from "@/assets/icons/api.png"
import javaIcon from "@/assets/icons/java.png"
import postgresqlIcon from "@/assets/icons/icons8-postgresql-24.png"
import oracleIcon from "@/assets/icons/Oracle.png"
import supabaseIcon from "@/assets/icons/icons8-supabase-48.png"
import firebaseIcon from "@/assets/icons/icons8-firebase-48.png"
import gitIcon from "@/assets/icons/icons8-git-48.png"
import glassfishIcon from "@/assets/icons/javaee_glassfish_logo_icon_170554.png"
import figmaIcon from "@/assets/icons/figma_logo_icon_170157.ico"
import vscodeIcon from "@/assets/icons/file_type_vscode_icon_130084.png"
import postmanIcon from "@/assets/icons/postman_alt_macos_bigsur_icon_189814.png"
import netbeansIcon from "@/assets/icons/icons8-apache-netbeans-48.png"
import vercelIcon from "@/assets/icons/vercel_brand_icon_211876.png"
import netlifyIcon from "@/assets/icons/netlify_logo_icon_169923.png"

const techCategories = [
  {
    title: "Frontend",
    technologies: [
      { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", url: "https://react.dev", isImage: true },
      { name: "React Native", icon: reactNativeIcon, url: "https://reactnative.dev", isImage: true },
      { name: "TypeScript", icon: typescriptIcon, url: "https://www.typescriptlang.org", isImage: true },
      { name: "Tailwind CSS", icon: tailwindIcon, url: "https://tailwindcss.com", isImage: true },
      { name: "CSS", icon: cssIcon, url: "https://developer.mozilla.org/en-US/docs/Web/CSS", isImage: true },
      { name: "Kotlin", icon: kotlinIcon, url: "https://kotlinlang.org", isImage: true },
    ],
  },
  {
    title: "Backend",
    technologies: [
      { name: "Node.js", icon: nodejsIcon, url: "https://nodejs.org", isImage: true },
      { name: "Express", icon: expressIcon, url: "https://expressjs.com", isImage: true },
      { name: "J2EE", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original-wordmark.svg", url: "https://www.oracle.com/java/technologies/java-ee-glance.html", isImage: true },
      { name: "REST API", icon: apiIcon, url: "https://restfulapi.net", isImage: true },
      { name: "JAVA", icon: javaIcon, url: "https://www.java.com", isImage: true },
      { name: "JSON-Server", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/json/json-plain.svg", url: "https://github.com/typicode/json-server", isImage: true },
    ],
  },
  {
    title: "Databases",
    technologies: [
      { name: "PostgreSQL", icon: postgresqlIcon, url: "https://www.postgresql.org", isImage: true },
      { name: "PL/SQL", icon: oracleIcon, url: "https://www.oracle.com/database/technologies/appdev/plsql.html", isImage: true },
      { name: "Supabase", icon: supabaseIcon, url: "https://supabase.com", isImage: true },
      { name: "Firebase", icon: firebaseIcon, url: "https://firebase.google.com", isImage: true },
    ],
  },
  {
    title: "Tools & Platforms",
    technologies: [
      { name: "Git", icon: gitIcon, url: "https://git-scm.com", isImage: true },
      { name: "Glassfish", icon: glassfishIcon, url: "https://glassfish.org", isImage: true },
      { name: "Figma", icon: figmaIcon, url: "https://www.figma.com", isImage: true },
      { name: "VS Code", icon: vscodeIcon, url: "https://code.visualstudio.com", isImage: true },
      { name: "Postman", icon: postmanIcon, url: "https://www.postman.com", isImage: true },
      { name: "NetBeans", icon: netbeansIcon, url: "https://netbeans.apache.org", isImage: true },
    ],
  },
  {
    title: "Cloud Services",
    technologies: [
      { name: "Vercel", icon: vercelIcon, url: "https://vercel.com", isImage: true },
      { name: "Render", icon: "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/render.svg", url: "https://render.com", isImage: true },
      { name: "Netlify", icon: netlifyIcon, url: "https://www.netlify.com", isImage: true },
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
                    {tech.isImage ? (
                      <img
                        src={tech.icon}
                        alt={tech.name}
                        className="w-12 h-12 object-contain group-hover:scale-110 transition-transform"
                      />
                    ) : (
                      <span className="text-3xl group-hover:scale-110 transition-transform">{tech.icon}</span>
                    )}
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
