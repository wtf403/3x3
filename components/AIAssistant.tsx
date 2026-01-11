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
    "哈希率是什么？",
    "完全稀释估值是什么？"
  ]

  const getAIResponse = (question: string): string => {
    const responses: { [key: string]: string } = {
      "市值": "市值 = 当前价格 × 流通供应量。它反映了市场对整个项目的总估值。市值越大，通常代表项目越成熟、流动性越好，但上涨空间可能相对较小。",
      "恐慌贪婪指数": "恐慌贪婪指数是衡量市场情绪的指标，范围0-100。0-24表示极度恐慌（可能是买入机会），25-49表示恐慌，50-74表示贪婪，75-100表示极度贪婪（可能是卖出信号）。",
      "链上活跃地址": "链上活跃地址是指在特定时间内进行过交易的唯一钱包地址数量。这个指标反映了网络的真实使用情况和用户参与度。地址数增加通常表示生态健康发展。",
      "交易所流入量": "交易所流入量是指从个人钱包转入交易所的代币数量。大量流入通常意味着持有者准备卖出，可能对价格造成下行压力。",
      "哈希率": "哈希率衡量的是挖矿网络的总计算能力。哈希率越高，网络越安全，攻击成本越高。哈希率上升通常表示矿工对项目前景看好。",
      "完全稀释估值": "完全稀释估值 = 当前价格 × 最大供应量。它假设所有代币都已经发行并流通，给出了项目的最大可能市值。有助于评估代币的真实价值。"
    }

    for (const [key, response] of Object.entries(responses)) {
      if (question.includes(key)) {
        return response
      }
    }

    return "这是一个很好的问题！关于这个指标，建议你查看具体的定义和计算方法。如果你需要更详细的解释，可以告诉我具体是哪个指标，我会为你详细解释。"
  }

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
      timestamp: new Date()
    }

    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      type: "assistant",
      content: getAIResponse(inputValue),
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage, assistantMessage])
    setInputValue("")
  }

  const handleQuestionClick = (question: string) => {
    setInputValue(question)
    handleSendMessage()
  }

  if (!isOpen) return null

  return (
    <Card className="fixed bottom-4 right-4 w-96 h-[500px] shadow-lg z-50 flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <MessageCircle className="h-5 w-5" />
            <span>AI 分析助手</span>
          </CardTitle>
          <div className="flex space-x-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMinimized(!isMinimized)}
            >
              {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
            </Button>
            <Button variant="ghost" size="icon" onClick={onToggle}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      {!isMinimized && (
        <>
          <CardContent className="flex-1 overflow-hidden flex flex-col p-4">
            {/* 常见问题 */}
            <div className="mb-4">
              <p className="text-sm text-muted-foreground mb-2">常见问题：</p>
              <div className="flex flex-wrap gap-2">
                {commonQuestions.slice(0, 3).map((question) => (
                  <Badge
                    key={question}
                    variant="outline"
                    className="cursor-pointer hover:bg-secondary"
                    onClick={() => handleQuestionClick(question)}
                  >
                    <HelpCircle className="h-3 w-3 mr-1" />
                    {question}
                  </Badge>
                ))}
              </div>
            </div>

            {/* 消息列表 */}
            <div className="flex-1 overflow-y-auto space-y-3 mb-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.type === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* 输入框 */}
            <div className="flex space-x-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="问我任何关于指标的问题..."
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <Button onClick={handleSendMessage} size="icon">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </>
      )}
    </Card>
  )
}