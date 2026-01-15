import { Github, Linkedin, Instagram, Mail } from "lucide-react";
import logoImage from "@/assets/logo-text-bg-Photoroom.png";

const quickLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

const socialLinks = [
  { icon: Github, href: "https://github.com/ChaseSivuku", label: "GitHub" },
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/in/mxolisi-sivuku-b27a1b186",
    label: "LinkedIn",
  },
  {
    icon: Instagram,
    href: "https://www.instagram.com/chase_sivuku",
    label: "Instagram",
  },
  { icon: Mail, href: "mailto:mxolisi.sivuku@gmail.com", label: "Email" },
];

export function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-border">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <a href="#home" className="flex items-center">
              <img src={logoImage} alt="Logo" className="h-24 w-auto" />
            </a>
            <p className="text-muted-foreground mt-2 text-sm">
              Full Stack Developer crafting beautiful, accessible digital
              experiences.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
            <nav className="flex flex-col gap-2">
              {quickLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Connect</h4>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-secondary transition-all"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
