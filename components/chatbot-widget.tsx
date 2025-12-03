import type React from "react"

import { useState } from "react"
import { MessageCircle, X, Send, Bot, User } from "lucide-react"
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
    text: "Hi there! 👋 I'm Alex's AI assistant. How can I help you today?",
    sender: "bot",
    timestamp: new Date(),
  },
]

export function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [inputValue, setInputValue] = useState("")

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")

    // Simulate bot response (placeholder for actual AI integration)
    setTimeout(() => {
      const botResponse: Message = {
        id: messages.length + 2,
        text: "Thanks for your message! This is a placeholder response. AI functionality will be integrated soon. In the meantime, feel free to explore the portfolio or reach out via the contact form!",
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botResponse])
    }, 1000)
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
                <p className="text-sm">{message.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <form onSubmit={handleSendMessage} className="p-4 border-t border-border flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type a message..."
            className="flex-1"
          />
          <Button type="submit" size="icon" disabled={!inputValue.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </>
  )
}
