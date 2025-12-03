import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { TechStackSection } from "@/components/tech-stack-section"
import { SkillsSection } from "@/components/skills-section"
import { ProjectsSection } from "@/components/projects-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { ChatbotWidget } from "@/components/chatbot-widget"
import { ThemeProvider } from "@/components/theme-provider"

function App() {
  return (
    <ThemeProvider defaultTheme="dark" attribute="class">
      <main className="min-h-screen bg-background">
        <Navigation />
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <TechStackSection />
        <ProjectsSection />
        <ContactSection />
        <Footer />
        <ChatbotWidget />
      </main>
    </ThemeProvider>
  )
}

export default App

