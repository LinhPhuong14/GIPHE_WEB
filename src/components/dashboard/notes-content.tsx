"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardSidebar from "@/components/dashboard/dashboard-sidebar";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import {
  Plus,
  Search,
  Folder,
  Edit,
  Trash2,
  Save,
  BookOpen,
  Tag,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import {cn} from "@/lib/utils";

// Mock notes data
const mockNotes = [
  {
    id: "1",
    title: "English Grammar Rules",
    content:
      "1. Subject-verb agreement: Singular subjects need singular verbs, while plural subjects need plural verbs.\n2. Use articles (a, an, the) correctly.\n3. Remember the difference between its (possessive) and it's (contraction of it is).",
    category: "Grammar",
    tags: ["English", "Grammar", "Rules"],
    createdAt: "2023-03-15T10:30:00Z",
    updatedAt: "2023-03-15T10:30:00Z",
  },
  {
    id: "2",
    title: "Common English Phrases",
    content:
      "- Break a leg: Good luck\n- Piece of cake: Something very easy\n- Hit the books: Study hard\n- Speak of the devil: When you talk about someone and they appear\n- Under the weather: Feeling sick",
    category: "Vocabulary",
    tags: ["English", "Phrases", "Idioms"],
    createdAt: "2023-03-20T14:45:00Z",
    updatedAt: "2023-03-21T09:15:00Z",
  },
  {
    id: "3",
    title: "IELTS Speaking Tips",
    content:
      "1. Practice speaking English every day\n2. Record yourself and listen to identify areas for improvement\n3. Learn to elaborate on your answers\n4. Use a variety of vocabulary and grammatical structures\n5. Stay calm and confident during the test",
    category: "Speaking",
    tags: ["IELTS", "Speaking", "Tips"],
    createdAt: "2023-04-05T16:20:00Z",
    updatedAt: "2023-04-05T16:20:00Z",
  },
  {
    id: "4",
    title: "Verb Tenses Overview",
    content:
      "Present Simple: I work\nPresent Continuous: I am working\nPresent Perfect: I have worked\nPresent Perfect Continuous: I have been working\n\nPast Simple: I worked\nPast Continuous: I was working\nPast Perfect: I had worked\nPast Perfect Continuous: I had been working\n\nFuture Simple: I will work\nFuture Continuous: I will be working\nFuture Perfect: I will have worked\nFuture Perfect Continuous: I will have been working",
    category: "Grammar",
    tags: ["English", "Grammar", "Tenses"],
    createdAt: "2023-04-10T11:05:00Z",
    updatedAt: "2023-04-12T13:30:00Z",
  },
  {
    id: "5",
    title: "Academic Writing Structure",
    content:
      "Introduction:\n- Hook to grab attention\n- Background information\n- Thesis statement\n\nBody Paragraphs:\n- Topic sentence\n- Supporting details\n- Evidence/examples\n- Analysis\n- Transition to next paragraph\n\nConclusion:\n- Restate thesis\n- Summarize main points\n- Final thought or call to action",
    category: "Writing",
    tags: ["Academic", "Writing", "Structure"],
    createdAt: "2023-04-18T09:40:00Z",
    updatedAt: "2023-04-18T09:40:00Z",
  },
];

// Available categories and tags for filtering and creating notes
const categories = [
  "All",
  "Grammar",
  "Vocabulary",
  "Speaking",
  "Writing",
  "Reading",
  "Listening",
];
const availableTags = [
  "English",
  "Grammar",
  "Vocabulary",
  "Phrases",
  "Idioms",
  "IELTS",
  "TOEFL",
  "Speaking",
  "Writing",
  "Reading",
  "Listening",
  "Tips",
  "Rules",
  "Academic",
  "Structure",
  "Tenses",
];

