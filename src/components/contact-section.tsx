import { useInView } from "@/hooks/use-in-view";
import { useForm, ValidationError } from "@formspree/react";
import {
  Send,
  Mail,
  Github,
  Linkedin,
  Instagram,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

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

export function ContactSection() {
  const { ref, isInView } = useInView({ threshold: 0.2 });
  
  // Get form ID from environment variable and trim whitespace
  const formId = import.meta.env.VITE_FORMSPREE_FORM_ID?.trim();
  
  // Use Formspree's useForm hook
  const [state, handleSubmit] = useForm(formId || "");

  // Show error if form ID is missing
  const formIdError = !formId;
  
  // Get error message from Formspree
  const getErrorMessage = () => {
    if (formIdError) {
      return "FormSpree form ID is missing. Please set VITE_FORMSPREE_FORM_ID in your .env file.";
    }
    if (state.errors) {
      // Check for field errors - Formspree errors are typically field-specific
      const errorEntries = Object.entries(state.errors);
      if (errorEntries.length > 0) {
        // Get the first error message
        const firstError = errorEntries[0][1];
        if (typeof firstError === 'string') {
          return firstError;
        }
        if (Array.isArray(firstError) && firstError.length > 0) {
          return firstError[0];
        }
      }
    }
    return "Failed to send message. Please check your form and try again.";
  };

  return (
    <section id="contact" className="py-24 px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-primary text-sm font-medium tracking-wider uppercase mb-4">
            Get In Touch
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            Let's Work Together
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            If you would like to discuss a project or just say hi, I'm always
            down to chat.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <div
            className={cn(
              "transition-all duration-700",
              isInView
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            )}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {state.succeeded && (
                <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <p className="text-sm text-green-600 dark:text-green-400">
                    Thank you! Your message has been sent successfully. I'll get
                    back to you soon.
                  </p>
                </div>
              )}

              {((formIdError || state.errors) && !state.succeeded) && (
                <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-red-600 dark:text-red-400 mb-1">
                      Error sending message
                    </p>
                    <p className="text-xs text-red-500 dark:text-red-400">
                      {getErrorMessage()}
                    </p>
                  </div>
                </div>
              )}

              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Name
                </label>
                <Input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Your name"
                  required
                  disabled={state.submitting}
                />
                {state.errors && <ValidationError prefix="Name" field="name" errors={state.errors} />}
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  required
                  disabled={state.submitting}
                />
                {state.errors && <ValidationError prefix="Email" field="email" errors={state.errors} />}
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Tell me about your project..."
                  rows={5}
                  required
                  disabled={state.submitting}
                />
                {state.errors && <ValidationError prefix="Message" field="message" errors={state.errors} />}
              </div>
              <Button
                type="submit"
                size="lg"
                className="w-full gap-2"
                disabled={state.submitting || state.succeeded}
              >
                {state.submitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : state.succeeded ? (
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
              isInView
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            )}
          >
            <div className="bg-card border border-border rounded-xl p-8">
              <h3 className="text-xl font-semibold text-foreground mb-6">
                Connect With Me
              </h3>
              <div className="space-y-4 mb-8">
                <p className="text-muted-foreground">
                  I'm currently open to new opportunities and collaborations.
                  Feel free to reach out through any of these platforms:
                </p>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="h-5 w-5 text-primary" />
                  <a
                    href="mailto:mxolisi.sivuku@gmail.com"
                    className="hover:text-primary transition-colors"
                  >
                    mxolisi.sivuku@gmail.com
                  </a>
                </div>
              </div>

              <h4 className="text-sm font-medium text-foreground mb-4">
                Social Media
              </h4>
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
                      "transition-all duration-300"
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
  );
}
