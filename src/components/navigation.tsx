import { useState, useEffect } from "react"
import { Menu, X, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import logoImage from "@/assets/logo-text-bg-Photoroom.png"
import resumePdf from "@/assets/Mxolisi Sivuku Resume PDF.pdf"

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#tech-stack", label: "Tech Stack" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
]

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-background/80 backdrop-blur-md border-b border-border" : "bg-transparent",
      )}
    >
      <div className="max-w-6xl mx-auto px-6 py-2">
        <div className="flex items-center justify-between">
          <a href="#home" className="flex items-center">
            <img 
              src={logoImage} 
              alt="Logo" 
              className="h-24 w-auto"
            />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
            <Button size="sm" className="gap-2" asChild>
              <a href={resumePdf} download="Mxolisi Sivuku Resume.pdf">
                <Download className="h-4 w-4" />
                Download CV
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-border pt-4">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-muted-foreground hover:text-primary transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <Button size="sm" className="gap-2 w-fit" asChild>
                <a href={resumePdf} download="Mxolisi Sivuku Resume.pdf">
                  <Download className="h-4 w-4" />
                  Download CV
                </a>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
