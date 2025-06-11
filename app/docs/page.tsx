"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Brain, Search, Copy, Check, ChevronRight, Book, Code, Zap, Shield, Globe, MessageSquare } from "lucide-react"
import Link from "next/link"

export default function DocsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [copiedCode, setCopiedCode] = useState<string | null>(null)
  const [activeSection, setActiveSection] = useState("quickstart")

  const sidebarSections = [
    { id: "quickstart", title: "دليل البدء السريع", icon: Zap },
    { id: "authentication", title: "المصادقة", icon: Shield },
    { id: "endpoints", title: "نقاط النهاية", icon: Globe },
    { id: "chat", title: "واجهة المحادثة", icon: MessageSquare },
    { id: "examples", title: "أمثلة عملية", icon: Code },
    { id: "errors", title: "معالجة الأخطاء", icon: Book },
  ]

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(id)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  const CodeBlock = ({ code, language, id }: { code: string; language: string; id: string }) => (
    <div className="relative bg-[#0D1117] border border-[#333333] rounded-lg overflow-hidden">
      <div className="flex justify-between items-center px-4 py-2 bg-[#161B22] border-b border-[#333333]">
        <span className="text-sm text-[#B0B0B0]">{language}</span>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => copyToClipboard(code, id)}
          className="text-[#B0B0B0] hover:text-[#00F5A0] p-1"
        >
          {copiedCode === id ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
        </Button>
      </div>
      <pre className="p-4 overflow-x-auto text-sm">
        <code className="text-[#EAEAEA]">{code}</code>
      </pre>
    </div>
  )

  const renderContent = () => {
    switch (activeSection) {
      case "quickstart":
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-[#00F5A0] mb-4">دليل البدء السريع</h2>
              <p className="text-[#B0B0B0] text-lg mb-6">
                ابدأ رحلتك مع krkrai في دقائق معدودة. هذا الدليل سيوضح لك كيفية إعداد حسابك وإجراء أول استدعاء لواجهة
                برمجة التطبيقات.
              </p>
            </div>

            <Card className="bg-[#1E1E1E] border-[#333333]">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-[#00F5A0] mb-4">الخطوة 1: الحصول على مفتاح API</h3>
                <p className="text-[#B0B0B0] mb-4">أولاً، تحتاج إلى إنشاء مفتاح API من لوحة التحكم الخاصة بك.</p>
                <Link href="/dashboard">
                  <Button className="bg-[#00F5A0] text-[#121212] hover:bg-[#00F5A0]/90">إنشاء مفتاح API</Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="bg-[#1E1E1E] border-[#333333]">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-[#00F5A0] mb-4">الخطوة 2: أول استدعاء</h3>
                <p className="text-[#B0B0B0] mb-4">استخدم مفتاح API الخاص بك لإجراء أول استدعاء:</p>
                <CodeBlock
                  id="first-call"
                  language="curl"
                  code={`curl -X POST "https://api.krkrai.com/v1/chat/completions" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "krkrai-gpt-4",
    "messages": [
      {
        "role": "user",
        "content": "مرحباً، كيف يمكنك مساعدتي؟"
      }
    ],
    "max_tokens": 150,
    "temperature": 0.7
  }'`}
                />
              </CardContent>
            </Card>

            <Card className="bg-[#1E1E1E] border-[#333333]">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-[#00F5A0] mb-4">الخطوة 3: معالجة الاستجابة</h3>
                <p className="text-[#B0B0B0] mb-4">ستحصل على استجابة بتنسيق JSON:</p>
                <CodeBlock
                  id="response-example"
                  language="json"
                  code={`{
  "id": "chatcmpl-123",
  "object": "chat.completion",
  "created": 1677652288,
  "model": "krkrai-gpt-4",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "مرحباً! أنا krkrai، مساعدك الذكي. يمكنني مساعدتك في البحث، التحليل، البرمجة، وتوليد المحتوى المرئي. كيف يمكنني خدمتك اليوم؟"
      },
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 12,
    "completion_tokens": 45,
    "total_tokens": 57
  }
}`}
                />
              </CardContent>
            </Card>
          </div>
        )

      case "authentication":
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-[#00F5A0] mb-4">المصادقة</h2>
              <p className="text-[#B0B0B0] text-lg mb-6">
                تستخدم krkrai مفاتيح API للمصادقة. يجب تضمين مفتاح API في رأس Authorization لجميع الطلبات.
              </p>
            </div>

            <Card className="bg-[#1E1E1E] border-[#333333]">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-[#00F5A0] mb-4">تنسيق المصادقة</h3>
                <p className="text-[#B0B0B0] mb-4">أضف مفتاح API في رأس Authorization:</p>
                <CodeBlock
                  id="auth-header"
                  language="http"
                  code={`Authorization: Bearer krkrai_sk_your_api_key_here`}
                />
              </CardContent>
            </Card>

            <Card className="bg-[#1E1E1E] border-[#333333]">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-[#00F5A0] mb-4">أمان المفاتيح</h3>
                <div className="space-y-4 text-[#B0B0B0]">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[#00F5A0] rounded-full mt-2 flex-shrink-0"></div>
                    <p>احتفظ بمفاتيح API في مكان آمن ولا تشاركها مع أحد</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[#00F5A0] rounded-full mt-2 flex-shrink-0"></div>
                    <p>استخدم متغيرات البيئة لتخزين المفاتيح في تطبيقاتك</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[#00F5A0] rounded-full mt-2 flex-shrink-0"></div>
                    <p>قم بتدوير المفاتيح بانتظام لضمان الأمان</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[#00F5A0] rounded-full mt-2 flex-shrink-0"></div>
                    <p>راقب استخدام المفاتيح من لوحة التحكم</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      case "endpoints":
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-[#00F5A0] mb-4">نقاط النهاية</h2>
              <p className="text-[#B0B0B0] text-lg mb-6">
                استكشف جميع نقاط النهاية المتاحة في واجهة برمجة التطبيقات krkrai.
              </p>
            </div>

            <Card className="bg-[#1E1E1E] border-[#333333]">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-[#00F5A0] mb-4">المحادثة</h3>
                <p className="text-[#B0B0B0] mb-4">
                  <code className="bg-[#121212] px-2 py-1 rounded text-[#00F5A0]">POST /v1/chat/completions</code>
                </p>
                <p className="text-[#B0B0B0] mb-4">إنشاء محادثة مع النموذج الذكي.</p>

                <h4 className="text-lg font-semibold text-[#EAEAEA] mb-3">المعاملات:</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex gap-4">
                    <code className="text-[#00F5A0] min-w-[100px]">model</code>
                    <span className="text-[#B0B0B0]">اسم النموذج المطلوب استخدامه</span>
                  </div>
                  <div className="flex gap-4">
                    <code className="text-[#00F5A0] min-w-[100px]">messages</code>
                    <span className="text-[#B0B0B0]">مصفوفة من رسائل المحادثة</span>
                  </div>
                  <div className="flex gap-4">
                    <code className="text-[#00F5A0] min-w-[100px]">max_tokens</code>
                    <span className="text-[#B0B0B0]">الحد الأقصى لعدد الرموز في الاستجابة</span>
                  </div>
                  <div className="flex gap-4">
                    <code className="text-[#00F5A0] min-w-[100px]">temperature</code>
                    <span className="text-[#B0B0B0]">مستوى الإبداع (0.0 - 2.0)</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#1E1E1E] border-[#333333]">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-[#00F5A0] mb-4">تحليل الصور</h3>
                <p className="text-[#B0B0B0] mb-4">
                  <code className="bg-[#121212] px-2 py-1 rounded text-[#00F5A0]">POST /v1/vision/analyze</code>
                </p>
                <p className="text-[#B0B0B0] mb-4">تحليل وفهم محتوى الصور.</p>

                <CodeBlock
                  id="vision-example"
                  language="curl"
                  code={`curl -X POST "https://api.krkrai.com/v1/vision/analyze" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "image": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQ...",
    "prompt": "صف محتوى هذه الصورة بالتفصيل",
    "max_tokens": 300
  }'`}
                />
              </CardContent>
            </Card>

            <Card className="bg-[#1E1E1E] border-[#333333]">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-[#00F5A0] mb-4">توليد الأكواد</h3>
                <p className="text-[#B0B0B0] mb-4">
                  <code className="bg-[#121212] px-2 py-1 rounded text-[#00F5A0]">POST /v1/code/generate</code>
                </p>
                <p className="text-[#B0B0B0] mb-4">توليد وتحليل الأكواد البرمجية.</p>

                <CodeBlock
                  id="code-example"
                  language="curl"
                  code={`curl -X POST "https://api.krkrai.com/v1/code/generate" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "prompt": "اكتب دالة Python لحساب الأرقام الأولية",
    "language": "python",
    "max_tokens": 500
  }'`}
                />
              </CardContent>
            </Card>
          </div>
        )

      case "chat":
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-[#00F5A0] mb-4">واجهة المحادثة</h2>
              <p className="text-[#B0B0B0] text-lg mb-6">تعلم كيفية بناء واجهة محادثة تفاعلية باستخدام krkrai API.</p>
            </div>

            <Card className="bg-[#1E1E1E] border-[#333333]">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-[#00F5A0] mb-4">مثال JavaScript</h3>
                <p className="text-[#B0B0B0] mb-4">إليك مثال كامل لبناء واجهة محادثة بسيطة:</p>
                <CodeBlock
                  id="js-chat-example"
                  language="javascript"
                  code={`class KrkraiChat {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseUrl = 'https://api.krkrai.com/v1';
    this.messages = [];
  }

  async sendMessage(content) {
    // إضافة رسالة المستخدم
    this.messages.push({
      role: 'user',
      content: content
    });

    try {
      const response = await fetch(\`\${this.baseUrl}/chat/completions\`, {
        method: 'POST',
        headers: {
          'Authorization': \`Bearer \${this.apiKey}\`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'krkrai-gpt-4',
          messages: this.messages,
          max_tokens: 500,
          temperature: 0.7
        })
      });

      const data = await response.json();
      
      if (data.choices && data.choices[0]) {
        const assistantMessage = data.choices[0].message;
        this.messages.push(assistantMessage);
        return assistantMessage.content;
      }
    } catch (error) {
      console.error('خطأ في الاتصال:', error);
      throw error;
    }
  }
}

// الاستخدام
const chat = new KrkraiChat('your-api-key');
chat.sendMessage('مرحباً، كيف يمكنك مساعدتي؟')
  .then(response => console.log(response));`}
                />
              </CardContent>
            </Card>

            <Card className="bg-[#1E1E1E] border-[#333333]">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-[#00F5A0] mb-4">مثال React</h3>
                <p className="text-[#B0B0B0] mb-4">مكون React لواجهة محادثة تفاعلية:</p>
                <CodeBlock
                  id="react-chat-example"
                  language="jsx"
                  code={`import React, { useState } from 'react';

function ChatInterface() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage]
        })
      });

      const data = await response.json();
      setMessages(prev => [...prev, data.message]);
    } catch (error) {
      console.error('خطأ:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className={\`message \${msg.role}\`}>
            {msg.content}
          </div>
        ))}
        {loading && <div className="loading">يكتب...</div>}
      </div>
      
      <div className="input-area">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="اكتب رسالتك..."
        />
        <button onClick={sendMessage} disabled={loading}>
          إرسال
        </button>
      </div>
    </div>
  );
}

export default ChatInterface;`}
                />
              </CardContent>
            </Card>
          </div>
        )

      case "examples":
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-[#00F5A0] mb-4">أمثلة عملية</h2>
              <p className="text-[#B0B0B0] text-lg mb-6">أمثلة شاملة لاستخدام krkrai في تطبيقات مختلفة.</p>
            </div>

            <Card className="bg-[#1E1E1E] border-[#333333]">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-[#00F5A0] mb-4">مساعد ذكي للبرمجة</h3>
                <p className="text-[#B0B0B0] mb-4">مثال لبناء مساعد ذكي يساعد في كتابة وتحليل الأكواد:</p>
                <CodeBlock
                  id="coding-assistant"
                  language="python"
                  code={`import requests
import json

class CodingAssistant:
    def __init__(self, api_key):
        self.api_key = api_key
        self.base_url = "https://api.krkrai.com/v1"
        
    def analyze_code(self, code, language="python"):
        """تحليل الكود وإعطاء اقتراحات للتحسين"""
        prompt = f"""
        قم بتحليل الكود التالي المكتوب بلغة {language} وقدم:
        1. تقييم جودة الكود
        2. اقتراحات للتحسين
        3. أي أخطاء محتملة
        
        الكود:
        {code}
        """
        
        return self._make_request(prompt)
    
    def generate_code(self, description, language="python"):
        """توليد كود بناءً على الوصف"""
        prompt = f"""
        اكتب كود {language} لتنفيذ المتطلب التالي:
        
        {description}
        
        تأكد من:
        - كتابة كود نظيف وقابل للقراءة
        - إضافة التعليقات المناسبة
        - اتباع أفضل الممارسات
        """
        
        return self._make_request(prompt)
    
    def debug_code(self, code, error_message, language="python"):
        """مساعدة في تصحيح الأخطاء"""
        prompt = f"""
        يوجد خطأ في الكود التالي المكتوب بلغة {language}:
        
        الكود:
        {code}
        
        رسالة الخطأ:
        {error_message}
        
        قم بتحديد سبب الخطأ واقتراح الحل المناسب.
        """
        
        return self._make_request(prompt)
    
    def _make_request(self, prompt):
        """إرسال طلب إلى API"""
        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json"
        }
        
        data = {
            "model": "krkrai-gpt-4",
            "messages": [
                {"role": "user", "content": prompt}
            ],
            "max_tokens": 1000,
            "temperature": 0.3
        }
        
        response = requests.post(
            f"{self.base_url}/chat/completions",
            headers=headers,
            json=data
        )
        
        if response.status_code == 200:
            return response.json()["choices"][0]["message"]["content"]
        else:
            raise Exception(f"API Error: {response.status_code}")

# مثال على الاستخدام
assistant = CodingAssistant("your-api-key")

# تحليل كود
code_to_analyze = '''
def calculate_average(numbers):
    total = 0
    for num in numbers:
        total += num
    return total / len(numbers)
'''

analysis = assistant.analyze_code(code_to_analyze)
print("تحليل الكود:", analysis)

# توليد كود جديد
new_code = assistant.generate_code(
    "دالة لحساب العدد الأولي التالي لرقم معطى"
)
print("الكود المولد:", new_code)`}
                />
              </CardContent>
            </Card>

            <Card className="bg-[#1E1E1E] border-[#333333]">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-[#00F5A0] mb-4">محلل المحتوى الذكي</h3>
                <p className="text-[#B0B0B0] mb-4">مثال لتطبيق يحلل المحتوى النصي ويستخرج الرؤى:</p>
                <CodeBlock
                  id="content-analyzer"
                  language="javascript"
                  code={`class ContentAnalyzer {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseUrl = 'https://api.krkrai.com/v1';
  }

  async analyzeSentiment(text) {
    const prompt = \`
    قم بتحليل المشاعر في النص التالي وحدد:
    1. المشاعر العامة (إيجابية، سلبية، محايدة)
    2. درجة الثقة (1-10)
    3. المشاعر الفرعية المكتشفة
    4. الكلمات المفتاحية المؤثرة
    
    النص: "\${text}"
    
    قدم الإجابة بتنسيق JSON.
    \`;

    return await this.makeRequest(prompt);
  }

  async extractKeywords(text) {
    const prompt = \`
    استخرج الكلمات المفتاحية والمواضيع الرئيسية من النص التالي:
    
    "\${text}"
    
    قدم:
    1. أهم 10 كلمات مفتاحية
    2. المواضيع الرئيسية
    3. الكيانات المذكورة (أشخاص، أماكن، منظمات)
    
    بتنسيق JSON منظم.
    \`;

    return await this.makeRequest(prompt);
  }

  async summarizeText(text, maxLength = 200) {
    const prompt = \`
    لخص النص التالي في حدود \${maxLength} كلمة:
    
    "\${text}"
    
    اجعل الملخص:
    - شاملاً للنقاط الرئيسية
    - واضحاً ومفهوماً
    - محافظاً على المعنى الأصلي
    \`;

    return await this.makeRequest(prompt);
  }

  async translateText(text, targetLanguage = 'en') {
    const prompt = \`
    ترجم النص التالي إلى اللغة \${targetLanguage} مع الحفاظ على:
    - المعنى الأصلي
    - النبرة والأسلوب
    - السياق الثقافي عند الإمكان
    
    النص: "\${text}"
    \`;

    return await this.makeRequest(prompt);
  }

  async makeRequest(prompt) {
    try {
      const response = await fetch(\`\${this.baseUrl}/chat/completions\`, {
        method: 'POST',
        headers: {
          'Authorization': \`Bearer \${this.apiKey}\`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'krkrai-gpt-4',
          messages: [{ role: 'user', content: prompt }],
          max_tokens: 800,
          temperature: 0.3
        })
      });

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error('خطأ في تحليل المحتوى:', error);
      throw error;
    }
  }
}

// مثال على الاستخدام
const analyzer = new ContentAnalyzer('your-api-key');

// تحليل المشاعر
analyzer.analyzeSentiment('أنا سعيد جداً بهذا المنتج الرائع!')
  .then(result => console.log('تحليل المشاعر:', result));

// استخراج الكلمات المفتاحية
analyzer.extractKeywords('الذكاء الاصطناعي يغير مستقبل التكنولوجيا...')
  .then(result => console.log('الكلمات المفتاحية:', result));`}
                />
              </CardContent>
            </Card>
          </div>
        )

      case "errors":
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-[#00F5A0] mb-4">معالجة الأخطاء</h2>
              <p className="text-[#B0B0B0] text-lg mb-6">
                تعلم كيفية التعامل مع الأخطاء المختلفة في واجهة برمجة التطبيقات.
              </p>
            </div>

            <Card className="bg-[#1E1E1E] border-[#333333]">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-[#00F5A0] mb-4">رموز الأخطاء الشائعة</h3>
                <div className="space-y-4">
                  <div className="border border-[#333333] rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <code className="bg-red-500/10 text-red-400 px-2 py-1 rounded">401</code>
                      <span className="font-semibold text-[#EAEAEA]">Unauthorized</span>
                    </div>
                    <p className="text-[#B0B0B0]">مفتاح API غير صحيح أو منتهي الصلاحية</p>
                  </div>

                  <div className="border border-[#333333] rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <code className="bg-red-500/10 text-red-400 px-2 py-1 rounded">429</code>
                      <span className="font-semibold text-[#EAEAEA]">Rate Limit Exceeded</span>
                    </div>
                    <p className="text-[#B0B0B0]">تم تجاوز الحد المسموح من الطلبات</p>
                  </div>

                  <div className="border border-[#333333] rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <code className="bg-red-500/10 text-red-400 px-2 py-1 rounded">400</code>
                      <span className="font-semibold text-[#EAEAEA]">Bad Request</span>
                    </div>
                    <p className="text-[#B0B0B0]">طلب غير صحيح أو معاملات مفقودة</p>
                  </div>

                  <div className="border border-[#333333] rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <code className="bg-red-500/10 text-red-400 px-2 py-1 rounded">500</code>
                      <span className="font-semibold text-[#EAEAEA]">Internal Server Error</span>
                    </div>
                    <p className="text-[#B0B0B0]">خطأ داخلي في الخادم</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#1E1E1E] border-[#333333]">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-[#00F5A0] mb-4">معالجة الأخطاء في JavaScript</h3>
                <CodeBlock
                  id="error-handling-js"
                  language="javascript"
                  code={`class KrkraiAPIClient {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseUrl = 'https://api.krkrai.com/v1';
  }

  async makeRequest(endpoint, data) {
    try {
      const response = await fetch(\`\${this.baseUrl}\${endpoint}\`, {
        method: 'POST',
        headers: {
          'Authorization': \`Bearer \${this.apiKey}\`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      // التحقق من حالة الاستجابة
      if (!response.ok) {
        await this.handleError(response);
      }

      return await response.json();
    } catch (error) {
      console.error('خطأ في الطلب:', error);
      throw error;
    }
  }

  async handleError(response) {
    const errorData = await response.json().catch(() => ({}));
    
    switch (response.status) {
      case 401:
        throw new Error('مفتاح API غير صحيح. تحقق من صحة المفتاح.');
        
      case 429:
        const retryAfter = response.headers.get('Retry-After') || 60;
        throw new Error(\`تم تجاوز حد الطلبات. حاول مرة أخرى بعد \${retryAfter} ثانية.\`);
        
      case 400:
        const message = errorData.error?.message || 'طلب غير صحيح';
        throw new Error(\`خطأ في الطلب: \${message}\`);
        
      case 500:
        throw new Error('خطأ داخلي في الخادم. حاول مرة أخرى لاحقاً.');
        
      default:
        throw new Error(\`خطأ غير متوقع: \${response.status}\`);
    }
  }

  // مثال على استخدام معالجة الأخطاء
  async sendMessage(message) {
    try {
      const result = await this.makeRequest('/chat/completions', {
        model: 'krkrai-gpt-4',
        messages: [{ role: 'user', content: message }],
        max_tokens: 500
      });
      
      return result.choices[0].message.content;
    } catch (error) {
      // معالجة مخصصة للأخطاء
      if (error.message.includes('حد الطلبات')) {
        // إعادة المحاولة بعد فترة انتظار
        console.log('انتظار قبل إعادة المحاولة...');
        await this.delay(60000); // انتظار دقيقة
        return this.sendMessage(message); // إعادة المحاولة
      }
      
      throw error; // إعادة رمي الخطأ للمعالجة في مستوى أعلى
    }
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// مثال على الاستخدام مع معالجة الأخطاء
const client = new KrkraiAPIClient('your-api-key');

client.sendMessage('مرحباً')
  .then(response => {
    console.log('الاستجابة:', response);
  })
  .catch(error => {
    console.error('فشل في إرسال الرسالة:', error.message);
    // يمكنك هنا إظهار رسالة خطأ للمستخدم
  });`}
                />
              </CardContent>
            </Card>

            <Card className="bg-[#1E1E1E] border-[#333333]">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-[#00F5A0] mb-4">أفضل الممارسات</h3>
                <div className="space-y-4 text-[#B0B0B0]">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[#00F5A0] rounded-full mt-2 flex-shrink-0"></div>
                    <p>استخدم آلية إعادة المحاولة مع فترات انتظار متزايدة</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[#00F5A0] rounded-full mt-2 flex-shrink-0"></div>
                    <p>احفظ سجل مفصل للأخطاء لتسهيل التشخيص</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[#00F5A0] rounded-full mt-2 flex-shrink-0"></div>
                    <p>قدم رسائل خطأ واضحة ومفيدة للمستخدمين</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[#00F5A0] rounded-full mt-2 flex-shrink-0"></div>
                    <p>راقب معدل الطلبات لتجنب تجاوز الحدود</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[#00F5A0] rounded-full mt-2 flex-shrink-0"></div>
                    <p>استخدم مهلة زمنية مناسبة للطلبات</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      default:
        return null
    }
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
              <Link href="/chat" className="text-[#EAEAEA] hover:text-[#00F5A0] transition-colors">
                المحادثة
              </Link>
              <Button variant="outline" className="border-[#00F5A0] text-[#00F5A0] hover:bg-[#00F5A0]/10">
                الملف الشخصي
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-80 bg-[#1E1E1E] border-l border-[#333333] min-h-screen p-6">
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#B0B0B0] w-4 h-4" />
              <Input
                placeholder="البحث في الوثائق..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-[#121212] border-[#333333] text-[#EAEAEA] focus:border-[#00F5A0] pr-10"
              />
            </div>
          </div>

          <nav className="space-y-2">
            {sidebarSections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors text-right ${
                  activeSection === section.id
                    ? "bg-[#00F5A0]/10 text-[#00F5A0] border border-[#00F5A0]/20"
                    : "hover:bg-[#333333]/50 text-[#B0B0B0] hover:text-[#EAEAEA]"
                }`}
              >
                <section.icon className="w-5 h-5 flex-shrink-0" />
                <span className="flex-1">{section.title}</span>
                <ChevronRight className="w-4 h-4 flex-shrink-0" />
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 max-w-4xl">{renderContent()}</main>
      </div>
    </div>
  )
}
