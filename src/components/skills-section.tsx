import { useInView } from "@/hooks/use-in-view"
import { cn } from "@/lib/utils"

const skillCategories = [
  {
    title: "Languages",
    skills: [
      { name: "TypeScript", level: 70 },
      { name: "Kotlin", level: 40 },
      { name: "JAVA", level: 80 },
      { name: "SQL", level: 70 },
    ],
  },
  {
    title: "Frameworks & Libraries",
    skills: [
      { name: "React + Vite", level: 65 },
      { name: "Node.js", level: 80 },
      { name: "Tailwind CSS", level: 60 },
      { name: "Express", level: 85 },
    ],
  },
  {
    title: "DevOps & Tools",
    skills: [
      { name: "npm", level: 90 },
      { name: "AWS", level: 80 },
      { name: "PL/SQL", level: 85 },
      { name: "Git", level: 95 },
    ],
  },
  {
    title: "Soft Skills",
    skills: [
      { name: "Team Leadership", level: 90 },
      { name: "Communication", level: 95 },
      { name: "Problem Solving", level: 95 },
      { name: "Mentoring", level: 85 },
    ],
  },
]

export function SkillsSection() {
  const { ref, isInView } = useInView({ threshold: 0.1 })

  return (
    <section id="skills" className="py-24 px-6 bg-secondary/30" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-primary text-sm font-medium tracking-wider uppercase mb-4">My Expertise</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance">Skills & Proficiency</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <div
              key={category.title}
              className={cn(
                "p-6 rounded-xl bg-card border border-border transition-all duration-700",
                isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
              )}
              style={{ transitionDelay: `${categoryIndex * 100}ms` }}
            >
              <h3 className="text-lg font-semibold text-foreground mb-6">{category.title}</h3>
              <div className="space-y-5">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skill.name}>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-muted-foreground">{skill.name}</span>
                      <span className="text-sm text-primary font-medium">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div
                        className={cn(
                          "h-full bg-primary rounded-full transition-all duration-1000 ease-out",
                          isInView ? "" : "!w-0",
                        )}
                        style={{
                          width: isInView ? `${skill.level}%` : "0%",
                          transitionDelay: `${(categoryIndex * 4 + skillIndex) * 100}ms`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
