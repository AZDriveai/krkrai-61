import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, Rocket, Users, Shield, ImageIcon, Palette } from "lucide-react"

export default function FeaturesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-4xl font-bold text-center">Our Powerful Features</h1>
      <p className="mb-12 text-lg text-center text-muted-foreground max-w-3xl mx-auto">
        Discover the core capabilities that make Krkrai Dashboard an indispensable tool for your development and
        analytics needs.
      </p>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <Brain className="mb-2 h-8 w-8 text-primary" />
            <CardTitle>Advanced AI Assistant</CardTitle>
          </CardHeader>
          <CardContent>
            Integrate with leading AI models like OpenAI, Anthropic, DeepSeek, Groq, and xAI (Grok) to power intelligent
            conversations and automate tasks.
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Rocket className="mb-2 h-8 w-8 text-primary" />
            <CardTitle>Real-time Performance Monitoring</CardTitle>
          </CardHeader>
          <CardContent>
            Keep a close eye on your application's health with live metrics on load time, CPU usage, memory consumption,
            and network latency.
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Users className="mb-2 h-8 w-8 text-primary" />
            <CardTitle>Comprehensive User Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            Gain deep insights into user behavior, engagement patterns, and demographics to make data-driven decisions.
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Shield className="mb-2 h-8 w-8 text-primary" />
            <CardTitle>Robust Error Handling</CardTitle>
          </CardHeader>
          <CardContent>
            Utilize a global error boundary to gracefully handle unexpected errors and provide a seamless user
            experience.
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <ImageIcon className="mb-2 h-8 w-8 text-primary" />
            <CardTitle>Optimized Image Delivery</CardTitle>
          </CardHeader>
          <CardContent>
            Automatically optimize and serve images in modern formats for faster loading times and improved SEO.
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Palette className="mb-2 h-8 w-8 text-primary" />
            <CardTitle>Customizable Theming</CardTitle>
          </CardHeader>
          <CardContent>
            Easily switch between light and dark modes, and customize the application's appearance to match your brand.
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