export function NoteContent() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [notes, setNotes] = useState(mockNotes);
  const [filteredNotes, setFilteredNotes] = useState(mockNotes);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [selectedNote, setSelectedNote] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedNote, setEditedNote] = useState({
    id: "",
    title: "",
    content: "",
    category: "",
    tags: [],
  });
  const [newTagInput, setNewTagInput] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (status !== "loading") {
      setIsLoading(false);
    }
  }, [status, router]);

  // Filter notes based on search query and category
  useEffect(() => {
    let filtered = notes;

    if (searchQuery) {
      filtered = filtered.filter(
        (note) =>
          note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
          note.tags.some((tag) =>
            tag.toLowerCase().includes(searchQuery.toLowerCase())
          )
      );
    }

    if (categoryFilter !== "All") {
      filtered = filtered.filter((note) => note.category === categoryFilter);
    }

    setFilteredNotes(filtered);
  }, [searchQuery, categoryFilter, notes]);

  const handleCreateNewNote = () => {
    const newNote = {
      id: (notes.length + 1).toString(),
      title: "Untitled Note",
      content: "",
      category: "Grammar",
      tags: ["New"],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setNotes([newNote, ...notes]);
    setSelectedNote(newNote);
    setEditedNote(newNote);
    setIsEditing(true);
  };

  const handleSelectNote = (note) => {
    setSelectedNote(note);
    setEditedNote(note);
    setIsEditing(false);
  };

  const handleEditNote = () => {
    setIsEditing(true);
  };

  const handleSaveNote = () => {
    if (!editedNote.title.trim()) {
      toast({
        title: "Error",
        description: "Note title cannot be empty",
        variant: "destructive",
      });
      return;
    }

    const updatedNotes = notes.map((note) =>
      note.id === editedNote.id
        ? {
            ...editedNote,
            updatedAt: new Date().toISOString(),
            tags: editedNote.tags.filter((tag) => tag.trim() !== ""),
          }
        : note
    );

    setNotes(updatedNotes);
    setSelectedNote({
      ...editedNote,
      updatedAt: new Date().toISOString(),
      tags: editedNote.tags.filter((tag) => tag.trim() !== ""),
    });
    setIsEditing(false);

    toast({
      title: "Success",
      description: "Note saved successfully",
    });
  };

  const handleDeleteNote = (noteId) => {
    const updatedNotes = notes.filter((note) => note.id !== noteId);
    setNotes(updatedNotes);

    if (selectedNote && selectedNote.id === noteId) {
      setSelectedNote(null);
      setIsEditing(false);
    }

    toast({
      title: "Success",
      description: "Note deleted successfully",
    });
  };

  const handleAddTag = () => {
    if (newTagInput.trim() && !editedNote.tags.includes(newTagInput.trim())) {
      setEditedNote({
        ...editedNote,
        tags: [...editedNote.tags, newTagInput.trim()],
      });
      setNewTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setEditedNote({
      ...editedNote,
      tags: editedNote.tags.filter((tag) => tag !== tagToRemove),
    });
  };

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (isLoading || status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  const userInfo = {
    name: session?.user?.name || "",
    email: session?.user?.email || "",
    image: session?.user?.image || "",
  };

  return (
    <div className="flex min-h-screen">
      <DashboardSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <div
        className={cn(
          "flex flex-col h-full flex-1 transition-all duration-300",
          isSidebarOpen ? "ml-64" : "ml-25"
        )}
      >
        <div className="flex-1">
          <DashboardHeader user={userInfo} />
          <div className="container py-6 mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold">My Notes</h1>
              <Button onClick={handleCreateNewNote}>
                <Plus className="mr-2 h-4 w-4" />
                New Note
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1 space-y-6">
                <div className="flex flex-col gap-4">
                  <div className="relative">
                    <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Search notes..."
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Select
                    value={categoryFilter}
                    onValueChange={setCategoryFilter}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Filter by category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                  {filteredNotes.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      No notes found. Create a new note to get started.
                    </div>
                  ) : (
                    filteredNotes.map((note) => (
                      <motion.div
                        key={note.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Card
                          className={`cursor-pointer hover:border-primary ${
                            selectedNote?.id === note.id
                              ? "border-primary bg-primary/5"
                              : ""
                          }`}
                          onClick={() => handleSelectNote(note)}
                        >
                          <CardHeader className="p-4 pb-2">
                            <div className="flex justify-between items-start">
                              <CardTitle className="text-lg">
                                {note.title}
                              </CardTitle>
                              <Badge>{note.category}</Badge>
                            </div>
                          </CardHeader>
                          <CardContent className="p-4 pt-0">
                            <div className="text-sm text-muted-foreground line-clamp-2">
                              {note.content}
                            </div>
                            <div className="flex flex-wrap gap-1 mt-2">
                              {note.tags.slice(0, 3).map((tag) => (
                                <Badge
                                  key={tag}
                                  variant="outline"
                                  className="text-xs"
                                >
                                  {tag}
                                </Badge>
                              ))}
                              {note.tags.length > 3 && (
                                <Badge variant="outline" className="text-xs">
                                  +{note.tags.length - 3}
                                </Badge>
                              )}
                            </div>
                          </CardContent>
                          <CardFooter className="p-4 pt-0 text-xs text-muted-foreground">
                            Updated {formatDate(note.updatedAt)}
                          </CardFooter>
                        </Card>
                      </motion.div>
                    ))
                  )}
                </div>
              </div>

              <div className="lg:col-span-2">
                {selectedNote ? (
                  <Card className="h-full flex flex-col">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      {isEditing ? (
                        <Input
                          value={editedNote.title}
                          onChange={(e) =>
                            setEditedNote({
                              ...editedNote,
                              title: e.target.value,
                            })
                          }
                          className="text-xl font-bold"
                          placeholder="Note Title"
                        />
                      ) : (
                        <CardTitle>{selectedNote.title}</CardTitle>
                      )}
                      <div className="flex gap-2">
                        {isEditing ? (
                          <Button onClick={handleSaveNote}>
                            <Save className="mr-2 h-4 w-4" />
                            Save
                          </Button>
                        ) : (
                          <>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={handleEditNote}
                            >
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleDeleteNote(selectedNote.id)}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </Button>
                          </>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="flex-grow overflow-hidden">
                      <Tabs
                        defaultValue="content"
                        className="h-full flex flex-col"
                      >
                        <TabsList className="mb-4">
                          <TabsTrigger value="content">Content</TabsTrigger>
                          <TabsTrigger value="details">Details</TabsTrigger>
                        </TabsList>

                        <TabsContent
                          value="content"
                          className="flex-grow flex flex-col"
                        >
                          {isEditing ? (
                            <Textarea
                              value={editedNote.content}
                              onChange={(e) =>
                                setEditedNote({
                                  ...editedNote,
                                  content: e.target.value,
                                })
                              }
                              className="flex-grow resize-none min-h-[400px]"
                              placeholder="Write your note content here..."
                            />
                          ) : (
                            <div className="flex-grow overflow-y-auto whitespace-pre-line">
                              {selectedNote.content || (
                                <div className="text-muted-foreground italic">
                                  No content. Click Edit to add content.
                                </div>
                              )}
                            </div>
                          )}
                        </TabsContent>

                        <TabsContent
                          value="details"
                          className="flex-grow overflow-y-auto"
                        >
                          <div className="space-y-6">
                            <div className="space-y-2">
                              <div className="font-medium flex items-center gap-2">
                                <Folder className="h-4 w-4" />
                                Category
                              </div>
                              {isEditing ? (
                                <Select
                                  value={editedNote.category}
                                  onValueChange={(value) =>
                                    setEditedNote({
                                      ...editedNote,
                                      category: value,
                                    })
                                  }
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select category" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {categories
                                      .filter((c) => c !== "All")
                                      .map((category) => (
                                        <SelectItem
                                          key={category}
                                          value={category}
                                        >
                                          {category}
                                        </SelectItem>
                                      ))}
                                  </SelectContent>
                                </Select>
                              ) : (
                                <div>{selectedNote.category}</div>
                              )}
                            </div>

                            <div className="space-y-2">
                              <div className="font-medium flex items-center gap-2">
                                <Tag className="h-4 w-4" />
                                Tags
                              </div>
                              {isEditing ? (
                                <div className="space-y-2">
                                  <div className="flex flex-wrap gap-2">
                                    {editedNote.tags.map((tag) => (
                                      <Badge
                                        key={tag}
                                        variant="secondary"
                                        className="flex items-center gap-1"
                                      >
                                        {tag}
                                        <button
                                          onClick={() => handleRemoveTag(tag)}
                                          className="ml-1 h-4 w-4 rounded-full hover:bg-muted-foreground/20 inline-flex items-center justify-center"
                                        >
                                          ×
                                        </button>
                                      </Badge>
                                    ))}
                                  </div>
                                  <div className="flex gap-2">
                                    <Input
                                      value={newTagInput}
                                      onChange={(e) =>
                                        setNewTagInput(e.target.value)
                                      }
                                      placeholder="Add a tag"
                                      onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                          e.preventDefault();
                                          handleAddTag();
                                        }
                                      }}
                                    />
                                    <Button
                                      variant="outline"
                                      onClick={handleAddTag}
                                    >
                                      Add
                                    </Button>
                                  </div>
                                  <div className="text-sm text-muted-foreground mt-2">
                                    Suggested tags:
                                  </div>
                                  <div className="flex flex-wrap gap-2">
                                    {availableTags
                                      .filter(
                                        (tag) => !editedNote.tags.includes(tag)
                                      )
                                      .slice(0, 8)
                                      .map((tag) => (
                                        <Badge
                                          key={tag}
                                          variant="outline"
                                          className="cursor-pointer hover:bg-secondary"
                                          onClick={() => {
                                            setEditedNote({
                                              ...editedNote,
                                              tags: [...editedNote.tags, tag],
                                            });
                                          }}
                                        >
                                          + {tag}
                                        </Badge>
                                      ))}
                                  </div>
                                </div>
                              ) : (
                                <div className="flex flex-wrap gap-2">
                                  {selectedNote.tags.map((tag) => (
                                    <Badge key={tag} variant="secondary">
                                      {tag}
                                    </Badge>
                                  ))}
                                </div>
                              )}
                            </div>

                            <div className="space-y-2">
                              <div className="font-medium flex items-center gap-2">
                                <BookOpen className="h-4 w-4" />
                                History
                              </div>
                              <div className="space-y-1 text-sm">
                                <div>
                                  <span className="text-muted-foreground">
                                    Created:{" "}
                                  </span>
                                  {formatDate(selectedNote.createdAt)}
                                </div>
                                <div>
                                  <span className="text-muted-foreground">
                                    Last updated:{" "}
                                  </span>
                                  {formatDate(selectedNote.updatedAt)}
                                </div>
                              </div>
                            </div>
                          </div>
                        </TabsContent>
                      </Tabs>
                    </CardContent>
                  </Card>
                ) : (
                  <Card className="h-full flex items-center justify-center">
                    <CardContent className="text-center py-12">
                      <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-medium mb-2">
                        No Note Selected
                      </h3>
                      <p className="text-muted-foreground mb-6">
                        Select a note from the list or create a new one to get
                        started.
                      </p>
                      <Button onClick={handleCreateNewNote}>
                        <Plus className="mr-2 h-4 w-4" />
                        Create New Note
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
