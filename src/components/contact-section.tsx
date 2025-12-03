import type React from "react"
import { useState } from "react"
import { useInView } from "@/hooks/use-in-view"
import { Send, Mail, Github, Linkedin, Instagram, Loader2, CheckCircle2, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

const socialLinks = [
  { icon: Github, href: "https://github.com", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
  { icon: Mail, href: "mailto:mxolisi.sivuku@gmail.com", label: "Email" },
]

type FormStatus = "idle" | "submitting" | "success" | "error"

export function ContactSection() {
  const { ref, isInView } = useInView({ threshold: 0.2 })
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [status, setStatus] = useState<FormStatus>("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("submitting")
    setErrorMessage("")

    try {
      const projectId = import.meta.env.VITE_FORMSPREE_PROJECT_ID
      const deployKey = import.meta.env.VITE_FORMSPREE_DEPLOY_KEY

      if (!projectId || !deployKey) {
        throw new Error("FormSpree configuration is missing. Please check your environment variables.")
      }

      // FormSpree API endpoint - using project ID as form ID
      const response = await fetch(`https://formspree.io/f/${projectId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _access_key: deployKey,
        }),
      })

      if (response.ok) {
        setStatus("success")
        setFormData({ name: "", email: "", message: "" })
        // Reset success message after 5 seconds
        setTimeout(() => {
          setStatus("idle")
        }, 5000)
      } else {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || "Failed to send message. Please try again.")
      }
    } catch (error) {
      setStatus("error")
      setErrorMessage(error instanceof Error ? error.message : "An unexpected error occurred. Please try again.")
    }
  }

  return (
    <section id="contact" className="py-24 px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-primary text-sm font-medium tracking-wider uppercase mb-4">Get In Touch</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">Let's Work Together</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            If you would like to discuss a project or just say hi, I'm always down to chat.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <div
            className={cn(
              "transition-all duration-700",
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
            )}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {status === "success" && (
                <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <p className="text-sm text-green-600 dark:text-green-400">
                    Thank you! Your message has been sent successfully. I'll get back to you soon.
                  </p>
                </div>
              )}

              {status === "error" && (
                <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-red-600 dark:text-red-400 mb-1">Error sending message</p>
                    <p className="text-xs text-red-500 dark:text-red-400">{errorMessage}</p>
                  </div>
                </div>
              )}

              <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                  Name
                </label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  disabled={status === "submitting"}
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  disabled={status === "submitting"}
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                  Message
                </label>
                <Textarea
                  id="message"
                  placeholder="Tell me about your project..."
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  disabled={status === "submitting"}
                />
              </div>
              <Button type="submit" size="lg" className="w-full gap-2" disabled={status === "submitting" || status === "success"}>
                {status === "submitting" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : status === "success" ? (
                  <>
                    <CheckCircle2 className="h-4 w-4" />
                    Message Sent!
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </div>

          {/* Contact Info */}
          <div
            className={cn(
              "transition-all duration-700 delay-200",
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
            )}
          >
            <div className="bg-card border border-border rounded-xl p-8">
              <h3 className="text-xl font-semibold text-foreground mb-6">Connect With Me</h3>
              <div className="space-y-4 mb-8">
                <p className="text-muted-foreground">
                  I'm currently open to new opportunities and collaborations. Feel free to reach out through any of
                  these platforms:
                </p>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="h-5 w-5 text-primary" />
                  <a href="mailto:mxolisi.sivuku@gmail.com" className="hover:text-primary transition-colors">
                    mxolisi.sivuku@gmail.com
                  </a>
                </div>
              </div>

              <h4 className="text-sm font-medium text-foreground mb-4">Social Media</h4>
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "p-3 rounded-lg bg-secondary text-secondary-foreground",
                      "hover:bg-primary hover:text-primary-foreground",
                      "transition-all duration-300",
                    )}
                    aria-label={social.label}
                  >
                    <social.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
