"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Folder, FolderPlus, Plus, Search } from "lucide-react"

interface Note {
  id: string
  title: string
  content: string
  createdAt: Date
  folderId: string | null
  color?: string
}

interface FolderType {
  id: string
  name: string
  color?: string
}

export default function NotesPage() {
  const [activeTab, setActiveTab] = useState<"all" | "folders">("all")
  const [notes, setNotes] = useState<Note[]>([
    {
      id: "1",
      title: "Vocabulary List",
      content: "Apple - Táo\nBanana - Chuối\nOrange - Cam\nGrape - Nho",
      createdAt: new Date("2023-05-15"),
      folderId: "1",
      color: "bg-yellow-100 dark:bg-yellow-900/30",
    },
    {
      id: "2",
      title: "Grammar Rules",
      content:
        "Present Simple: I go, You go, He/She/It goes\nPresent Continuous: I am going, You are going, He/She/It is going",
      createdAt: new Date("2023-05-20"),
      folderId: "1",
    },
    {
      id: "3",
      title: "Meeting Notes",
      content: "Discussed project timeline and deliverables. Next meeting on Friday.",
      createdAt: new Date("2023-06-01"),
      folderId: null,
      color: "bg-blue-100 dark:bg-blue-900/30",
    },
    {
      id: "4",
      title: "Book Recommendations",
      content: "1. The Alchemist\n2. Atomic Habits\n3. Sapiens",
      createdAt: new Date("2023-06-10"),
      folderId: "2",
      color: "bg-green-100 dark:bg-green-900/30",
    },
    {
      id: "5",
      title: "Project Ideas",
      content: "1. Language learning app\n2. Productivity tracker\n3. Recipe organizer",
      createdAt: new Date("2023-06-15"),
      folderId: null,
    },
  ])

  const [folders, setFolders] = useState<FolderType[]>([
    { id: "1", name: "Language Learning", color: "bg-yellow-100 dark:bg-yellow-900/30" },
    { id: "2", name: "Personal Development", color: "bg-green-100 dark:bg-green-900/30" },
    { id: "3", name: "Work", color: "bg-blue-100 dark:bg-blue-900/30" },
    { id: "4", name: "Ideas", color: "bg-purple-100 dark:bg-purple-900/30" },
  ])

  const [isAddingNote, setIsAddingNote] = useState(false)
  const [isAddingFolder, setIsAddingFolder] = useState(false)
  const [newNote, setNewNote] = useState<Omit<Note, "id" | "createdAt">>({
    title: "",
    content: "",
    folderId: null,
  })
  const [newFolder, setNewFolder] = useState<Omit<FolderType, "id">>({
    name: "",
    color: "bg-blue-100 dark:bg-blue-900/30",
  })
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null)

  const filteredNotes = notes.filter((note) => {
    // Filter by search query
    const matchesSearch =
      searchQuery === "" ||
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase())

    // Filter by selected folder
    const matchesFolder = selectedFolder === null || note.folderId === selectedFolder

    return matchesSearch && matchesFolder
  })

  const addNote = () => {
    if (newNote.title.trim()) {
      const note: Note = {
        id: Date.now().toString(),
        ...newNote,
        createdAt: new Date(),
      }
      setNotes([...notes, note])
      setNewNote({
        title: "",
        content: "",
        folderId: null,
      })
      setIsAddingNote(false)
    }
  }

  const addFolder = () => {
    if (newFolder.name.trim()) {
      const folder: FolderType = {
        id: Date.now().toString(),
        ...newFolder,
      }
      setFolders([...folders, folder])
      setNewFolder({
        name: "",
        color: "bg-blue-100 dark:bg-blue-900/30",
      })
      setIsAddingFolder(false)
    }
  }

  const folderColors = [
    "bg-blue-100 dark:bg-blue-900/30",
    "bg-green-100 dark:bg-green-900/30",
    "bg-yellow-100 dark:bg-yellow-900/30",
    "bg-red-100 dark:bg-red-900/30",
    "bg-purple-100 dark:bg-purple-900/30",
    "bg-pink-100 dark:bg-pink-900/30",
    "bg-indigo-100 dark:bg-indigo-900/30",
    "bg-gray-100 dark:bg-gray-900/30",
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <div className="w-full md:w-64 flex-shrink-0">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Categories</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search notes..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="space-y-1">
                <Button
                  variant="ghost"
                  className="w-full justify-start font-normal"
                  onClick={() => setSelectedFolder(null)}
                >
                  All Notes
                </Button>
                {folders.map((folder) => (
                  <Button
                    key={folder.id}
                    variant="ghost"
                    className={`w-full justify-start font-normal ${selectedFolder === folder.id ? "bg-secondary" : ""}`}
                    onClick={() => setSelectedFolder(folder.id)}
                  >
                    <div className={`w-3 h-3 rounded-full mr-2 ${folder.color}`}></div>
                    {folder.name}
                  </Button>
                ))}
                <Button
                  variant="ghost"
                  className="w-full justify-start text-primary font-normal"
                  onClick={() => setIsAddingFolder(true)}
                >
                  <FolderPlus className="mr-2 h-4 w-4" />
                  New Category
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">My Notes</h1>
            <div className="flex gap-2">
              <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "all" | "folders")}>
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="folders">Folders</TabsTrigger>
                </TabsList>
              </Tabs>
              <Button onClick={() => setIsAddingNote(true)}>
                <Plus className="mr-2 h-4 w-4" />
                New Note
              </Button>
            </div>
          </div>

          <TabsContent value="all" className="mt-0">
            <div className="note-grid">
              {filteredNotes.map((note) => (
                <Card key={note.id} className={`note-card ${note.color || "bg-card"} hover:shadow-md`}>
                  <CardContent className="p-4 h-full flex flex-col">
                    <h3 className="font-medium mb-2 line-clamp-1">{note.title}</h3>
                    <p className="text-sm text-muted-foreground flex-1 line-clamp-5 whitespace-pre-line">
                      {note.content}
                    </p>
                    <div className="text-xs text-muted-foreground mt-2">{note.createdAt.toLocaleDateString()}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="folders" className="mt-0">
            <div className="note-grid">
              {folders.map((folder) => (
                <Card
                  key={folder.id}
                  className={`folder-card ${folder.color || "bg-card"} hover:shadow-md cursor-pointer`}
                  onClick={() => setSelectedFolder(folder.id)}
                >
                  <CardContent className="p-4 h-full flex flex-col items-center justify-center text-center">
                    <Folder className="h-12 w-12 mb-2 text-primary" />
                    <h3 className="font-medium">{folder.name}</h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      {notes.filter((note) => note.folderId === folder.id).length} notes
                    </p>
                  </CardContent>
                </Card>
              ))}
              <Card
                className="folder-card border-dashed hover:shadow-md cursor-pointer"
                onClick={() => setIsAddingFolder(true)}
              >
                <CardContent className="p-4 h-full flex flex-col items-center justify-center text-center">
                  <FolderPlus className="h-12 w-12 mb-2 text-primary" />
                  <h3 className="font-medium">Create New Folder</h3>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </div>
      </div>

      {/* Add Note Dialog */}
      <Dialog open={isAddingNote} onOpenChange={setIsAddingNote}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Create New Note</DialogTitle>
            <DialogDescription>Add a new note to your collection.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={newNote.title}
                onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                placeholder="Note title"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                rows={8}
                value={newNote.content}
                onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                placeholder="Write your note here..."
              />
            </div>
            <div className="grid gap-2">
              <Label>Folder</Label>
              <div className="flex flex-wrap gap-2">
                <Button
                  type="button"
                  variant={newNote.folderId === null ? "default" : "outline"}
                  size="sm"
                  onClick={() => setNewNote({ ...newNote, folderId: null })}
                >
                  None
                </Button>
                {folders.map((folder) => (
                  <Button
                    key={folder.id}
                    type="button"
                    variant={newNote.folderId === folder.id ? "default" : "outline"}
                    size="sm"
                    className="flex items-center"
                    onClick={() => setNewNote({ ...newNote, folderId: folder.id })}
                  >
                    <div className={`w-2 h-2 rounded-full mr-2 ${folder.color}`}></div>
                    {folder.name}
                  </Button>
                ))}
              </div>
            </div>
            <div className="grid gap-2">
              <Label>Color</Label>
              <div className="flex flex-wrap gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="w-8 h-8 p-0"
                  onClick={() => setNewNote({ ...newNote, color: undefined })}
                >
                  <div className="w-full h-full bg-card rounded-sm"></div>
                </Button>
                {folderColors.map((color, index) => (
                  <Button
                    key={index}
                    type="button"
                    variant="outline"
                    size="sm"
                    className="w-8 h-8 p-0"
                    onClick={() => setNewNote({ ...newNote, color })}
                  >
                    <div className={`w-full h-full ${color} rounded-sm`}></div>
                  </Button>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddingNote(false)}>
              Cancel
            </Button>
            <Button onClick={addNote}>Create Note</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Folder Dialog */}
      <Dialog open={isAddingFolder} onOpenChange={setIsAddingFolder}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Folder</DialogTitle>
            <DialogDescription>Add a new folder to organize your notes.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Folder Name</Label>
              <Input
                id="name"
                value={newFolder.name}
                onChange={(e) => setNewFolder({ ...newFolder, name: e.target.value })}
                placeholder="Folder name"
              />
            </div>
            <div className="grid gap-2">
              <Label>Color</Label>
              <div className="flex flex-wrap gap-2">
                {folderColors.map((color, index) => (
                  <Button
                    key={index}
                    type="button"
                    variant={newFolder.color === color ? "default" : "outline"}
                    size="sm"
                    className="w-8 h-8 p-0"
                    onClick={() => setNewFolder({ ...newFolder, color })}
                  >
                    <div className={`w-full h-full ${color} rounded-sm`}></div>
                  </Button>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddingFolder(false)}>
              Cancel
            </Button>
            <Button onClick={addFolder}>Create Folder</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

