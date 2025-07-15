"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Settings, User, Newspaper, ChevronDown, Paperclip, Send, Search, ChevronDownIcon } from "lucide-react"
import { AIAssistant } from "@/components/ai-assistant"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

export default function ChatPage() {
  const [inputValue, setInputValue] = useState("")
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "0px" // Reset height to calculate new height
      const scrollHeight = textareaRef.current.scrollHeight
      textareaRef.current.style.height = scrollHeight + "px"
    }
  }, [inputValue])

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    console.log("Sending message:", inputValue)
    setInputValue("")
    // In a real application, you would send this to your AI backend
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div
      className="group/sidebar-wrapper flex min-h-svh w-full has-[[data-variant=inset]]:bg-sidebar"
      style={
        {
          "--sidebar-width": "16rem",
          "--sidebar-width-icon": "3.5rem",
        } as React.CSSProperties
      }
      dir="rtl" // Set direction to RTL for the entire component
    >
      <div className="flex w-full h-full overflow-hidden @container/mainview">
        <div className="flex w-full h-full" data-testid="drop-ui">
          <main className="h-dvh flex-grow flex-shrink relative selection:bg-blue-500 w-0 @container isolate">
            <div className="w-full relative @container/nav z-[25] flex-shrink-0">
              <div className="h-16 top-0 @[80rem]/nav:h-0 @[80rem]/nav:top-8 absolute z-10 flex flex-row items-center justify-center w-full bg-gradient-to-b from-background via-background via-80% to-transparent @[80rem]/nav:from-transparent @[80rem]/nav:via-transparent">
                <div className="absolute start-1">
                  <div className="flex flex-row items-center">
                    <Link
                      aria-label="الصفحة الرئيسية"
                      className="rounded-lg focus:outline-none focus-visible:ring-1 focus-visible:ring-ring ms-2 me-[0.5]"
                      href="/"
                    >
                      <Image src="/dr-x-logo.png" alt="Dr.X" width={88} height={33} priority />
                    </Link>
                  </div>
                </div>
                <div className="grow justify-center hidden max-w-[50%] @[640px]/nav:flex"></div>
                <div className="absolute flex flex-row items-center gap-0.5 ms-auto end-3">
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="السجل"
                    className="h-10 w-10 rounded-full text-foreground hover:bg-muted"
                  >
                    <Search className="stroke-2" />
                  </Button>
                  <div className="flex flex-row items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label="الإعدادات"
                      className="h-10 w-10 rounded-full hidden sm:flex text-foreground hover:bg-muted"
                    >
                      <Settings className="stroke-2" />
                    </Button>
                    <Button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full py-2 h-8 px-3 text-sm">
                      <User className="w-4 h-4" />
                      <div>سجل</div>
                    </Button>
                    <Button
                      variant="outline"
                      className="rounded-full py-2 hidden sm:flex h-8 px-3 text-sm text-primary ring-1 ring-inset ring-border hover:bg-muted hover:border-muted-foreground bg-transparent"
                    >
                      <div>تسجيل الدخول</div>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center w-full h-full p-2 mx-auto justify-center sm:p-4 sm:gap-9 isolate mt-16 sm:mt-0 overflow-scroll">
              <div className="flex flex-col items-center gap-6 h-[450px] w-full sm:pt-12 isolate">
                <div className="flex flex-col items-center justify-center w-full sm:px-4 px-2 gap-6 sm:gap-4 xl:w-4/5 flex-initial pb-0 max-w-breakout">
                  <Image src="/dr-x-logo.png" alt="Dr.X" width={320} height={64} priority />
                  <div className="w-full xl:w-4/5 overflow-x-auto no-touch-scrollbar max-w-breakout will-change-[mask-image] sm:[mask-image:none] [mask-image:linear-gradient(to_right,transparent_0,black_0px,black_calc(100%_-_40px),transparent_100%)] sm:hidden">
                    <div className="flex flex-col gap-2">
                      <div className="flex flex-row flex-wrap w-full gap-2 sm:gap-2 justify-center items-center">
                        <Button
                          variant="outline"
                          className="h-10 px-3.5 py-2 text-sm rounded-full text-foreground hover:bg-muted bg-transparent"
                        >
                          <Paperclip className="stroke-2 text-muted-foreground" />
                          <span className="overflow-hidden whitespace-nowrap text-ellipsis">تعديل الصورة</span>
                        </Button>
                        <Button
                          variant="outline"
                          className="h-10 px-3.5 py-2 text-sm rounded-full text-foreground hover:bg-muted bg-transparent"
                        >
                          <Newspaper className="stroke-2 text-muted-foreground" />
                          آخر الأخبار
                        </Button>
                        <Button
                          variant="outline"
                          className="h-10 px-3.5 py-2 text-sm rounded-full text-foreground hover:bg-muted group bg-transparent"
                        >
                          <User className="stroke-2 text-muted-foreground" />
                          شخصيات
                          <ChevronDownIcon className="w-3 h-3 text-muted-foreground group-data-[state=open]:rotate-180 transition-transform duration-200" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute bottom-0 mx-auto inset-x-0 max-w-breakout sm:relative flex flex-col items-center w-full gap-1 sm:gap-5 sm:bottom-auto sm:inset-x-auto sm:max-w-full">
                <div className="flex flex-col-reverse items-center justify-between flex-1 w-full gap-0 sm:gap-3 sm:flex-col relative p-2 sm:p-0">
                  <form
                    className="w-full text-base flex flex-col gap-2 items-center justify-center relative z-10 mt-2"
                    onSubmit={(e) => {
                      e.preventDefault()
                      handleSendMessage()
                    }}
                  >
                    <div className="flex flex-row gap-2 justify-center w-full relative xl:w-4/5">
                      <input className="hidden" multiple type="file" name="files" />
                      <div className="query-bar group bg-card ring-border hover:ring-border-foreground focus-within:ring-border-foreground hover:focus-within:ring-border-foreground relative w-full overflow-hidden @container/input shadow shadow-black/5 max-w-breakout ring-1 ring-inset focus-within:ring-1 pb-12 px-2 @[480px]/input:px-3 rounded-3xl transition-all">
                        <div className="w-full flex-row gap-2 mt-3 px-1 whitespace-nowrap hidden overflow-x-auto will-change-[mask-image] sm:[mask-image:none] [mask-image:linear-gradient(to_right,transparent_0,black_0px,black_calc(100%_-_40px),transparent_100%)] opacity-100"></div>
                        <div className="relative z-10">
                          <Label
                            htmlFor="chat-input"
                            className="absolute px-2 @[480px]/input:px-3 py-5 text-muted-foreground pointer-events-none select-none"
                          >
                            ماذا تريد أن تعرف؟
                          </Label>
                          <textarea
                            id="chat-input"
                            dir="auto"
                            aria-label="اسأل غروك عن أي شيء"
                            className="w-full px-2 @[480px]/input:px-3 bg-transparent focus:outline-none text-foreground align-bottom min-h-14 pt-5 my-0 mb-5 resize-none"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyPress={handleKeyPress}
                            ref={textareaRef}
                            rows={1}
                          ></textarea>
                        </div>
                        <div className="flex gap-1.5 absolute inset-x-0 bottom-0 border-2 border-transparent p-2 @[480px]/input:p-2 max-w-full">
                          <Button
                            variant="outline"
                            size="icon"
                            aria-label="الرجاء تسجيل الدخول لإرفاق ملفات"
                            disabled
                            className="h-10 w-10 rounded-full group/attach-button text-foreground hover:bg-muted bg-transparent"
                          >
                            <Paperclip className="stroke-2 text-muted-foreground group-hover/attach-button:text-foreground transition-colors duration-100" />
                          </Button>
                          <div className="flex grow gap-1.5 max-w-full">
                            <div className="grow flex gap-1.5 max-w-full">
                              <div className="flex ring-1 rounded-full items-center max-h-[40px] box-border transition-colors duration-100 relative overflow-hidden ring-inset ring-border">
                                <Button
                                  variant="ghost"
                                  aria-label="DeepSearch"
                                  className="h-10 px-3.5 py-2 text-sm rounded-full group/ds-toggle transition-colors duration-100 focus-visible:ring-transparent box-border relative overflow-hidden rounded-r-none pr-3 bg-transparent hover:bg-muted focus-visible:bg-muted"
                                >
                                  <Search className="stroke-2 text-muted-foreground group-hover/ds-toggle:text-foreground" />
                                  <span>DeepSearch</span>
                                </Button>
                                <div className="h-4 w-[1px] bg-border focus:outline-none" tabIndex={-1}></div>
                                <Button
                                  variant="ghost"
                                  aria-label="تغيير الوضع"
                                  className="h-10 px-3.5 py-2 text-sm rounded-full transition-colors duration-100 relative overflow-hidden focus-visible:ring-transparent rounded-l-none pl-2 pr-3 bg-transparent hover:bg-muted focus-visible:bg-muted"
                                >
                                  <ChevronDown className="w-3 h-3 stroke-2 text-muted-foreground" />
                                </Button>
                              </div>
                              <Button
                                variant="outline"
                                aria-label="Think"
                                className="h-10 px-3.5 py-2 text-sm rounded-full group/think-toggle transition-colors duration-100 relative overflow-hidden border text-foreground hover:bg-muted bg-transparent"
                              >
                                <svg
                                  width="18"
                                  height="18"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="stroke-2 group-hover/think-toggle:text-foreground text-muted-foreground"
                                >
                                  <path
                                    d="M19 9C19 12.866 15.866 17 12 17C8.13398 17 4.99997 12.866 4.99997 9C4.99997 5.13401 8.13398 3 12 3C15.866 3 19 5.13401 19 9Z"
                                    className="fill-yellow-100 dark:fill-yellow-300 origin-center transition-[transform,opacity] duration-100 scale-0 opacity-0"
                                  ></path>
                                  <path
                                    d="M15 16.1378L14.487 15.2794L14 15.5705V16.1378H15ZM8.99997 16.1378H9.99997V15.5705L9.51293 15.2794L8.99997 16.1378ZM18 9C18 11.4496 16.5421 14.0513 14.487 15.2794L15.5129 16.9963C18.1877 15.3979 20 12.1352 20 9H18ZM12 4C13.7598 4 15.2728 4.48657 16.3238 5.33011C17.3509 6.15455 18 7.36618 18 9H20C20 6.76783 19.082 4.97946 17.5757 3.77039C16.0931 2.58044 14.1061 2 12 2V4ZM5.99997 9C5.99997 7.36618 6.64903 6.15455 7.67617 5.33011C8.72714 4.48657 10.2401 4 12 4V2C9.89382 2 7.90681 2.58044 6.42427 3.77039C4.91791 4.97946 3.99997 6.76783 3.99997 9H5.99997ZM9.51293 15.2794C7.4578 14.0513 5.99997 11.4496 5.99997 9H3.99997C3.99997 12.1352 5.81225 15.3979 8.48701 16.9963L9.51293 15.2794ZM9.99997 19.5001V16.1378H7.99997V19.5001H9.99997ZM10.5 20.0001C10.2238 20.0001 9.99997 19.7763 9.99997 19.5001H7.99997C7.99997 20.8808 9.11926 22.0001 10.5 22.0001V20.0001ZM13.5 20.0001H10.5V22.0001H13.5V20.0001ZM14 19.5001C14 19.7763 13.7761 20.0001 13.5 20.0001V22.0001C14.8807 22.0001 16 20.8808 16 19.5001H14ZM14 16.1378V19.5001H16V16.1378H14Z"
                                    fill="currentColor"
                                  ></path>
                                  <path d="M9 16.0001H15" stroke="currentColor"></path>
                                  <path d="M12 16V12" stroke="currentColor" strokeLinecap="square"></path>
                                  <g>
                                    <path
                                      d="M20 7L19 8"
                                      stroke="currentColor"
                                      strokeLinecap="round"
                                      className="transition-[transform,opacity] duration-100 ease-in-out translate-x-0 translate-y-0 opacity-0"
                                    ></path>
                                    <path
                                      d="M20 9L19 8"
                                      stroke="currentColor"
                                      strokeLinecap="round"
                                      className="transition-[transform,opacity] duration-100 ease-in-out translate-x-0 translate-y-0 opacity-0"
                                    ></path>
                                    <path
                                      d="M4 7L5 8"
                                      stroke="currentColor"
                                      strokeLinecap="round"
                                      className="transition-[transform,opacity] duration-100 ease-in-out translate-x-0 translate-y-0 opacity-0"
                                    ></path>
                                    <path
                                      d="M4 9L5 8"
                                      stroke="currentColor"
                                      strokeLinecap="round"
                                      className="transition-[transform,opacity] duration-100 ease-in-out translate-x-0 translate-y-0 opacity-0"
                                    ></path>
                                  </g>
                                </svg>
                                <span>Think</span>
                              </Button>
                            </div>
                            <div className="flex items-center">
                              <Button
                                variant="ghost"
                                aria-label="Dr.X 3"
                                className="h-10 px-3.5 py-2 text-sm rounded-full text-foreground hover:bg-muted sm:border-0"
                              >
                                <span className="inline-block text-primary text-xs @[400px]/input:text-sm">Dr.X 3</span>
                                <ChevronDown className="w-3 h-3 stroke-2 text-muted-foreground transition-transform" />
                              </Button>
                            </div>
                          </div>
                          <div className="ml-auto flex flex-row items-end gap-1">
                            <Button
                              type="submit"
                              aria-label="إرسال"
                              className="group flex flex-col justify-center rounded-full focus:outline-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring h-10 relative aspect-square flex-col items-center justify-center ring-inset before:absolute before:inset-0 before:rounded-full before:bg-primary before:ring-0 before:transition-[clip-path,background-color] duration-100 bg-gray-100 dark:bg-gray-600 text-muted-foreground before:[clip-path:circle(0%_at_50%_50%)] ring-0"
                            >
                              <Send className="w-5 h-5 stroke-2 relative" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
                <div className="text-[11px] sm:text-xs text-muted-foreground text-nowrap">
                  بإرسالك رسالة إلى Dr.X، فإنك توافق على{" "}
                  <Link
                    className="text-primary"
                    href="https://x.ai/legal/terms-of-service"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    الشروط
                  </Link>{" "}
                  و{" "}
                  <Link
                    className="text-primary"
                    href="https://x.ai/legal/privacy-policy"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    سياسة الخصوصية
                  </Link>
                  .
                </div>
              </div>
            </div>
          </main>
          <AIAssistant />
        </div>
      </div>
    </div>
  )
}
