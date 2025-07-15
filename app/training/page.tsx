"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Loader2, XCircle } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

type TrainingData = {
  id: number
  prompt: string
  completion: string
}

export default function TrainingPage() {
  const [trainingData, setTrainingData] = useState<TrainingData[]>([])
  const [newPrompt, setNewPrompt] = useState("")
  const [newCompletion, setNewCompletion] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    fetchTrainingData()
  }, [])

  const fetchTrainingData = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/training")
      if (!response.ok) {
        throw new Error("Failed to fetch training data")
      }
      const data = await response.json()
      setTrainingData(data)
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to load training data.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const addTrainingData = async () => {
    if (!newPrompt || !newCompletion) {
      toast({
        title: "Missing Fields",
        description: "Please fill in both prompt and completion.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch("/api/training", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: newPrompt, completion: newCompletion }),
      })

      if (!response.ok) {
        throw new Error("Failed to add training data")
      }

      const addedData = await response.json()
      setTrainingData((prev) => [...prev, addedData])
      setNewPrompt("")
      setNewCompletion("")
      toast({
        title: "Success",
        description: "Training data added successfully.",
      })
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to add training data.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const deleteTrainingData = async (id: number) => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/training?id=${id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete training data")
      }

      setTrainingData((prev) => prev.filter((data) => data.id !== id))
      toast({
        title: "Success",
        description: "Training data deleted successfully.",
      })
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to delete training data.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="p-4">
      <h1 className="mb-6 text-3xl font-bold">AI Model Training</h1>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Add New Training Data</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="prompt">Prompt</Label>
            <Textarea
              id="prompt"
              placeholder="Enter prompt here..."
              value={newPrompt}
              onChange={(e) => setNewPrompt(e.target.value)}
              rows={3}
              disabled={isLoading}
            />
          </div>
          <div>
            <Label htmlFor="completion">Completion</Label>
            <Textarea
              id="completion"
              placeholder="Enter expected completion here..."
              value={newCompletion}
              onChange={(e) => setNewCompletion(e.target.value)}
              rows={3}
              disabled={isLoading}
            />
          </div>
          <Button onClick={addTrainingData} disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Add Data
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Existing Training Data</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center p-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <span className="ml-2 text-muted-foreground">Loading training data...</span>
            </div>
          ) : trainingData.length === 0 ? (
            <p className="text-center text-muted-foreground">No training data available. Add some above!</p>
          ) : (
            <div className="space-y-4">
              {trainingData.map((data) => (
                <div key={data.id} className="rounded-md border p-4">
                  <div className="mb-2">
                    <p className="text-sm font-medium">Prompt:</p>
                    <p className="text-muted-foreground">{data.prompt}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Completion:</p>
                    <p className="text-muted-foreground">{data.completion}</p>
                  </div>
                  <div className="mt-3 text-right">
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => deleteTrainingData(data.id)}
                      disabled={isLoading}
                    >
                      <XCircle className="mr-2 h-4 w-4" />
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
