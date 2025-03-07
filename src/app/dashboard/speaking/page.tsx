"use client"

import { useState, useRef, useEffect } from "react"
import { Mic, MicOff, Square, Send, User, Bot } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { motion } from "framer-motion"

// Mock speaking prompts
const speakingPrompts = [
  {
    id: 1,
    title: "Introducing Yourself",
    description: "Talk about yourself, your background, and your interests.",
    difficulty: "Beginner",
    duration: "2 minutes",
    questions: [
      "Could you tell me about yourself?",
      "What do you do in your free time?",
      "What are your strengths and weaknesses?",
      "What are your future goals?",
    ],
  },
  {
    id: 2,
    title: "Describing Your Hometown",
    description: "Describe your hometown, its features, and what you like about it.",
    difficulty: "Intermediate",
    duration: "3 minutes",
    questions: [
      "Where is your hometown located?",
      "What are some interesting places to visit in your hometown?",
      "How has your hometown changed over the years?",
      "Would you recommend people to visit your hometown? Why?",
    ],
  },
  {
    id: 3,
    title: "Discussing Environmental Issues",
    description: "Express your opinions on environmental problems and possible solutions.",
    difficulty: "Advanced",
    duration: "4 minutes",
    questions: [
      "What do you think are the most serious environmental problems today?",
      "How can individuals contribute to environmental protection?",
      "Do you think governments are doing enough to address climate change?",
      "How might environmental issues affect future generations?",
    ],
  },
]

// Mock conversation
const initialConversation = [
  {
    role: "system",
    content:
      "Welcome to the speaking practice session. I'll be your AI examiner today. Let's begin with the first question.",
  },
]

