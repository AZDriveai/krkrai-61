"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Brain, Search, BarChart3, Code, ImageIcon, Menu, X, ArrowRight, Play, Zap, Crown } from "lucide-react"
import Link from "next/link"
import CosmicParticles from "@/components/cosmic-particles"
import OptimizedImage from "@/components/optimized-image"

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const heroImages = [
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3rbai-avatar.webp-S8a1ihjX8u4beyVIQS6gmaoOjdbtSm.jpeg",
      alt: "3rbai Avatar - The Digital Consciousness",
      title: "الوعي الرقمي",
      subtitle: "حيث تلتقي الروح بالتكنولوجيا",
    },
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_20250603_014535_443.webp-aAGni9u74u1sFo34X88FB3t8GYjjZy.jpeg",
      alt: "Abstract Portrait - The Fragmented Mind",
      title: "العقل المجزأ",
      subtitle: "في أعماق الفكر والإبداع",
    },
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/wolf.jpg-JMdsAZyORmn0LpVLPPf8TfwGKtBzwW.jpeg",
      alt: "Wolf in Shadows - The Guardian",
      title: "الحارس الصامت",
      subtitle: "في ظلال الحكمة القديمة",
    },
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/wolfai.jpg-36jQ9KbKQk9z2VYE3AWqK2nL8wHVd3.jpeg",
      alt: "Dark Landscape - The Journey",
      title: "رحلة في الظلام",
      subtitle: "نحو نور المعرفة",
    },
  ]

  useEffect(() => {
    setIsVisible(true)

    // تبديل الصور تلقائياً
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => {
        const nextIndex = (prev + 1) % heroImages.length

        // preload الصورة التالية
        if (typeof window !== "undefined") {
          const nextImage = heroImages[(nextIndex + 1) % heroImages.length]
          const img = new Image()
          img.src = nextImage.src
        }

        return nextIndex
      })
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const capabilities = [
    {
      icon: Search,
      title: "البحث الذكي المتقدم",
      description: "تقنيات بحث متطورة تستخدم الذكاء الاصطناعي لفهم السياق والمعنى",
      color: "from-yellow-400 to-orange-500",
    },
    {
      icon: BarChart3,
      title: "تحليل البيانات العميق",
      description: "قدرات تحليلية متقدمة تحول البيانات الخام إلى رؤى قابلة للتنفيذ",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Code,
      title: "البرمجة الذكية المتطورة",
      description: "مساعد برمجي متقدم يفهم السياق ويولد أكواداً عالية الجودة",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: ImageIcon,
      title: "الإبداع المرئي الثوري",
      description: "قدرات إبداعية متقدمة في توليد وتحليل الصور والتصاميم",
      color: "from-green-500 to-emerald-500",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0A0A] via-[#1A1A2E] to-[#16213E] text-white overflow-hidden relative">
      {/* الجسيمات الكونية */}
      <CosmicParticles />

      {/* شريط التنقل */}
      <nav className="fixed top-0 w-full z-50 glass-effect border-b border-white/20 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-[#FFD700] to-[#FFA500] rounded-full flex items-center justify-center shadow-lg shadow-yellow-500/25 animate-pulse">
                <Brain className="w-7 h-7 text-black" />
              </div>
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-[#FFD700] to-[#FFA500] bg-clip-text text-transparent">
                  krkrai
                </span>
                <div className="text-xs text-gray-400">WOLF-AI CROWN</div>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-8">
              <Link
                href="/"
                className="text-white hover:text-[#FFD700] transition-all duration-300 font-medium relative group"
              >
                الرئيسية
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FFD700] transition-all group-hover:w-full"></span>
              </Link>
              <Link
                href="/dashboard"
                className="text-gray-300 hover:text-[#FFD700] transition-all duration-300 font-medium relative group"
              >
                لوحة التحكم
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FFD700] transition-all group-hover:w-full"></span>
              </Link>
              <Link
                href="/docs"
                className="text-gray-300 hover:text-[#FFD700] transition-all duration-300 font-medium relative group"
              >
                الوثائق
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FFD700] transition-all group-hover:w-full"></span>
              </Link>
              <Link
                href="/features"
                className="text-gray-300 hover:text-[#FFD700] transition-all duration-300 font-medium relative group"
              >
                الميزات
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FFD700] transition-all group-hover:w-full"></span>
              </Link>
              <Link
                href="/training"
                className="text-gray-300 hover:text-[#FFD700] transition-all duration-300 font-medium relative group"
              >
                التدريب
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FFD700] transition-all group-hover:w-full"></span>
              </Link>
              <Link
                href="/chat"
                className="text-gray-300 hover:text-[#FFD700] transition-all duration-300 font-medium relative group"
              >
                المحادثة
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FFD700] transition-all group-hover:w-full"></span>
              </Link>
            </div>

            <div className="hidden md:flex items-center gap-4">
              <Button
                variant="outline"
                className="border-[#FFD700] text-[#FFD700] hover:bg-[#FFD700]/10 transition-all duration-300"
              >
                تسجيل الدخول
              </Button>
              <Button className="bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black hover:shadow-lg hover:shadow-yellow-500/25 transition-all duration-300 hover:scale-105">
                <Crown className="w-4 h-4 mr-2" />
                ابدأ الآن
              </Button>
            </div>

            <button
              className="md:hidden text-white hover:text-[#FFD700] transition-all duration-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* القائمة المحمولة */}
        {isMenuOpen && (
          <div className="md:hidden glass-effect border-t border-white/20 backdrop-blur-md">
            <div className="px-4 py-6 space-y-4">
              <Link href="/" className="block py-2 text-white hover:text-[#FFD700] transition-all duration-300">
                الرئيسية
              </Link>
              <Link
                href="/dashboard"
                className="block py-2 text-gray-300 hover:text-[#FFD700] transition-all duration-300"
              >
                لوحة التحكم
              </Link>
              <Link href="/docs" className="block py-2 text-gray-300 hover:text-[#FFD700] transition-all duration-300">
                الوثائق
              </Link>
              <Link
                href="/features"
                className="block py-2 text-gray-300 hover:text-[#FFD700] transition-all duration-300"
              >
                الميزات
              </Link>
              <Link
                href="/training"
                className="block py-2 text-gray-300 hover:text-[#FFD700] transition-all duration-300"
              >
                التدريب
              </Link>
              <Link href="/chat" className="block py-2 text-gray-300 hover:text-[#FFD700] transition-all duration-300">
                المحادثة
              </Link>
              <div className="pt-4 space-y-2">
                <Button variant="outline" className="w-full border-[#FFD700] text-[#FFD700]">
                  تسجيل الدخول
                </Button>
                <Button className="w-full bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black">ابدأ الآن</Button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* القسم الرئيسي */}
      <section className="min-h-screen flex items-center justify-center relative pt-20">
        {/* الصورة الخلفية المتغيرة */}
        <div className="absolute inset-0 z-10">
          <div className="relative w-full h-full">
            {heroImages.map((image, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 ${
                  index === currentImageIndex ? "opacity-30" : "opacity-0"
                }`}
              >
                <OptimizedImage
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover object-center"
                  priority={index === 0}
                  quality={75}
                  sizes="100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              </div>
            ))}
          </div>
        </div>

        <div
          className={`max-w-6xl mx-auto text-center px-4 z-20 relative transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="mb-8">
            <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-[#FFD700] via-[#FFA500] to-[#FFD700] bg-clip-text text-transparent animate-pulse">
                WOLF-AI
              </span>
              <br />
              <span className="text-white text-4xl md:text-5xl">{heroImages[currentImageIndex].title}</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-4">{heroImages[currentImageIndex].subtitle}</p>
          </div>

          <p className="text-lg md:text-xl text-gray-400 mb-12 max-w-4xl mx-auto leading-relaxed">
            منصة الذكاء الاصطناعي المتقدمة التي تجمع بين قوة الذئب وحكمة التكنولوجيا. اكتشف عالماً جديداً من الإمكانيات
            اللامحدودة حيث يلتقي الإبداع بالذكاء الاصطناعي.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Link href="/chat">
              <Button className="bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black hover:shadow-lg hover:shadow-yellow-500/25 px-10 py-4 text-lg font-semibold transition-all duration-300 hover:scale-105 rounded-xl">
                <Play className="w-5 h-5 ml-2" />
                ابدأ المحادثة
              </Button>
            </Link>
            <Link href="/training">
              <Button
                variant="outline"
                className="border-2 border-[#FFD700] text-[#FFD700] hover:bg-[#FFD700]/10 px-10 py-4 text-lg font-semibold transition-all duration-300 hover:scale-105 rounded-xl"
              >
                <Zap className="w-5 h-5 ml-2" />
                مركز التدريب
              </Button>
            </Link>
          </div>

          {/* مؤشرات الصور */}
          <div className="flex justify-center gap-2 mb-8">
            {heroImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentImageIndex
                    ? "bg-[#FFD700] shadow-lg shadow-yellow-500/50"
                    : "bg-white/30 hover:bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* قسم القدرات */}
      <section className="py-32 px-4 relative z-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#FFD700] to-[#FFA500] bg-clip-text text-transparent">
              قدرات WOLF-AI
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#FFD700] to-[#FFA500] mx-auto rounded-full mb-8"></div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              اكتشف مجموعة شاملة من الأدوات الذكية المصممة لتحويل طريقة عملك وتفكيرك
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {capabilities.map((capability, index) => (
              <Card
                key={index}
                className="bg-black/40 border border-white/10 backdrop-blur-md hover:border-[#FFD700]/50 transition-all duration-500 hover:scale-105 group cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-8 text-center">
                  <div
                    className={`w-20 h-20 bg-gradient-to-r ${capability.color} rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all duration-300 shadow-lg`}
                  >
                    <capability.icon className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-white group-hover:text-[#FFD700] transition-all duration-300">
                    {capability.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed text-sm group-hover:text-gray-300 transition-all duration-300">
                    {capability.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* قسم الدعوة للعمل */}
      <section className="py-32 px-4 bg-gradient-to-r from-[#FFD700]/10 to-[#FFA500]/10 relative z-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white">جاهز لتجربة قوة الذئب؟</h2>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            انضم إلى آلاف المطورين والشركات الذين يستخدمون WOLF-AI لتحويل أفكارهم إلى واقع
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/chat">
              <Button className="bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black hover:shadow-lg hover:shadow-yellow-500/25 px-12 py-4 text-lg font-bold transition-all duration-300 hover:scale-105 rounded-xl">
                ابدأ رحلتك الآن
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link href="/docs">
              <Button
                variant="outline"
                className="border-2 border-[#FFD700] text-[#FFD700] hover:bg-[#FFD700]/10 px-12 py-4 text-lg font-bold transition-all duration-300 hover:scale-105 rounded-xl"
              >
                استكشف الوثائق
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* التذييل */}
      <footer className="bg-black/60 border-t border-white/10 py-16 px-4 relative z-20 backdrop-blur-md">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-[#FFD700] to-[#FFA500] rounded-full flex items-center justify-center">
                  <Brain className="w-6 h-6 text-black" />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-[#FFD700] to-[#FFA500] bg-clip-text text-transparent">
                  krkrai
                </span>
              </div>
              <p className="text-gray-400 leading-relaxed max-w-md">
                منصة الذكاء الاصطناعي المتقدمة التي توفر حلولاً مبتكرة للشركات والمطورين والأفراد في جميع أنحاء العالم.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-white mb-4">روابط سريعة</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-gray-400 hover:text-[#FFD700] transition-all duration-300">
                    الرئيسية
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard" className="text-gray-400 hover:text-[#FFD700] transition-all duration-300">
                    لوحة التحكم
                  </Link>
                </li>
                <li>
                  <Link href="/docs" className="text-gray-400 hover:text-[#FFD700] transition-all duration-300">
                    الوثائق
                  </Link>
                </li>
                <li>
                  <Link href="/features" className="text-gray-400 hover:text-[#FFD700] transition-all duration-300">
                    الميزات
                  </Link>
                </li>
                <li>
                  <Link href="/training" className="text-gray-400 hover:text-[#FFD700] transition-all duration-300">
                    التدريب
                  </Link>
                </li>
                <li>
                  <Link href="/chat" className="text-gray-400 hover:text-[#FFD700] transition-all duration-300">
                    المحادثة
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-white mb-4">تواصل معنا</h4>
              <ul className="space-y-2 text-gray-400">
                <li>📧 openaziz00@gmail.com</li>
                <li>🌐 krkrai.com</li>
                <li>📱 +966 123 456 789</li>
                <li>📍 الرياض، المملكة العربية السعودية</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 text-center text-gray-400">
            <p>© 2024 krkrai WOLF-AI. جميع الحقوق محفوظة.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
