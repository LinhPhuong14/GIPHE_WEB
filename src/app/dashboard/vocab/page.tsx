"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, Plus, Shuffle, ThumbsDown, ThumbsUp } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface Flashcard {
  id: string
  front: string
  back: string
  known: boolean
}

export default function FlashcardsPage() {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([
    { id: "1", front: "Hello", back: "Xin chào", known: false },
    { id: "2", front: "Goodbye", back: "Tạm biệt", known: false },
    { id: "3", front: "Thank you", back: "Cảm ơn", known: false },
    { id: "4", front: "Sorry", back: "Xin lỗi", known: false },
    { id: "5", front: "Yes", back: "Vâng / Có", known: false },
  ])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showBack, setShowBack] = useState(false)
  const [newCardFront, setNewCardFront] = useState("")
  const [newCardBack, setNewCardBack] = useState("")
  const [isAddingCard, setIsAddingCard] = useState(false)

  // Shuffle the flashcards
  const shuffleCards = () => {
    const shuffled = [...flashcards].sort(() => Math.random() - 0.5)
    setFlashcards(shuffled)
    setCurrentIndex(0)
    setShowBack(false)
  }

  // Go to the next card
  const nextCard = () => {
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setShowBack(false)
    }
  }

  // Go to the previous card
  const prevCard = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
      setShowBack(false)
    }
  }

  // Toggle the card to show front or back
  const flipCard = () => {
    setShowBack(!showBack)
  }

  // Mark the current card as known/unknown
  const markCard = (known: boolean) => {
    const updatedCards = [...flashcards]
    updatedCards[currentIndex].known = known
    setFlashcards(updatedCards)
    nextCard()
  }

  // Add a new flashcard
  const addCard = () => {
    if (newCardFront.trim() && newCardBack.trim()) {
      const newCard: Flashcard = {
        id: Date.now().toString(),
        front: newCardFront,
        back: newCardBack,
        known: false,
      }
      setFlashcards([...flashcards, newCard])
      setNewCardFront("")
      setNewCardBack("")
      setIsAddingCard(false)
    }
  }

  return (
    <div className="container mx-auto max-w-4xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Vocabulary Flashcards</h1>
        <p className="text-muted-foreground">Learn and memorize new vocabulary with interactive flashcards</p>
      </div>

      <div className="flex justify-between mb-4">
        <div className="flex space-x-2">
          <Button variant="outline" onClick={shuffleCards}>
            <Shuffle className="mr-2 h-4 w-4" />
            Shuffle
          </Button>
          <Button variant="outline" onClick={prevCard} disabled={currentIndex === 0}>
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous card</span>
          </Button>
          <Button variant="outline" onClick={nextCard} disabled={currentIndex === flashcards.length - 1}>
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next card</span>
          </Button>
        </div>

        <Dialog open={isAddingCard} onOpenChange={setIsAddingCard}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Card
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Flashcard</DialogTitle>
              <DialogDescription>Create a new vocabulary flashcard to add to your collection.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="front">Front (Word/Phrase)</Label>
                <Input
                  id="front"
                  value={newCardFront}
                  onChange={(e) => setNewCardFront(e.target.value)}
                  placeholder="Enter word or phrase"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="back">Back (Translation/Definition)</Label>
                <Textarea
                  id="back"
                  value={newCardBack}
                  onChange={(e) => setNewCardBack(e.target.value)}
                  placeholder="Enter translation or definition"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddingCard(false)}>
                Cancel
              </Button>
              <Button onClick={addCard}>Add Flashcard</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {flashcards.length > 0 ? (
        <div className="flex flex-col items-center">
          <div className="w-full max-w-md mb-6">
            <div className="text-sm text-muted-foreground mb-2">
              Card {currentIndex + 1} of {flashcards.length}
            </div>
            <div className="w-full aspect-[3/2] cursor-pointer" onClick={flipCard}>
              <Card className="w-full h-full flex items-center justify-center transition-all duration-300 transform hover:shadow-lg">
                <CardContent className="p-6 text-center flex items-center justify-center h-full">
                  <div className="text-2xl font-medium">
                    {showBack ? flashcards[currentIndex].back : flashcards[currentIndex].front}
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="text-sm text-center mt-2 text-muted-foreground">Click the card to flip it</div>
          </div>

          <div className="flex space-x-4">
            <Button
              variant="outline"
              size="lg"
              className="border-red-500 hover:bg-red-500/10"
              onClick={() => markCard(false)}
            >
              <ThumbsDown className="mr-2 h-4 w-4 text-red-500" />
              Don&apos;t Know
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-green-500 hover:bg-green-500/10"
              onClick={() => markCard(true)}
            >
              <ThumbsUp className="mr-2 h-4 w-4 text-green-500" />
              Know It
            </Button>
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">No flashcards available. Add some to get started!</p>
          <Button onClick={() => setIsAddingCard(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Your First Card
          </Button>
        </div>
      )}
    </div>
  )
}

