import type React from "react"

import { useState } from "react"
import { MessageCircle, X, Send, Bot, User, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface Message {
  id: number
  text: string
  sender: "bot" | "user"
  timestamp: Date
}

const initialMessages: Message[] = [
  {
    id: 1,
    text: "Hi there! 👋 I'm Chase's AI assistant. I can answer questions about Chase's background, projects, skills, and experience. How can I help you today?",
    sender: "bot",
    timestamp: new Date(),
  },
]

// System prompt with all of Chase's information
const systemPrompt = `You are an AI assistant representing Mxolisi Chase Sivuku, a Full Stack Developer. Your role is to help visitors learn about Chase's background, projects, skills, and experience. Be friendly, professional, and informative.

Here is Chase's information:

**Personal Information:**
- Full Name: Mxolisi Chase Sivuku
- Title: Full Stack Developer
- Location: Pretoria, South Africa
- Email: mxolisi.sivuku@gmail.com
- GitHub: https://github.com/ChaseSivuku
- LinkedIn: https://www.linkedin.com/in/mxolisi-sivuku-b27a1b186
- Instagram: https://www.instagram.com/chase_sivuku

**Professional Summary:**
Chase builds reliable, user-focused web systems that balance clean design with solid engineering. His work sits at the intersection of backend logic and front-end usability, creating solutions that not only look good but are built for performance, scalability, and real-world functionality.

**Background:**
- Currently a Trainee in full-stack development at mLab - CodeTribe
- Computer Science Graduate from Tshwane University of Technology
- Has developed 50+ projects with repositories on GitHub
- Open to remote opportunities

**Current Focus:**
Chase is focusing on backend development with React TS, React Native, Node.js, TypeScript, and PostgreSQL. He has contributed to projects ranging from hotel-booking systems and logistics platforms to collaborative farming tools and cloud-security dashboards.

**Skills:**

Languages:
- TypeScript (70%)
- Kotlin (40%)
- JAVA (80%)
- SQL (70%)

Frameworks & Libraries:
- React + Vite (65%)
- Node.js (80%)
- Tailwind CSS (60%)
- Express (85%)

DevOps & Tools:
- npm (90%)
- AWS (80%)
- PL/SQL (85%)
- Git (95%)

Soft Skills:
- Team Leadership (90%)
- Communication (95%)
- Problem Solving (95%)
- Mentoring (85%)

**Tech Stack:**
Frontend: React, React Native, TypeScript, Tailwind CSS, CSS, Kotlin
Backend: Node.js, Express, J2EE, REST API, JAVA, JSON-Server
Databases: PostgreSQL, PL/SQL, Supabase, Firebase
Tools: Git, Glassfish, Figma, VS Code, Postman, NetBeans
Cloud Services: Vercel, Render, Netlify

**Featured Projects:**

1. Smart-Grid-Link
   - A full-stack peer-to-peer energy trading platform with real-time electricity exchange, IoT monitoring, AI optimization, and secure dashboards.
   - Tech: Node.js, TypeScript, Firebase, CSS
   - Live: https://sgl-app-99e58.web.app
   - GitHub: https://github.com/ChaseSivuku/Smart-Grid-Link.git

2. HopIn Hotel Booking System
   - A hotel booking system with a modern, user-friendly interface and a focus on usability and performance.
   - Tech: React, TypeScript, Node.js, Express, Stripe Payments, REST API
   - Live: https://hop-in-booking-system.vercel.app/
   - GitHub: https://github.com/MRNMT/HopInBookingSystem

3. Dynamic-Dev-Cards
   - Getting data from a spreadsheet dynamically and displaying it using DOM manipulation and Express
   - Tech: HTML, Node.js, DOM Manipulation, Express
   - Live: https://dynamic-dev-cards.onrender.com/
   - GitHub: https://github.com/ChaseSivuku/dynamic-dev-cards.git

4. React UI Challenge
   - A frontend challenge to replicate a design from Dribbble.
   - Tech: React, CSS
   - Live: https://task-8-2-ui-challenge.vercel.app/
   - GitHub: https://github.com/ChaseSivuku/Task-8.2-UI-Challenge.git

5. Weather App
   - A simple weather app that displays the weather for a given location.
   - Tech: Tailwind CSS, React, API requests
   - Live: https://task-4-weather-app-react.vercel.app
   - GitHub: https://github.com/ChaseSivuku/Task-4---Weather-App-React-.git

6. Job Application Tracker
   - Simple job application tracker built with React and JSON-Server. Add, edit, and delete job applications with ease.
   - Tech: React, CSS, REST API, JSON-Server
   - Live: https://react-job-application-tracker-g0y3.onrender.com
   - GitHub: https://github.com/ChaseSivuku/React-Job-Application-Tracker.git

**Hackathons & Achievements:**
- Participated in Limpopo Varsity Hackathon
- Participated in IBM Datathon

**Interests:**
In his spare time, Chase explores new tech, improves his React and security knowledge, or builds side projects inspired by hackathons. He believes in continuous learning, solving real problems, and growing through hands-on experience.

**CV/Resume:**
Chase has a detailed CV/Resume PDF available. When asked about specific qualifications, work experience, education details, or other resume information, you can mention that detailed information is available in his CV which can be downloaded from the portfolio site.

When answering questions:
- Be concise but informative
- Reference specific projects, skills, or experiences when relevant
- If asked about something not in the provided information, politely say you don't have that specific information but suggest they check the portfolio or contact Chase directly
- Always maintain a professional and friendly tone
- For questions about the CV/resume, mention that detailed information is in the downloadable PDF`

export function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const callGeminiAPI = async (userMessage: string, conversationHistory: Message[]) => {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY
    
    if (!apiKey) {
      return "I'm sorry, but the API key is not configured. Please contact Chase directly."
    }

    try {
      // Build conversation history for context (excluding the initial greeting)
      const recentMessages = conversationHistory.slice(1) // Skip initial greeting
      const conversationPairs = []
      
      // Group messages into user-assistant pairs
      for (let i = 0; i < recentMessages.length; i += 2) {
        if (recentMessages[i]?.sender === "user" && recentMessages[i + 1]?.sender === "bot") {
          conversationPairs.push({
            user: recentMessages[i].text,
            assistant: recentMessages[i + 1].text
          })
        }
      }

      // Build conversation context string
      const conversationContext = conversationPairs
        .slice(-4) // Keep last 4 conversation pairs
        .map(pair => `User: ${pair.user}\nAssistant: ${pair.assistant}`)
        .join('\n\n')

      // Combine system prompt with conversation context and current user message
      const fullPrompt = conversationContext 
        ? `${systemPrompt}\n\nPrevious conversation:\n${conversationContext}\n\nUser: ${userMessage}\nAssistant:`
        : `${systemPrompt}\n\nUser: ${userMessage}\nAssistant:`

      // Try to get available models first, then use the best one
      let workingModel = "gemini-2.5-flash" // Default to newest model
      
      try {
        const modelsResponse = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`
        )
        if (modelsResponse.ok) {
          const modelsData = await modelsResponse.json()
          const availableModels = modelsData.models?.filter((m: any) => 
            m.supportedGenerationMethods?.includes("generateContent")
          ) || []
          
          if (availableModels.length > 0) {
            // Prefer newer models in order: 2.5-flash > 2.5-pro > 2.5-flash-lite > 2.0-flash > others
            const modelPriority = [
              "gemini-2.5-flash",
              "gemini-2.5-pro", 
              "gemini-2.5-flash-lite",
              "gemini-2.0-flash",
              "gemini-2.0-flash-001",
              "gemini-2.0-flash-lite",
              "gemini-2.0-flash-lite-001"
            ]
            
            // Extract model names from full paths (e.g., "models/gemini-2.5-flash" -> "gemini-2.5-flash")
            const modelNames = availableModels.map((m: any) => m.name.split("/").pop())
            
            // Find the first model in priority order that's available
            const preferredModel = modelPriority.find(model => modelNames.includes(model))
            
            workingModel = preferredModel || modelNames[0] || "gemini-2.5-flash"
            console.log("Using model:", workingModel, "from available:", modelNames)
          }
        }
      } catch (err) {
        console.warn("Could not list models, using default:", err)
      }

      // Try multiple API versions with the working model
      const endpoints = [
        `https://generativelanguage.googleapis.com/v1beta/models/${workingModel}:generateContent?key=${apiKey}`,
        `https://generativelanguage.googleapis.com/v1/models/${workingModel}:generateContent?key=${apiKey}`,
      ]
      
      let response: Response | null = null
      let lastError: Error | null = null
      
      for (const endpoint of endpoints) {
        try {
          response = await fetch(endpoint, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              contents: [{
                parts: [{ text: fullPrompt }]
              }],
              generationConfig: {
                temperature: 0.7,
                topK: 40,
                topP: 0.95,
                maxOutputTokens: 1024,
              },
            }),
          })
          
          if (response.ok) {
            break // Success!
          } else {
            const errorData = await response.json().catch(() => ({}))
            lastError = new Error(errorData.error?.message || `HTTP ${response.status}`)
            // Continue to next endpoint
          }
        } catch (err) {
          lastError = err instanceof Error ? err : new Error(String(err))
          // Continue to next endpoint
        }
      }
      
      if (!response || !response.ok) {
        throw lastError || new Error("All API endpoint attempts failed. Please check your API key and model availability.")
      }

      const data = await response.json()
      const botResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || 
        "I'm sorry, I couldn't generate a response. Please try again or contact Chase directly."

      return botResponse.trim()
    } catch (error) {
      console.error("Gemini API error:", error)
      return error instanceof Error 
        ? `I encountered an error: ${error.message}. Please try again or contact Chase directly via the contact form.`
        : "I'm sorry, I encountered an error. Please try again or contact Chase directly via the contact form."
    }
  }

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim() || isLoading) return

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    const currentInput = inputValue
    setInputValue("")
    setIsLoading(true)

    try {
      const botResponseText = await callGeminiAPI(currentInput, messages)
      
      const botResponse: Message = {
        id: messages.length + 2,
        text: botResponseText,
        sender: "bot",
        timestamp: new Date(),
      }
      
      setMessages((prev) => [...prev, botResponse])
    } catch (error) {
      const errorResponse: Message = {
        id: messages.length + 2,
        text: "I'm sorry, I encountered an error processing your request. Please try again or contact Chase directly via the contact form.",
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorResponse])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-lg",
          "bg-primary text-primary-foreground",
          "hover:scale-110 transition-transform duration-300",
          "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
        )}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>

      {/* Chat Window */}
      <div
        className={cn(
          "fixed bottom-24 right-6 z-50 w-80 sm:w-96",
          "bg-card border border-border rounded-2xl shadow-2xl",
          "transition-all duration-300 origin-bottom-right",
          isOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-4 pointer-events-none",
        )}
      >
        {/* Header */}
        <div className="p-4 border-b border-border flex items-center gap-3">
          <div className="p-2 rounded-full bg-primary/10">
            <Bot className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">AI Assistant</h3>
            <p className="text-xs text-muted-foreground">Always here to help</p>
          </div>
          <div className="ml-auto flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs text-muted-foreground">Online</span>
          </div>
        </div>

        {/* Messages */}
        <div className="h-80 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={cn("flex gap-2", message.sender === "user" ? "flex-row-reverse" : "")}>
              <div
                className={cn("p-2 rounded-full shrink-0", message.sender === "bot" ? "bg-primary/10" : "bg-secondary")}
              >
                {message.sender === "bot" ? (
                  <Bot className="h-4 w-4 text-primary" />
                ) : (
                  <User className="h-4 w-4 text-secondary-foreground" />
                )}
              </div>
              <div
                className={cn(
                  "px-4 py-2 rounded-2xl max-w-[80%]",
                  message.sender === "bot"
                    ? "bg-secondary text-secondary-foreground rounded-tl-none"
                    : "bg-primary text-primary-foreground rounded-tr-none",
                )}
              >
                <p className="text-sm whitespace-pre-wrap">{message.text}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-2">
              <div className="p-2 rounded-full shrink-0 bg-primary/10">
                <Bot className="h-4 w-4 text-primary" />
              </div>
              <div className="px-4 py-2 rounded-2xl bg-secondary text-secondary-foreground rounded-tl-none">
                <Loader2 className="h-4 w-4 animate-spin" />
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <form onSubmit={handleSendMessage} className="p-4 border-t border-border flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type a message..."
            className="flex-1"
          />
          <Button type="submit" size="icon" disabled={!inputValue.trim() || isLoading}>
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </form>
      </div>
    </>
  )
}
