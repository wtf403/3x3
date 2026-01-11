import { useState } from "react"
import { Button } from "./components/ui/button"
import { Badge } from "./components/ui/badge"
import { Separator } from "./components/ui/separator"
import ConversationalAssistant from "./components/ConversationalAssistant"
import CoinSelector from "./components/CoinSelector"
import LiveDataSidebar from "./components/LiveDataSidebar"
import LandingPage from "./components/LandingPage"
import { BarChart3, Settings, Moon, Sun, Search, Home } from "lucide-react"

interface Coin {
  symbol: string
  name: string
  price: string
  change: string
  changeType: "positive" | "negative"
  marketCap: string
  rank: number
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<'landing' | 'app'>('landing')
  const [isDark, setIsDark] = useState(false)
  const [selectedCoin, setSelectedCoin] = useState<Coin>({
    symbol: "BTC",
    name: "Bitcoin",
    price: "$46,300",
    change: "+2.4%",
    changeType: "positive",
    marketCap: "$905.2B",
    rank: 1
  })
  const [pendingInsight, setPendingInsight] = useState<{question: string, coin: string} | null>(null)

  const handleInsightRequest = (insight: string, coinSymbol: string) => {
    setPendingInsight({ question: insight, coin: coinSymbol })
  }

  const toggleTheme = () => {
    setIsDark(!isDark)
    document.documentElement.classList.toggle('dark')
  }

  const enterApp = () => {
    setCurrentPage('app')
  }

  const backToHome = () => {
    setCurrentPage('landing')
  }

  // 首页
  if (currentPage === 'landing') {
    return (
      <LandingPage
        onEnterApp={enterApp}
        isDark={isDark}
        toggleTheme={toggleTheme}
      />
    )
  }

  // 分析应用页面
  return (
    <div className="min-h-screen bg-background">
      {/* 顶部导航 */}
      <header className="border-b bg-card">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-semibold">3x3</h1>
            </div>

            <Separator orientation="vertical" className="h-6" />

            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-muted-foreground">正在分析 {selectedCoin.name}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs">
              {selectedCoin.symbol}/USD
            </Badge>
            <Badge variant={selectedCoin.changeType === 'positive' ? 'secondary' : 'destructive'} className="text-xs">
              {selectedCoin.price} ({selectedCoin.change})
            </Badge>

            <Separator orientation="vertical" className="h-6" />

            <Button variant="ghost" size="icon" onClick={backToHome} title="返回首页">
              <Home className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <Button variant="ghost" size="icon">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-73px)]">
        {/* 左侧：币种选择和数据 */}
        <div className="w-80 border-r bg-card overflow-y-auto">
          <div className="p-4 space-y-4">
            {/* 币种选择区域 */}
            <div>
              <h3 className="font-medium mb-3 flex items-center gap-2">
                <Search className="h-4 w-4" />
                选择币种
              </h3>
              <CoinSelector
                selectedCoin={selectedCoin}
                onCoinSelect={setSelectedCoin}
              />
            </div>

            <Separator />

            {/* 实时数据区域 */}
            <div>
              <h3 className="font-medium mb-3 flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                实时数据
              </h3>
              <LiveDataSidebar
                selectedCoin={selectedCoin}
                onInsightRequest={handleInsightRequest}
              />
            </div>
          </div>
        </div>

        {/* 右侧：AI对话区域 */}
        <div className="flex-1 flex flex-col">
          <ConversationalAssistant
            currentCoin={selectedCoin}
            pendingInsight={pendingInsight}
            onInsightProcessed={() => setPendingInsight(null)}
          />
        </div>
      </div>
    </div>
  )
}