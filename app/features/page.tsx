"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Brain,
  Search,
  BarChart3,
  Code,
  ImageIcon,
  ArrowRight,
  Play,
  Pause,
  Database,
  Gem,
  Shield,
  TrendingUp,
} from "lucide-react"
import Link from "next/link"

export default function FeaturesPage() {
  const [activeDemo, setActiveDemo] = useState<string | null>(null)
  const [isVisible, setIsVisible] = useState<{ [key: string]: boolean }>({})

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({
              ...prev,
              [entry.target.id]: true,
            }))
          }
        })
      },
      { threshold: 0.1 },
    )

    document.querySelectorAll('[id^="feature-"]').forEach((el) => {
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  const features = [
    {
      id: "search",
      icon: Search,
      title: "البحث الذكي المتقدم",
      subtitle: "اكتشف المعلومات بدقة لا متناهية",
      description:
        "تقنيات بحث متطورة تستخدم الذكاء الاصطناعي لفهم السياق والمعنى، مما يوفر نتائج دقيقة ومفصلة في ثوانٍ معدودة.",
      capabilities: [
        "بحث دلالي متقدم يفهم المعنى وليس فقط الكلمات",
        "تحليل السياق والربط بين المفاهيم المختلفة",
        "استخراج المعلومات من مصادر متعددة وموثوقة",
        "تصنيف النتائج حسب الصلة والأهمية",
      ],
      demo: {
        input: "ما هي أحدث التطورات في الذكاء الاصطناعي التوليدي؟",
        output:
          "يشهد مجال الذكاء الاصطناعي التوليدي تطورات مذهلة، منها نماذج اللغة الكبيرة متعددة الوسائط، وتقنيات التوليد المشروط، والنماذج القادرة على فهم وإنتاج المحتوى بأشكال متنوعة...",
      },
    },
    {
      id: "analysis",
      icon: BarChart3,
      title: "تحليل البيانات العميق",
      subtitle: "استخراج الرؤى من أعماق البيانات",
      description:
        "قدرات تحليلية متقدمة تحول البيانات الخام إلى رؤى قابلة للتنفيذ، مع إمكانيات التصور والتنبؤ المستقبلي.",
      capabilities: [
        "تحليل إحصائي شامل للبيانات المعقدة",
        "اكتشاف الأنماط والاتجاهات الخفية",
        "التنبؤ بالاتجاهات المستقبلية",
        "تصور البيانات بطرق تفاعلية ومفهومة",
      ],
      demo: {
        input: "بيانات مبيعات الشركة للأشهر الستة الماضية",
        output:
          "تحليل شامل يظهر نمو 23% في المبيعات، مع تحديد المنتجات الأكثر ربحية والمواسم الذهبية، بالإضافة إلى توقعات الربع القادم...",
      },
    },
    {
      id: "coding",
      icon: Code,
      title: "البرمجة الذكية المتطورة",
      subtitle: "شريكك في عالم البرمجة",
      description: "مساعد برمجي متقدم يفهم السياق ويولد أكواداً عالية الجودة، مع قدرات تحليل وتصحيح الأخطاء.",
      capabilities: [
        "توليد أكواد متقدمة بلغات برمجة متعددة",
        "تحليل وتحسين الأكواد الموجودة",
        "اكتشاف وإصلاح الأخطاء البرمجية",
        "شرح الأكواد المعقدة بطريقة مفهومة",
      ],
      demo: {
        input: "اكتب دالة Python لحساب أرقام فيبوناتشي بطريقة محسنة",
        output: `def fibonacci_optimized(n, memo={}):
    if n in memo:
        return memo[n]
    if n <= 2:
        return 1
    memo[n] = fibonacci_optimized(n-1, memo) + fibonacci_optimized(n-2, memo)
    return memo[n]`,
      },
    },
    {
      id: "vision",
      icon: ImageIcon,
      title: "الإبداع المرئي الثوري",
      subtitle: "تحويل الأفكار إلى واقع مرئي",
      description: "قدرات إبداعية متقدمة في توليد وتحليل الصور، مع فهم عميق للسياق الثقافي والفني.",
      capabilities: [
        "توليد صور فنية عالية الجودة من الوصف النصي",
        "تحليل وفهم محتوى الصور المعقدة",
        "تحرير وتحسين الصور بذكاء اصطناعي",
        "إنشاء تصاميم جرافيكية احترافية",
      ],
      demo: {
        input: "صورة فنية لمدينة مستقبلية بأسلوب الخيال العلمي",
        output:
          "تم إنشاء صورة مذهلة تجمع بين العمارة المستقبلية والتكنولوجيا المتقدمة، مع إضاءة ديناميكية وتفاصيل معمارية مبتكرة...",
      },
    },
    {
      id: "ai-integration",
      icon: Brain,
      title: "Advanced AI Integration",
      description:
        "Seamlessly integrate with leading AI models like Anthropic, Groq, xAI, DeepSeek, and Google Gemini for diverse AI capabilities.",
    },
    {
      id: "data-management",
      icon: Database,
      title: "Robust Data Management",
      description:
        "Utilize Supabase for secure and scalable data storage, enabling efficient management of training data, models, and user information.",
    },
    {
      id: "custom-training",
      icon: Code,
      title: "Custom AI Training (Wolf AI)",
      description:
        "Train and fine-tune your own AI models with the powerful Wolf AI Trainer, designed for high performance and customizability.",
    },
    {
      id: "secure-keys",
      icon: Shield,
      title: "Secure API Key System (KRKR)",
      description:
        "Generate and manage encrypted API keys with tiered permissions, ensuring secure and controlled access to your AI services.",
    },
    {
      id: "analytics",
      icon: TrendingUp,
      title: "Comprehensive Analytics",
      description:
        "Gain deep insights into user behavior and application performance with integrated analytics and monitoring tools.",
    },
    {
      id: "user-interface",
      icon: Gem,
      title: "Intuitive User Interface",
      description:
        "Experience a modern, responsive, and user-friendly dashboard built with Next.js and shadcn/ui for optimal interaction.",
    },
  ]

  const toggleDemo = (featureId: string) => {
    setActiveDemo(activeDemo === featureId ? null : featureId)
  }

  return (
    <div className="min-h-screen bg-[#121212] text-[#EAEAEA] font-['Inter'] rtl">
      {/* Navigation */}
      <nav className="sticky top-0 bg-[#121212]/95 backdrop-blur-md border-b border-[#333333] z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-2">
              <Brain className="w-8 h-8 text-[#00F5A0]" />
              <span className="text-2xl font-bold text-[#00F5A0]">krkrai</span>
            </Link>

            <div className="flex items-center gap-4">
              <Link href="/dashboard" className="text-[#EAEAEA] hover:text-[#00F5A0] transition-colors">
                المفاتيح
              </Link>
              <Link href="/docs" className="text-[#EAEAEA] hover:text-[#00F5A0] transition-colors">
                الوثائق
              </Link>
              <Link href="/chat" className="text-[#EAEAEA] hover:text-[#00F5A0] transition-colors">
                المحادثة
              </Link>
              <Button
                variant="outline"
                className="border-[#00F5A0] text-[#00F5A0] hover:bg-[#00F5A0]/10 bg-transparent"
              >
                تسجيل الدخول
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            قدرات <span className="text-[#00F5A0]">krkrai</span> اللامحدودة
          </h1>
          <p className="text-lg md:text-xl text-[#B0B0B0] mb-8 max-w-3xl mx-auto">
            اكتشف عالماً من الإمكانيات اللامحدودة مع تقنيات الذكاء الاصطناعي المتطورة. كل قدرة مصممة لتحويل طريقة عملك
            وتفكيرك.
          </p>

          <div className="flex justify-center">
            <Link href="/chat">
              <Button className="bg-[#00F5A0] text-[#121212] hover:bg-[#00F5A0]/90 px-8 py-3 text-lg font-semibold transition-all hover:scale-105">
                جرب الآن مجاناً
                <ArrowRight className="w-5 h-5 mr-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Sections */}
      <div className="space-y-32 px-4 pb-20">
        {features.map((feature, index) => (
          <section
            key={feature.id}
            id={`feature-${feature.id}`}
            className={`max-w-7xl mx-auto transition-all duration-1000 ${
              isVisible[`feature-${feature.id}`] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? "lg:grid-flow-col-dense" : ""
              }`}
            >
              {/* Content */}
              <div className={index % 2 === 1 ? "lg:col-start-2" : ""}>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-[#00F5A0]/10 rounded-full flex items-center justify-center">
                    <feature.icon className="w-8 h-8 text-[#00F5A0]" />
                  </div>
                  <div>
                    <h2 className="text-3xl md:text-4xl font-bold text-[#00F5A0] mb-2">{feature.title}</h2>
                    {feature.subtitle && <p className="text-lg text-[#B0B0B0]">{feature.subtitle}</p>}
                  </div>
                </div>

                <p className="text-lg text-[#EAEAEA] mb-8 leading-relaxed">{feature.description}</p>

                {feature.capabilities && (
                  <div className="space-y-4 mb-8">
                    {feature.capabilities.map((capability, capIndex) => (
                      <div key={capIndex} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-[#00F5A0] rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-[#B0B0B0]">{capability}</p>
                      </div>
                    ))}
                  </div>
                )}

                {feature.demo && (
                  <Button
                    onClick={() => toggleDemo(feature.id)}
                    className="bg-[#00F5A0] text-[#121212] hover:bg-[#00F5A0]/90 flex items-center gap-2"
                  >
                    {activeDemo === feature.id ? (
                      <>
                        <Pause className="w-4 h-4" />
                        إخفاء العرض
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4" />
                        شاهد العرض التوضيحي
                      </>
                    )}
                  </Button>
                )}
              </div>

              {/* Demo/Visual */}
              <div className={index % 2 === 1 ? "lg:col-start-1" : ""}>
                <Card className="bg-[#1E1E1E] border-[#333333] overflow-hidden">
                  <CardContent className="p-0">
                    {feature.demo && activeDemo === feature.id ? (
                      <div className="p-6 space-y-4">
                        <div className="bg-[#121212] rounded-lg p-4 border border-[#333333]">
                          <div className="text-sm text-[#00F5A0] mb-2">المدخل:</div>
                          <p className="text-[#EAEAEA]">{feature.demo.input}</p>
                        </div>

                        <div className="bg-[#121212] rounded-lg p-4 border border-[#333333]">
                          <div className="text-sm text-[#00F5A0] mb-2">النتيجة:</div>
                          <div className="text-[#EAEAEA]">
                            {feature.id === "coding" ? (
                              <pre className="text-sm overflow-x-auto">
                                <code>{feature.demo.output}</code>
                              </pre>
                            ) : (
                              <p>{feature.demo.output}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="h-80 flex items-center justify-center bg-gradient-to-br from-[#00F5A0]/5 to-[#00F5A0]/20">
                        <div className="text-center">
                          <feature.icon className="w-16 h-16 text-[#00F5A0] mx-auto mb-4 opacity-50" />
                          <p className="text-[#B0B0B0]">انقر لمشاهدة العرض التوضيحي</p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* Additional Features Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-[#00F5A0]/10 to-[#00F5A0]/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Features</h2>
          <p className="text-lg text-center text-muted-foreground mb-10">
            Discover the powerful capabilities that make Krkrai Platform stand out.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.slice(4).map((feature, index) => (
              <Card key={index} className="flex flex-col items-center text-center p-6">
                <div className="mb-4">
                  <feature.icon className="h-12 w-12 text-primary" />
                </div>
                <CardHeader>
                  <CardTitle className="text-xl font-semibold">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-[#00F5A0]/10 to-[#00F5A0]/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">جاهز لتجربة المستقبل؟</h2>
          <p className="text-lg text-[#B0B0B0] mb-8 max-w-2xl mx-auto">
            انضم إلى آلاف المطورين والشركات الذين يستخدمون krkrai لتحويل أفكارهم إلى واقع.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/chat">
              <Button className="bg-[#00F5A0] text-[#121212] hover:bg-[#00F5A0]/90 px-8 py-3 text-lg font-semibold">
                ابدأ المحادثة الآن
              </Button>
            </Link>
            <Link href="/docs">
              <Button
                variant="outline"
                className="border-[#00F5A0] text-[#00F5A0] hover:bg-[#00F5A0]/10 px-8 py-3 text-lg font-semibold bg-transparent"
              >
                استكشف الوثائق
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
