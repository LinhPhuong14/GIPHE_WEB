"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MessageCircle, Send, X } from "lucide-react"

interface Message {
  role: "user" | "assistant"
  content: string
}

export function ChatbotAdvisor() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi there! I'm your learning advisor. How can I help you with your studies today?",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!input.trim()) return

    const userMessage: Message = {
      role: "user",
      content: input,
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulate AI response - in a real app, this would call an API
    setTimeout(() => {
      const aiResponse: Message = {
        role: "assistant",
        content: getAIResponse(input),
      }
      setMessages((prev) => [...prev, aiResponse])
      setIsLoading(false)
    }, 1000)
  }

  // Simple response generator - would be replaced with actual AI in production
  const getAIResponse = (userInput: string): string => {
    const input = userInput.toLowerCase()

    if (input.includes("vocabulary") || input.includes("flashcard")) {
      return "To improve your vocabulary, I recommend using our flashcard feature daily. Start with 10-15 new words per day and review them regularly. Would you like me to help you create a vocabulary study plan?"
    } else if (input.includes("test") || input.includes("exam")) {
      return "For test preparation, I suggest taking practice tests in our test section. Focus on areas where you score lower and use the pomodoro timer to structure your study sessions. Would you like specific tips for a particular test?"
    } else if (input.includes("schedule") || input.includes("plan")) {
      return "Creating a consistent study schedule is key to success. Our schedule management tool can help you organize your time effectively. I recommend 25-minute focused sessions with 5-minute breaks. Would you like help setting up your study schedule?"
    } else if (input.includes("conversation") || input.includes("speaking")) {
      return "To improve your conversation skills, practice regularly with our AI conversation partner. Try to speak on various topics for at least 15 minutes daily. Would you like some conversation prompts to get started?"
    } else if (input.includes("hello") || input.includes("hi")) {
      return "Hello! I'm here to help with your learning journey. What specific subject or skill are you focusing on right now?"
    } else {
      return "That's an interesting question about your learning journey. Could you tell me more about your specific goals or challenges? I can provide tailored advice for vocabulary learning, test preparation, scheduling, or conversation practice."
    }
  }

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 rounded-full h-12 w-12 p-0 shadow-lg"
        aria-label="Open chat advisor"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>

      {isOpen && (
        <Card className="fixed bottom-4 right-4 w-80 md:w-96 shadow-xl z-50 flex flex-col max-h-[500px]">
          <CardHeader className="p-4 flex flex-row items-center justify-between space-y-0 border-b">
            <CardTitle className="text-base font-medium">Learning Advisor</CardTitle>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </CardHeader>
          <CardContent className="p-0 flex-1 overflow-hidden">
            <div className="flex flex-col h-[350px] overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] rounded-lg px-4 py-2 ${
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground"
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="max-w-[80%] rounded-lg px-4 py-2 bg-secondary text-secondary-foreground">
                    <div className="flex space-x-2">
                      <div
                        className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce"
                        style={{ animationDelay: "0ms" }}
                      ></div>
                      <div
                        className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce"
                        style={{ animationDelay: "150ms" }}
                      ></div>
                      <div
                        className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce"
                        style={{ animationDelay: "300ms" }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            <form onSubmit={handleSendMessage} className="p-4 border-t flex space-x-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask for learning advice..."
                className="flex-1"
                disabled={isLoading}
              />
              <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
                <Send className="h-4 w-4" />
                <span className="sr-only">Send message</span>
              </Button>
            </form>
          </CardContent>
        </Card>
      )}
    </>
  )
}