export default function SpeakingPracticePage() {
  const [selectedPrompt, setSelectedPrompt] = useState(speakingPrompts[0])
  const [isRecording, setIsRecording] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [conversation, setConversation] = useState(initialConversation)
  const [userInput, setUserInput] = useState("")
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [isAIThinking, setIsAIThinking] = useState(false)

  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [conversation])

  // Handle recording timer
  useEffect(() => {
    if (isRecording) {
      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => {
          if (prev >= Number.parseInt(selectedPrompt.duration) * 60) {
            stopRecording()
            return prev
          }
          return prev + 1
        })
      }, 1000)
    } else if (timerRef.current) {
      clearInterval(timerRef.current)
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [isRecording, selectedPrompt.duration])

  const startRecording = () => {
    setIsRecording(true)
    setRecordingTime(0)
    // In a real app, you would start audio recording here
  }

  const stopRecording = () => {
    setIsRecording(false)
    // In a real app, you would stop and process audio recording here
  }

  const handleSendMessage = () => {
    if (!userInput.trim()) return

    // Add user message to conversation
    const newConversation = [...conversation, { role: "user", content: userInput }]
    setConversation(newConversation)
    setUserInput("")

    // Simulate AI thinking
    setIsAIThinking(true)

    // Simulate AI response after a delay
    setTimeout(() => {
      let aiResponse

      if (currentQuestionIndex < selectedPrompt.questions.length - 1) {
        // If there are more questions, provide feedback and ask the next question
        aiResponse = {
          role: "system",
          content: `Thank you for your response. ${getRandomFeedback()} Let's move on to the next question: ${selectedPrompt.questions[currentQuestionIndex + 1]}`,
        }
        setCurrentQuestionIndex((prev) => prev + 1)
      } else {
        // If all questions have been asked, provide a summary
        aiResponse = {
          role: "system",
          content:
            "Thank you for completing this speaking practice session. Overall, your responses were well-structured and you demonstrated good vocabulary usage. Continue practicing to improve your fluency and pronunciation.",
        }
      }

      setConversation([...newConversation, aiResponse])
      setIsAIThinking(false)
    }, 1500)
  }

  const getRandomFeedback = () => {
    const feedback = [
      "You expressed your ideas clearly.",
      "Try to use more varied vocabulary in your next response.",
      "Your pronunciation was good, but work on your intonation.",
      "You provided a comprehensive answer with good examples.",
      "Consider organizing your thoughts more before responding.",
    ]
    return feedback[Math.floor(Math.random() * feedback.length)]
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const getProgressPercentage = () => {
    const maxSeconds = Number.parseInt(selectedPrompt.duration) * 60
    return (recordingTime / maxSeconds) * 100
  }

  return (
    <div className="container py-6">
      <h1 className="text-3xl font-bold mb-6">Speaking Practice</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Speaking Topics</CardTitle>
              <CardDescription>Select a topic to practice</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {speakingPrompts.map((prompt) => (
                <motion.div key={prompt.id} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Card
                    className={`cursor-pointer hover:border-primary ${selectedPrompt.id === prompt.id ? "border-primary bg-primary/5" : ""}`}
                    onClick={() => {
                      if (!isRecording) {
                        setSelectedPrompt(prompt)
                        setCurrentQuestionIndex(0)
                        setConversation([
                          {
                            role: "system",
                            content: `Let's practice speaking about "${prompt.title}". ${prompt.questions[0]}`,
                          },
                        ])
                      }
                    }}
                  >
                    <CardHeader className="p-4">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{prompt.title}</CardTitle>
                        <Badge
                          variant={
                            prompt.difficulty === "Beginner"
                              ? "secondary"
                              : prompt.difficulty === "Intermediate"
                                ? "default"
                                : "destructive"
                          }
                        >
                          {prompt.difficulty}
                        </Badge>
                      </div>
                      <CardDescription>{prompt.description}</CardDescription>
                    </CardHeader>
                    <CardFooter className="p-4 pt-0 text-sm text-muted-foreground">
                      Duration: {prompt.duration}
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card className="h-full flex flex-col">
            <CardHeader>
              <CardTitle>{selectedPrompt.title}</CardTitle>
              <CardDescription>{selectedPrompt.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow overflow-hidden">
              <Tabs defaultValue="chat" className="h-full flex flex-col">
                <TabsList className="mb-4">
                  <TabsTrigger value="chat">Chat Mode</TabsTrigger>
                  <TabsTrigger value="voice">Voice Mode</TabsTrigger>
                </TabsList>

                <TabsContent value="chat" className="flex-grow flex flex-col">
                  <div className="flex-grow overflow-y-auto mb-4 space-y-4 max-h-[400px]">
                    {conversation.map((message, index) => (
                      <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                        <div className="flex items-start gap-2 max-w-[80%]">
                          {message.role !== "user" && (
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>
                                <Bot size={16} />
                              </AvatarFallback>
                            </Avatar>
                          )}
                          <div
                            className={`p-3 rounded-lg ${
                              message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                            }`}
                          >
                            {message.content}
                          </div>
                          {message.role === "user" && (
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>
                                <User size={16} />
                              </AvatarFallback>
                            </Avatar>
                          )}
                        </div>
                      </div>
                    ))}
                    {isAIThinking && (
                      <div className="flex justify-start">
                        <div className="flex items-start gap-2 max-w-[80%]">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>
                              <Bot size={16} />
                            </AvatarFallback>
                          </Avatar>
                          <div className="p-3 rounded-lg bg-muted">
                            <div className="flex space-x-1">
                              <div className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce"></div>
                              <div
                                className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce"
                                style={{ animationDelay: "0.2s" }}
                              ></div>
                              <div
                                className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce"
                                style={{ animationDelay: "0.4s" }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>

                  <div className="flex gap-2">
                    <Textarea
                      placeholder="Type your response here..."
                      value={userInput}
                      onChange={(e) => setUserInput(e.target.value)}
                      className="resize-none"
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault()
                          handleSendMessage()
                        }
                      }}
                    />
                    <Button onClick={handleSendMessage} size="icon">
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="voice" className="flex-grow flex flex-col">
                  <div className="flex-grow flex flex-col items-center justify-center gap-6">
                    <div className="text-center">
                      <h3 className="text-xl font-semibold mb-2">Current Question:</h3>
                      <p className="text-lg mb-6">{selectedPrompt.questions[currentQuestionIndex]}</p>

                      <div className="w-full max-w-md mx-auto mb-4">
                        <div className="flex justify-between text-sm mb-1">
                          <span>{formatTime(recordingTime)}</span>
                          <span>{selectedPrompt.duration}</span>
                        </div>
                        <Progress value={getProgressPercentage()} className="h-2" />
                      </div>
                    </div>

                    <div className="flex gap-4">
                      {!isRecording ? (
                        <Button onClick={startRecording} size="lg" className="rounded-full h-16 w-16 p-0">
                          <Mic className="h-6 w-6" />
                        </Button>
                      ) : (
                        <>
                          <Button
                            onClick={stopRecording}
                            size="lg"
                            variant="destructive"
                            className="rounded-full h-16 w-16 p-0"
                          >
                            <Square className="h-6 w-6" />
                          </Button>
                        </>
                      )}
                    </div>

                    {isRecording && (
                      <div className="text-center animate-pulse">
                        <MicOff className="h-6 w-6 mx-auto mb-2" />
                        <p>Recording in progress...</p>
                      </div>
                    )}

                    <div className="text-center text-muted-foreground text-sm">
                      <p>Click the microphone button to start recording your answer.</p>
                      <p>The recording will automatically stop after {selectedPrompt.duration}.</p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

