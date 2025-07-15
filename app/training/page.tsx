"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Brain, Play, Pause, Square, CheckCircle, AlertCircle, Settings, Database, Key, Zap, Eye } from "lucide-react"
import { WolfAITrainer, WOLF_AI_CONFIG } from "@/lib/wolf-ai-trainer"
import Image from "next/image"

export default function TrainingPage() {
  const [trainer, setTrainer] = useState<WolfAITrainer | null>(null)
  const [trainingStatus, setTrainingStatus] = useState<"idle" | "training" | "completed" | "error">("idle")
  const [progress, setProgress] = useState(0)
  const [currentEpoch, setCurrentEpoch] = useState(0)
  const [logs, setLogs] = useState<string[]>([])
  const [isValidating, setIsValidating] = useState(false)

  const startTraining = async () => {
    try {
      setTrainingStatus("training")
      const newTrainer = new WolfAITrainer()
      setTrainer(newTrainer)

      // Simulate training progress updates
      const interval = setInterval(() => {
        const trainingProgress = newTrainer.getTrainingProgress()
        setProgress(trainingProgress.progress)
        setCurrentEpoch(trainingProgress.currentEpoch)
        setLogs(trainingProgress.logs)

        if (trainingProgress.status === "completed") {
          clearInterval(interval)
          setTrainingStatus("completed")
        }
      }, 1000)

      await newTrainer.startTraining()
    } catch (error) {
      setTrainingStatus("error")
      console.error("Training error:", error)
    }
  }

  const validateModel = async () => {
    if (!trainer) return

    setIsValidating(true)
    try {
      await trainer.validateModel()
    } catch (error) {
      console.error("Validation error:", error)
    } finally {
      setIsValidating(false)
    }
  }

  const resetTraining = () => {
    setTrainer(null)
    setTrainingStatus("idle")
    setProgress(0)
    setCurrentEpoch(0)
    setLogs([])
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0A0A] via-[#1A1A2E] to-[#16213E] text-white">
      {/* Header */}
      <div className="border-b border-white/10 bg-black/20 backdrop-blur-md relative overflow-hidden">
        {/* صورة خلفية للتدريب */}
        <div className="absolute inset-0 opacity-20">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/wolf.jpg-JMdsAZyORmn0LpVLPPf8TfwGKtBzwW.jpeg"
            alt="Wolf Training Background"
            fill
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/60" />
        </div>

        <div className="max-w-7xl mx-auto px-6 py-6 relative z-10">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-r from-[#FFD700] to-[#C0C0C0] rounded-full flex items-center justify-center shadow-lg shadow-yellow-500/25 cosmic-element">
              <Brain className="w-8 h-8 text-black" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-[#FFD700] typewriter">WOLF-AI Training Center</h1>
              <p className="text-[#C0C0C0] text-lg">نظام تدريب الذكاء الاصطناعي المتطور</p>
              <div className="text-sm text-gray-400 mt-1">🐺 حيث تولد الحكمة الرقمية</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Control Panel */}
          <div className="lg:col-span-1 space-y-6">
            {/* Model Information */}
            <Card className="bg-black/40 border-[#FFD700]/30 backdrop-blur-md">
              <CardHeader>
                <CardTitle className="text-[#FFD700] flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Model Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-[#C0C0C0]">Name:</span>
                    <span className="text-white font-mono">{WOLF_AI_CONFIG.MODEL_NAME}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#C0C0C0]">Version:</span>
                    <span className="text-white">{WOLF_AI_CONFIG.TRAINING_VERSION}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#C0C0C0]">Base Model:</span>
                    <span className="text-white text-sm">{WOLF_AI_CONFIG.BASE_MODEL}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <h4 className="text-[#FFD700] mb-2">Training Parameters:</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-[#C0C0C0]">Learning Rate:</span>
                      <span className="text-white">{WOLF_AI_CONFIG.TRAINING_PARAMS.LEARNING_RATE}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#C0C0C0]">Batch Size:</span>
                      <span className="text-white">{WOLF_AI_CONFIG.TRAINING_PARAMS.BATCH_SIZE}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#C0C0C0]">Epochs:</span>
                      <span className="text-white">{WOLF_AI_CONFIG.TRAINING_PARAMS.EPOCHS}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Training Controls */}
            <Card className="bg-black/40 border-[#C0C0C0]/30 backdrop-blur-md">
              <CardHeader>
                <CardTitle className="text-[#C0C0C0] flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  Training Controls
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {trainingStatus === "idle" && (
                  <Button
                    onClick={startTraining}
                    className="w-full bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black hover:from-[#FFA500] hover:to-[#FFD700] font-bold"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Start Training
                  </Button>
                )}

                {trainingStatus === "training" && (
                  <Button disabled className="w-full bg-[#1E3A8A] text-white">
                    <Pause className="w-4 h-4 mr-2" />
                    Training in Progress...
                  </Button>
                )}

                {trainingStatus === "completed" && (
                  <div className="space-y-2">
                    <Button
                      onClick={validateModel}
                      disabled={isValidating}
                      className="w-full bg-gradient-to-r from-[#00F5A0] to-[#00CC80] text-black hover:from-[#00CC80] hover:to-[#00F5A0] font-bold"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      {isValidating ? "Validating..." : "Test Model"}
                    </Button>
                    <Button
                      onClick={resetTraining}
                      variant="outline"
                      className="w-full border-[#C0C0C0] text-[#C0C0C0] hover:bg-[#C0C0C0] hover:text-black"
                    >
                      <Square className="w-4 h-4 mr-2" />
                      Reset
                    </Button>
                  </div>
                )}

                {trainingStatus === "error" && (
                  <Button onClick={resetTraining} variant="destructive" className="w-full">
                    <AlertCircle className="w-4 h-4 mr-2" />
                    Retry
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* System Status */}
            <Card className="bg-black/40 border-[#6B46C1]/30 backdrop-blur-md">
              <CardHeader>
                <CardTitle className="text-[#6B46C1] flex items-center gap-2">
                  <Database className="w-5 h-5" />
                  System Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[#C0C0C0]">Database</span>
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Connected</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#C0C0C0]">KRKR Keys</span>
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#C0C0C0]">Model</span>
                    <Badge
                      className={`${
                        trainingStatus === "completed"
                          ? "bg-green-500/20 text-green-400 border-green-500/30"
                          : trainingStatus === "training"
                            ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                            : "bg-gray-500/20 text-gray-400 border-gray-500/30"
                      }`}
                    >
                      {trainingStatus === "completed"
                        ? "Trained"
                        : trainingStatus === "training"
                          ? "Training"
                          : "Untrained"}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Training Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Progress Bar */}
            <Card className="bg-black/40 border-[#1E3A8A]/30 backdrop-blur-md">
              <CardHeader>
                <CardTitle className="text-[#1E3A8A] flex items-center gap-2">
                  <Brain className="w-5 h-5" />
                  Training Progress
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#C0C0C0]">Overall Progress</span>
                    <span className="text-white font-mono">{progress.toFixed(1)}%</span>
                  </div>
                  <Progress value={progress} className="h-3 bg-black/50" />
                </div>

                {trainingStatus === "training" && (
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-[#FFD700]">{currentEpoch}</div>
                      <div className="text-sm text-[#C0C0C0]">Current Epoch</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-[#00F5A0]">{WOLF_AI_CONFIG.TRAINING_PARAMS.EPOCHS}</div>
                      <div className="text-sm text-[#C0C0C0]">Total Epochs</div>
                    </div>
                  </div>
                )}

                {trainingStatus === "completed" && (
                  <div className="flex items-center justify-center gap-2 pt-4 border-t border-white/10">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span className="text-green-400 font-semibold">Training completed successfully!</span>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Training Logs */}
            <Card className="bg-black/40 border-white/10 backdrop-blur-md">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Key className="w-5 h-5" />
                  Live Training Logs
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-96 w-full">
                  <div className="space-y-2 font-mono text-sm">
                    {logs.length === 0 ? (
                      <div className="text-[#C0C0C0] text-center py-8">
                        No logs yet. Start training to see live logs.
                      </div>
                    ) : (
                      logs.map((log, index) => (
                        <div
                          key={index}
                          className={`p-2 rounded text-xs ${
                            log.includes("✅")
                              ? "bg-green-500/10 text-green-400"
                              : log.includes("❌")
                                ? "bg-red-500/10 text-red-400"
                                : log.includes("🚀")
                                  ? "bg-blue-500/10 text-blue-400"
                                  : log.includes("📈")
                                    ? "bg-yellow-500/10 text-yellow-400"
                                    : "bg-white/5 text-[#C0C0C0]"
                          }`}
                        >
                          {log}
                        </div>
                      ))
                    )}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
