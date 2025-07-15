"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { initializeWolfAITraining } from "@/lib/wolf-ai-trainer"

export default function TrainingPage() {
  const [trainingStatus, setTrainingStatus] = useState({
    progress: 0,
    currentEpoch: 0,
    logs: [] as string[],
    status: "idle",
  })
  const [isTraining, setIsTraining] = useState(false)

  const handleStartTraining = async () => {
    setIsTraining(true)
    setTrainingStatus({
      progress: 0,
      currentEpoch: 0,
      logs: ["Starting WOLF-AI training..."],
      status: "training",
    })

    try {
      const trainer = await initializeWolfAITraining()
      // Simulate continuous updates
      const interval = setInterval(() => {
        const status = trainer.getTrainingProgress()
        setTrainingStatus(status)
        if (status.status === "completed") {
          clearInterval(interval)
          setIsTraining(false)
        }
      }, 500) // Update every 0.5 seconds
    } catch (error) {
      console.error("Failed to start training:", error)
      setTrainingStatus((prev) => ({
        ...prev,
        logs: [...prev.logs, `Error: ${error}`],
        status: "error",
      }))
      setIsTraining(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6 text-center">WOLF-AI Training Center</h1>
      <p className="text-lg text-center text-muted-foreground mb-10">
        Manage and monitor the training process of your advanced AI models.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Training Progress</CardTitle>
            <CardDescription>Current status and progress of the WOLF-AI model training.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-medium mb-2">Overall Progress:</p>
              <Progress value={trainingStatus.progress} className="w-full" />
              <p className="text-right text-sm text-muted-foreground mt-1">{trainingStatus.progress.toFixed(1)}%</p>
            </div>
            <div>
              <p className="text-sm font-medium mb-2">Current Epoch:</p>
              <p className="text-lg font-semibold">{trainingStatus.currentEpoch}</p>
            </div>
            <div>
              <p className="text-sm font-medium mb-2">Status:</p>
              <p className="text-lg font-semibold capitalize">{trainingStatus.status}</p>
            </div>
            <Button onClick={handleStartTraining} disabled={isTraining}>
              {isTraining ? "Training in Progress..." : "Start Training"}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Training Logs</CardTitle>
            <CardDescription>Real-time output from the WOLF-AI training process.</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px] w-full rounded-md border p-4 bg-gray-50 dark:bg-gray-900 text-sm font-mono">
              {trainingStatus.logs.length === 0 ? (
                <p className="text-muted-foreground">No logs yet. Start training to see output.</p>
              ) : (
                trainingStatus.logs.map((log, index) => (
                  <p key={index} className="mb-1">
                    {log}
                  </p>
                ))
              )}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
