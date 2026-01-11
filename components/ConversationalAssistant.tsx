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
  
  // 初始化消息
  useEffect(() => {
    const welcomeMessage: Message = {
      id: "1",
      type: "assistant",
      content: `你好！我是你的币圈分析师。我正在分析 ${currentCoin.name} (${currentCoin.symbol}) 的最新数据。\n\n当前价格：${currentCoin.price} (${currentCoin.change})\n市值排名：#${currentCoin.rank}\n\n你想了解什么方面的分析？可以问我技术指标、市场情绪、买入时机等任何问题。`,
      timestamp: new Date(),
      analysis: {
        type: 'insight'
      }
    }
    setMessages([welcomeMessage])
  }, [currentCoin])

  // 处理待处理的洞察请求
  useEffect(() => {
    if (pendingInsight && onInsightProcessed) {
      setInputValue(pendingInsight.question)
      setTimeout(() => {
        handleSendMessage()
        onInsightProcessed()
      }, 100)
    }
  }, [pendingInsight])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const quickQuestions = [
    `现在是买入${currentCoin.symbol}的时机吗？`,
    `${currentCoin.symbol}的市场情绪如何？`, 
    `投资${currentCoin.symbol}有什么风险？`,
    `${currentCoin.symbol}的技术指标怎么样？`,
    `${currentCoin.symbol}的价格走势预测`
  ]

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const getAIResponse = (question: string): { content: string; analysis?: any } => {
    const lowerQuestion = question.toLowerCase()
    const coinName = currentCoin.name
    const coinSymbol = currentCoin.symbol
    const coinPrice = currentCoin.price
    
    if (lowerQuestion.includes("买入") || lowerQuestion.includes("时机")) {
      return {
        content: `基于${coinName}的当前分析，我看到以下信号：\n\n📈 价格：${coinPrice} (${currentCoin.change})\n📊 技术面：RSI 68.5，接近超买但趋势向上\n😤 市场情绪：恐慌贪婪指数65（贪婪状态）\n💰 资金流向：交易所流入减少15.3%（积极信号）\n\n💡 建议：${coinSymbol}目前技术面偏强，但市场情绪已进入贪婪区域。可以考虑分批建仓，但要控制仓位并设置止损。短期内可能面临获利回吐压力。`,
        analysis: { type: 'insight' }
      }
    }
    
    if (lowerQuestion.includes("情绪") || lowerQuestion.includes("市场")) {
      return {
        content: `${coinName}的市场情绪分析：\n\n😤 恐慌贪婪指数：65/100（贪婪状态）\n📱 社交媒体情绪：对${coinSymbol}偏向乐观\n💰 大户地址活动：增加 8.2%\n🔄 交易所流入量：减少 15.3%（减少抛压）\n📈 持有者信心：长期持有地址增加\n\n📊 分析：${coinSymbol}的市场情绪整体积极，投资者信心较强。但贪婪指数已达65，建议关注是否会出现过度FOMO情绪。减少的交易所流入表明持有者不急于出售。`,
        analysis: { type: 'market' }
      }
    }
    
    if (lowerQuestion.includes("风险") || lowerQuestion.includes("注意")) {
      return {
        content: `投资${coinName}的主要风险分析：\n\n⚠️ 技术风险：RSI 68.5接近超买，短期可能回调\n📉 市场风险：贪婪指数65，市场情绪偏热\n🏛️ 监管风险：各国政策不确定性依然存在\n💹 宏观风险：美联储政策变化影响流动性\n⛽ ${coinSymbol}特有风险：网络拥堵、竞争币种分流\n\n🛡️ 风险管理建议：\n• 仓位控制在投资组合的10-20%\n• 设置止损位在关键支撑位附近\n• 分批买入，避免一次性重仓\n• 关注${coinSymbol}基本面变化`,
        analysis: { type: 'risk' }
      }
    }
    
    if (lowerQuestion.includes("技术") || lowerQuestion.includes("指标")) {
      return {
        content: "技术分析概览：\n\n📊 RSI：68.5（接近超买）\n📈 MACD：金叉确认，上涨动能强\n📉 布林带：价格接近上轨\n🎯 支撑位：$44,500 / $42,800\n🎯 阻力位：$48,000 / $50,000\n\n短期趋势向上，但需要注意超买风险。",
        analysis: { type: 'price' }
      }
    }
    
    if (lowerQuestion.includes("历史") || lowerQuestion.includes("对比")) {
      return {
        content: "历史数据对比：\n\n📅 vs 上月：+12.5%\n📅 vs 上年：+145.2%\n📅 vs ATH：-24.8%\n\n📊 当前价格位于历史 75% 分位数\n📈 长期趋势依然向上\n🔄 波动率相比去年同期下降 18%\n\n从历史角度看，当前价位具有一定吸引力。",
        analysis: { type: 'insight' }
      }
    }

    return {
      content: "这是一个很好的问题！基于当前的市场数据，我建议你关注以下几个方面：价格趋势、市场情绪、技术指标和风险管理。你可以具体问我任何一个方面，我会给你详细的分析。",
      analysis: { type: 'insight' }
    }
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // 模拟AI思考时间
    setTimeout(() => {
      const response = getAIResponse(inputValue)
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: response.content,
        timestamp: new Date(),
        analysis: response.analysis
      }

      setMessages(prev => [...prev, assistantMessage])
      setIsTyping(false)
    }, 1500)
  }

  const handleQuickQuestion = (question: string) => {
    setInputValue(question)
    setTimeout(() => handleSendMessage(), 100)
  }

  const getAnalysisIcon = (type?: string) => {
    switch (type) {
      case 'price': return <TrendingUp className="h-4 w-4 text-green-500" />
      case 'market': return <BarChart3 className="h-4 w-4 text-blue-500" />
      case 'risk': return <AlertCircle className="h-4 w-4 text-red-500" />
      case 'insight': return <Lightbulb className="h-4 w-4 text-yellow-500" />
      default: return null
    }
  }

  return (
    <div className="h-full flex flex-col">
      {/* 快速问题 */}
      <div className="p-4 border-b">
        <p className="text-sm text-muted-foreground mb-3">快速提问：</p>
        <div className="flex flex-wrap gap-2">
          {quickQuestions.map((question) => (
            <Badge
              key={question}
              variant="outline"
              className="cursor-pointer hover:bg-secondary transition-colors"
              onClick={() => handleQuickQuestion(question)}
            >
              {question}
            </Badge>
          ))}
        </div>
      </div>

      {/* 消息列表 */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {message.type === 'assistant' && (
              <Avatar className="w-8 h-8">
                <AvatarImage src="/ai-avatar.png" />
                <AvatarFallback className="bg-primary text-primary-foreground">AI</AvatarFallback>
              </Avatar>
            )}
            
            <Card className={`max-w-[80%] ${message.type === 'user' ? 'bg-primary text-primary-foreground' : ''}`}>
              <CardContent className="p-3">
                {message.analysis && (
                  <div className="flex items-center gap-2 mb-2">
                    {getAnalysisIcon(message.analysis.type)}
                    <span className="text-xs font-medium opacity-70">
                      {message.analysis.type === 'price' && '技术分析'}
                      {message.analysis.type === 'market' && '市场情绪'}
                      {message.analysis.type === 'risk' && '风险评估'}
                      {message.analysis.type === 'insight' && '智能洞察'}
                    </span>
                  </div>
                )}
                <div className="text-sm whitespace-pre-line">{message.content}</div>
                <div className="text-xs opacity-50 mt-2">
                  {message.timestamp.toLocaleTimeString()}
                </div>
              </CardContent>
            </Card>

            {message.type === 'user' && (
              <Avatar className="w-8 h-8">
                <AvatarFallback className="bg-secondary">你</AvatarFallback>
              </Avatar>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex gap-3">
            <Avatar className="w-8 h-8">
              <AvatarFallback className="bg-primary text-primary-foreground">AI</AvatarFallback>
            </Avatar>
            <Card>
              <CardContent className="p-3">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* 输入框 */}
      <div className="p-4 border-t">
        <div className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={`问我任何关于${currentCoin.name}的问题...`}
            onKeyPress={(e) => e.key === 'Enter' && !isTyping && handleSendMessage()}
            disabled={isTyping}
          />
          <Button 
            onClick={handleSendMessage} 
            disabled={!inputValue.trim() || isTyping}
            size="icon"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}