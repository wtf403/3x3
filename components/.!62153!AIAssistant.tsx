import { useState } from "react"
import { Button } from "./ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Input } from "./ui/input"
import { Badge } from "./ui/badge"
import { MessageCircle, Send, X, HelpCircle, Minimize2, Maximize2 } from "lucide-react"

interface Message {
  id: string
  type: 'user' | 'assistant'
  content: string
  timestamp: Date
}

interface AIAssistantProps {
  isOpen: boolean
  onToggle: () => void
  suggestedQuestion?: string
}

export default function AIAssistant({ isOpen, onToggle, suggestedQuestion }: AIAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "assistant",
      content: "你好！我是你的币圈分析助手。有什么指标需要我解释吗？你可以直接问我，比如：'什么是恐慌贪婪指数？'或者'链上活跃地址是什么意思？'",
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState("")
  const [isMinimized, setIsMinimized] = useState(false)

  const commonQuestions = [
    "什么是市值？",
    "恐慌贪婪指数怎么看？",
    "链上活跃地址代表什么？",
    "交易所流入量意味着什么？",
