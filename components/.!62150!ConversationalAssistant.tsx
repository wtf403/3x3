import { useState, useEffect, useRef } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Badge } from "./ui/badge"
import { Card, CardContent } from "./ui/card"
import { Send, TrendingUp, AlertCircle, Lightbulb, BarChart3 } from "lucide-react"
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar"

interface Message {
  id: string
  type: 'user' | 'assistant'
  content: string
  timestamp: Date
  analysis?: {
    type: 'price' | 'market' | 'risk' | 'insight'
    data?: any
  }
}

interface Coin {
  symbol: string
  name: string
  price: string
  change: string
  changeType: "positive" | "negative"
  marketCap: string
  rank: number
}

interface ConversationalAssistantProps {
  currentCoin: Coin
  pendingInsight?: {question: string, coin: string} | null
  onInsightProcessed?: () => void
}

export default function ConversationalAssistant({ 
  currentCoin, 
  pendingInsight, 
  onInsightProcessed 
}: ConversationalAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([])
  
