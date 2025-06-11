"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  Brain,
  Plus,
  Copy,
  Trash2,
  Eye,
  EyeOff,
  Settings,
  Key,
  Shield,
  Calendar,
  Search,
  Star,
  Zap,
  Crown,
} from "lucide-react"
import Link from "next/link"

interface APIKey {
  id: string
  name: string
  key: string
  permissions: string[]
  createdAt: string
  lastUsed: string
  status: "active" | "inactive"
  tier: "STELLAR" | "BLACKHOLE" | "SUPERNOVA"
  requests: number
  maxRequests: number
}

export default function Dashboard() {
  const [apiKeys, setApiKeys] = useState<APIKey[]>([
    {
      id: "1",
      name: "مشروع تطبيق الجوال",
      key: "krkrai_sk_1234567890abcdef",
      permissions: ["قراءة", "كتابة", "تحليل صور"],
      createdAt: "2024-03-15",
      lastUsed: "2024-03-20",
      status: "active",
      tier: "STELLAR",
      requests: 45,
      maxRequests: 100,
    },
    {
      id: "2",
      name: "موقع الشركة",
      key: "krkrai_sk_abcdef1234567890",
      permissions: ["قراءة", "تحليل نصوص"],
      createdAt: "2024-03-10",
      lastUsed: "2024-03-18",
      status: "active",
      tier: "BLACKHOLE",
      requests: 2340,
      maxRequests: 5000,
    },
  ])

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [newKeyName, setNewKeyName] = useState("")
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([])
  const [selectedTier, setSelectedTier] = useState<"STELLAR" | "BLACKHOLE" | "SUPERNOVA">("STELLAR")
  const [searchTerm, setSearchTerm] = useState("")
  const [showKeys, setShowKeys] = useState<{ [key: string]: boolean }>({})

  const availablePermissions = [
    { id: "read", label: "قراءة", description: "يسمح بقراءة البيانات والمحتوى" },
    { id: "write", label: "كتابة", description: "يسمح بإنشاء وتعديل المحتوى" },
    { id: "analyze_text", label: "تحليل النصوص", description: "يسمح للنموذج بمعالجة النصوص وتحليلها" },
    { id: "analyze_images", label: "تحليل صور", description: "يسمح بتحليل ومعالجة الصور" },
    { id: "generate_code", label: "توليد أكواد", description: "يسمح بتوليد وتحليل الأكواد البرمجية" },
    { id: "search", label: "بحث متقدم", description: "يسمح باستخدام خدمات البحث المتقدمة" },
  ]

  const tierConfig = {
    STELLAR: {
      name: "نجمي",
      icon: Star,
      color: "bg-gradient-to-r from-yellow-400 to-orange-500",
      textColor: "text-yellow-600",
      borderColor: "border-yellow-500/30",
      maxRequests: 100,
      price: "مجاني",
    },
    BLACKHOLE: {
      name: "ثقب أسود",
      icon: Zap,
      color: "bg-gradient-to-r from-purple-500 to-pink-500",
      textColor: "text-purple-600",
      borderColor: "border-purple-500/30",
      maxRequests: 5000,
      price: "99 ر.س/شهر",
    },
    SUPERNOVA: {
      name: "انفجار عظيم",
      icon: Crown,
      color: "bg-gradient-to-r from-blue-500 to-cyan-500",
      textColor: "text-blue-600",
      borderColor: "border-blue-500/30",
      maxRequests: Number.POSITIVE_INFINITY,
      price: "999 ر.س/شهر",
    },
  }

  const handleCreateKey = () => {
    if (!newKeyName.trim() || selectedPermissions.length === 0) return

    const newKey: APIKey = {
      id: Date.now().toString(),
      name: newKeyName,
      key: `krkrai_sk_${Math.random().toString(36).substring(2, 18)}`,
      permissions: selectedPermissions.map((p) => availablePermissions.find((ap) => ap.id === p)?.label || p),
      createdAt: new Date().toISOString().split("T")[0],
      lastUsed: "لم يُستخدم بعد",
      status: "active",
      tier: selectedTier,
      requests: 0,
      maxRequests:
        tierConfig[selectedTier].maxRequests === Number.POSITIVE_INFINITY
          ? 999999
          : tierConfig[selectedTier].maxRequests,
    }

    setApiKeys([...apiKeys, newKey])
    setNewKeyName("")
    setSelectedPermissions([])
    setIsCreateModalOpen(false)

    alert(`تم إنشاء المفتاح بنجاح!\n\nالمفتاح: ${newKey.key}\n\nتأكد من نسخه وحفظه في مكان آمن. لن يظهر مرة أخرى!`)
  }

  const toggleKeyVisibility = (keyId: string) => {
    setShowKeys((prev) => ({
      ...prev,
      [keyId]: !prev[keyId],
    }))
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    alert("تم نسخ المفتاح إلى الحافظة!")
  }

  const deleteKey = (keyId: string) => {
    if (confirm("هل أنت متأكد من حذف هذا المفتاح؟ لا يمكن التراجع عن هذا الإجراء.")) {
      setApiKeys(apiKeys.filter((key) => key.id !== keyId))
    }
  }

  const filteredKeys = apiKeys.filter(
    (key) =>
      key.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      key.permissions.some((p) => p.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  return (
    <div className="min-h-screen bg-cosmic-light-blue text-cosmic-dark">
      {/* شريط التنقل */}
      <nav className="glass-effect border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-blue rounded-full flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-cosmic-blue">krkrai</span>
            </Link>

            <div className="flex items-center gap-6">
              <Link href="/docs" className="text-cosmic-dark hover:text-cosmic-blue smooth-transition font-medium">
                الوثائق
              </Link>
              <Link href="/chat" className="text-cosmic-dark hover:text-cosmic-blue smooth-transition font-medium">
                المحادثة
              </Link>
              <Button className="bg-gradient-blue text-white hover:shadow-glass smooth-transition">الملف الشخصي</Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* الشريط الجانبي */}
        <aside className="w-80 bg-white/50 backdrop-blur-md border-l border-white/20 min-h-screen p-6">
          <nav className="space-y-3">
            <div className="flex items-center gap-3 p-4 bg-gradient-blue rounded-base text-white shadow-glass">
              <Key className="w-6 h-6" />
              <span className="font-semibold text-lg">مفاتيح API</span>
            </div>
            <div className="flex items-center gap-3 p-4 hover:bg-white/30 rounded-base cursor-pointer smooth-transition">
              <Settings className="w-6 h-6 text-cosmic-medium-gray" />
              <span className="text-cosmic-medium-gray font-medium">الإعدادات</span>
            </div>
            <div className="flex items-center gap-3 p-4 hover:bg-white/30 rounded-base cursor-pointer smooth-transition">
              <Shield className="w-6 h-6 text-cosmic-medium-gray" />
              <span className="text-cosmic-medium-gray font-medium">الأمان</span>
            </div>
          </nav>

          {/* إحصائيات سريعة */}
          <div className="mt-8 space-y-4">
            <h3 className="font-semibold text-cosmic-dark mb-4">إحصائيات سريعة</h3>
            <div className="neumorphism p-4 rounded-base">
              <div className="text-2xl font-bold text-cosmic-blue">
                {apiKeys.reduce((sum, key) => sum + key.requests, 0)}
              </div>
              <div className="text-sm text-cosmic-medium-gray">إجمالي الطلبات</div>
            </div>
            <div className="neumorphism p-4 rounded-base">
              <div className="text-2xl font-bold text-cosmic-success">{apiKeys.length}</div>
              <div className="text-sm text-cosmic-medium-gray">المفاتيح النشطة</div>
            </div>
          </div>
        </aside>

        {/* المحتوى الرئيسي */}
        <main className="flex-1 p-8">
          <div className="max-w-6xl mx-auto">
            {/* الرأس */}
            <div className="flex justify-between items-start mb-8">
              <div>
                <h1 className="text-4xl font-bold mb-3 text-cosmic-blue">مفاتيح API</h1>
                <p className="text-cosmic-medium-gray text-lg">إدارة مفاتيح الوصول لواجهة برمجة التطبيقات الخاصة بك</p>
              </div>

              <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-blue text-white hover:shadow-glass smooth-transition hover-lift flex items-center gap-3 px-6 py-3 text-lg">
                    <Plus className="w-5 h-5" />
                    إنشاء مفتاح جديد
                  </Button>
                </DialogTrigger>
                <DialogContent className="neumorphism border-0 text-cosmic-dark max-w-3xl">
                  <DialogHeader>
                    <DialogTitle className="text-cosmic-blue text-2xl font-bold">إنشاء مفتاح API جديد</DialogTitle>
                  </DialogHeader>

                  <div className="space-y-8">
                    <div>
                      <Label htmlFor="keyName" className="text-cosmic-dark mb-3 block font-semibold">
                        اسم المفتاح
                      </Label>
                      <Input
                        id="keyName"
                        value={newKeyName}
                        onChange={(e) => setNewKeyName(e.target.value)}
                        placeholder="مثال: مشروع تطبيق الجوال"
                        className="bg-white/50 border-white/30 text-cosmic-dark focus:border-cosmic-blue rounded-base"
                      />
                    </div>

                    {/* اختيار المستوى */}
                    <div>
                      <Label className="text-cosmic-dark mb-4 block font-semibold">اختر المستوى</Label>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {Object.entries(tierConfig).map(([tier, config]) => {
                          const IconComponent = config.icon
                          return (
                            <div
                              key={tier}
                              onClick={() => setSelectedTier(tier as any)}
                              className={`p-4 rounded-base border-2 cursor-pointer smooth-transition hover-scale ${
                                selectedTier === tier
                                  ? `${config.borderColor} bg-white/80`
                                  : "border-white/30 bg-white/50 hover:border-white/50"
                              }`}
                            >
                              <div className="flex items-center gap-3 mb-2">
                                <div
                                  className={`w-8 h-8 ${config.color} rounded-full flex items-center justify-center`}
                                >
                                  <IconComponent className="w-4 h-4 text-white" />
                                </div>
                                <span className="font-semibold">{config.name}</span>
                              </div>
                              <div className="text-sm text-cosmic-medium-gray mb-1">
                                {config.maxRequests === Number.POSITIVE_INFINITY
                                  ? "طلبات لا محدودة"
                                  : `${config.maxRequests} طلب/شهر`}
                              </div>
                              <div className={`text-sm font-semibold ${config.textColor}`}>{config.price}</div>
                            </div>
                          )
                        })}
                      </div>
                    </div>

                    <div>
                      <Label className="text-cosmic-dark mb-4 block font-semibold">الصلاحيات</Label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {availablePermissions.map((permission) => (
                          <div
                            key={permission.id}
                            className="flex items-start space-x-3 space-x-reverse p-3 neumorphism rounded-base"
                          >
                            <Checkbox
                              id={permission.id}
                              checked={selectedPermissions.includes(permission.id)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setSelectedPermissions([...selectedPermissions, permission.id])
                                } else {
                                  setSelectedPermissions(selectedPermissions.filter((p) => p !== permission.id))
                                }
                              }}
                              className="border-cosmic-blue data-[state=checked]:bg-cosmic-blue data-[state=checked]:border-cosmic-blue"
                            />
                            <div className="flex-1">
                              <Label htmlFor={permission.id} className="text-cosmic-dark font-semibold cursor-pointer">
                                {permission.label}
                              </Label>
                              <p className="text-sm text-cosmic-medium-gray mt-1">{permission.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-end gap-4">
                      <Button
                        variant="outline"
                        onClick={() => setIsCreateModalOpen(false)}
                        className="border-cosmic-medium-gray text-cosmic-medium-gray hover:bg-cosmic-medium-gray/10"
                      >
                        إلغاء
                      </Button>
                      <Button
                        onClick={handleCreateKey}
                        disabled={!newKeyName.trim() || selectedPermissions.length === 0}
                        className="bg-gradient-blue text-white hover:shadow-glass smooth-transition"
                      >
                        إنشاء المفتاح
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {/* البحث */}
            <div className="mb-8">
              <div className="relative max-w-md">
                <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-cosmic-medium-gray w-5 h-5" />
                <Input
                  placeholder="البحث في المفاتيح..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-white/50 border-white/30 text-cosmic-dark focus:border-cosmic-blue pr-12 rounded-base"
                />
              </div>
            </div>

            {/* جدول المفاتيح */}
            <Card className="neumorphism border-0 shadow-soft">
              <CardHeader>
                <CardTitle className="text-cosmic-blue text-xl">المفاتيح الحالية ({filteredKeys.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-white/20 hover:bg-white/10">
                        <TableHead className="text-cosmic-blue font-semibold">الاسم</TableHead>
                        <TableHead className="text-cosmic-blue font-semibold">المستوى</TableHead>
                        <TableHead className="text-cosmic-blue font-semibold">المفتاح</TableHead>
                        <TableHead className="text-cosmic-blue font-semibold">الاستخدام</TableHead>
                        <TableHead className="text-cosmic-blue font-semibold">الصلاحيات</TableHead>
                        <TableHead className="text-cosmic-blue font-semibold">تاريخ الإنشاء</TableHead>
                        <TableHead className="text-cosmic-blue font-semibold">آخر استخدام</TableHead>
                        <TableHead className="text-cosmic-blue font-semibold">الحالة</TableHead>
                        <TableHead className="text-cosmic-blue font-semibold">الإجراءات</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredKeys.map((apiKey) => {
                        const tierInfo = tierConfig[apiKey.tier]
                        const IconComponent = tierInfo.icon
                        const usagePercentage = (apiKey.requests / apiKey.maxRequests) * 100

                        return (
                          <TableRow key={apiKey.id} className="border-white/20 hover:bg-white/5 smooth-transition">
                            <TableCell className="font-semibold text-cosmic-dark">{apiKey.name}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <div
                                  className={`w-6 h-6 ${tierInfo.color} rounded-full flex items-center justify-center`}
                                >
                                  <IconComponent className="w-3 h-3 text-white" />
                                </div>
                                <span className={`font-medium ${tierInfo.textColor}`}>{tierInfo.name}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <code className="bg-cosmic-light-gray/50 px-3 py-1 rounded-base text-sm text-cosmic-blue font-mono">
                                  {showKeys[apiKey.id] ? apiKey.key : `${"*".repeat(20)}${apiKey.key.slice(-4)}`}
                                </code>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => toggleKeyVisibility(apiKey.id)}
                                  className="text-cosmic-medium-gray hover:text-cosmic-blue p-1"
                                >
                                  {showKeys[apiKey.id] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </Button>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="space-y-1">
                                <div className="flex justify-between text-sm">
                                  <span>{apiKey.requests}</span>
                                  <span>{apiKey.maxRequests === 999999 ? "∞" : apiKey.maxRequests}</span>
                                </div>
                                <div className="w-full bg-cosmic-light-gray/30 rounded-full h-2">
                                  <div
                                    className="bg-gradient-blue h-2 rounded-full transition-all duration-300"
                                    style={{ width: `${Math.min(usagePercentage, 100)}%` }}
                                  ></div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex flex-wrap gap-1">
                                {apiKey.permissions.map((permission, index) => (
                                  <Badge
                                    key={index}
                                    variant="secondary"
                                    className="bg-cosmic-blue/10 text-cosmic-blue border-cosmic-blue/20 text-xs"
                                  >
                                    {permission}
                                  </Badge>
                                ))}
                              </div>
                            </TableCell>
                            <TableCell className="text-cosmic-medium-gray">
                              <div className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                {apiKey.createdAt}
                              </div>
                            </TableCell>
                            <TableCell className="text-cosmic-medium-gray">{apiKey.lastUsed}</TableCell>
                            <TableCell>
                              <Badge
                                variant={apiKey.status === "active" ? "default" : "secondary"}
                                className={
                                  apiKey.status === "active"
                                    ? "bg-cosmic-success/10 text-cosmic-success border-cosmic-success/20"
                                    : "bg-cosmic-medium-gray/10 text-cosmic-medium-gray border-cosmic-medium-gray/20"
                                }
                              >
                                {apiKey.status === "active" ? "نشط" : "غير نشط"}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => copyToClipboard(apiKey.key)}
                                  className="text-cosmic-medium-gray hover:text-cosmic-blue p-1 hover:bg-cosmic-blue/10"
                                >
                                  <Copy className="w-4 h-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => deleteKey(apiKey.id)}
                                  className="text-cosmic-medium-gray hover:text-cosmic-warning p-1 hover:bg-cosmic-warning/10"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        )
                      })}
                    </TableBody>
                  </Table>
                </div>

                {filteredKeys.length === 0 && (
                  <div className="text-center py-12 text-cosmic-medium-gray">
                    <Key className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <h3 className="text-lg font-semibold mb-2">
                      {searchTerm ? "لا توجد مفاتيح تطابق البحث" : "لا توجد مفاتيح API بعد"}
                    </h3>
                    <p className="text-sm">{searchTerm ? "جرب مصطلح بحث مختلف" : "أنشئ مفتاحك الأول للبدء"}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
