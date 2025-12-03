import { useInView } from "@/hooks/use-in-view"
import { MapPin, Briefcase, GraduationCap, Award } from "lucide-react"
import { cn } from "@/lib/utils"

const highlights = [
  {
    icon: Briefcase,
    title: "mLab - CodeTribe",
    description: "Trainee in full-stack development",
  },
  {
    icon: Award,
    title: "50+ Projects Developed",
    description: "Repositories on Github",
  },
  {
    icon: GraduationCap,
    title: "CS Graduate",
    description: "Tshwane University of Technology",
  },
  {
    icon: MapPin,
    title: "Pretoria, South Africa",
    description: "Open to remote opportunities",
  },
]

export function AboutSection() {
  const { ref, isInView } = useInView({ threshold: 0.2 })

  return (
    <section id="about" className="py-24 px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div
            className={cn(
              "transition-all duration-700",
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
            )}
          >
            <p className="text-primary text-sm font-medium tracking-wider uppercase mb-4">About Me</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 text-balance">
              Passionate about building impactful digital systems
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                I'm a developer passionate about creating reliable, scalable web applications that blend clean user experiences with strong backend engineering. My work sits at the intersection of full-stack development and practical problem-solving, building systems that not only function smoothly but are designed for performance, clarity, and real-world use.
              </p>
              <p>
                Currently, I'm focusing on backend development with React TS, React Native, Node.js, TypeScript, and PostgreSQL. I've contributed to projects ranging from hotel-booking systems and logistics platforms to collaborative farming tools and cloud-security dashboards, always aiming to deliver efficient APIs, structured databases, and intuitive user flows.
              </p>
              <p>
                In my spare time, I'm usually exploring new tech, improving my React and security knowledge, or building side projects inspired by hackathons I've participated in—like the Limpopo Varsity Hackathon and IBM Datathon. I believe in continuous learning, solving real problems, and growing through hands-on experience.
              </p>
            </div>
          </div>

          <div
            className={cn(
              "grid grid-cols-2 gap-4 transition-all duration-700 delay-200",
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
            )}
          >
            {highlights.map((item, index) => (
              <div
                key={item.title}
                className={cn(
                  "p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300",
                  "hover:shadow-lg hover:shadow-primary/5",
                )}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <item.icon className="h-8 w-8 text-primary mb-4" />
                <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
