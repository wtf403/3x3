import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { Progress } from "./ui/progress"
import { TrendingUp, TrendingDown, DollarSign, Users, Activity, AlertTriangle, Zap, BarChart3 } from "lucide-react"

interface Coin {
  symbol: string
  name: string
  price: string
  change: string
  changeType: "positive" | "negative"
  marketCap: string
  rank: number
}

interface LiveDataSidebarProps {
  selectedCoin: Coin
  onInsightRequest: (insight: string, coinSymbol: string) => void
}

export default function LiveDataSidebar({ selectedCoin, onInsightRequest }: LiveDataSidebarProps) {
  const metrics = [
    {
      title: "24h交易量",
      value: "$28.5B",
      change: "-5.2%",
      changeType: "negative" as const,
      icon: Activity,
      insight: `${selectedCoin.symbol}的交易量分析和市场活跃度如何？`
    },
    {
      title: "活跃地址",
      value: "1.2M",
      change: "+0.8%",
      changeType: "positive" as const,
      icon: Users,
      insight: `${selectedCoin.symbol}的链上活跃度和用户增长情况怎么样？`
    },
    {
      title: "市场占有率",
      value: "52.3%",
      change: "+0.2%",
      changeType: "positive" as const,
      icon: BarChart3,
      insight: `${selectedCoin.symbol}在整个加密市场中的地位如何？`
    }
  ]

  const sentiment = {
    fearGreed: 65,
    level: "贪婪",
    socialSentiment: "乐观",
    whaleActivity: "+8.2%",
    exchangeInflow: "-15.3%"
  }

  const technicalIndicators = [
    { name: "RSI", value: "68.5", status: "接近超买", color: "text-orange-600" },
    { name: "MACD", value: "看涨", status: "金叉确认", color: "text-green-600" },
    { name: "MA50", value: "突破", status: "向上突破", color: "text-green-600" }
  ]

  const risks = [
    "RSI接近超买区域",
    "宏观经济不确定性", 
    "监管政策风险"
  ]

  return (
    <div className="space-y-4">
      {/* 实时指标 */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center justify-between">
            <span>实时数据</span>
            <Button 
              variant="outline" 
              size="sm"
              className="text-xs h-7"
              onClick={() => onInsightRequest(`帮我分析一下${selectedCoin.symbol}现在的整体表现如何？`, selectedCoin.symbol)}
            >
              <Zap className="h-3 w-3 mr-1" />
              智能分析
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {metrics.map((metric) => (
            <div 
              key={metric.title}
              className="flex items-center justify-between p-2 rounded-lg bg-muted/30 cursor-pointer hover:bg-muted/50 transition-colors"
              onClick={() => onInsightRequest(metric.insight, selectedCoin.symbol)}
            >
              <div className="flex items-center gap-2">
                <metric.icon className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{metric.title}</span>
              </div>
              <div className="text-right">
                <div className="font-medium text-sm">{metric.value}</div>
                <Badge 
                  variant={metric.changeType === 'positive' ? 'default' : 'destructive'}
                  className="text-xs h-4"
                >
                  {metric.change}
                </Badge>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* 市场情绪 */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center justify-between">
            <span>市场情绪</span>
            <Button 
              variant="ghost" 
              size="sm"
              className="text-xs h-7"
              onClick={() => onInsightRequest(`${selectedCoin.symbol}的市场情绪如何？现在适合投资吗？`, selectedCoin.symbol)}
            >
              分析情绪
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {/* 恐慌贪婪指数 */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm">恐慌贪婪指数</span>
              <div className="flex items-center gap-2">
                <span className="font-medium">{sentiment.fearGreed}</span>
                <Badge variant="secondary" className="text-xs">
                  {sentiment.level}
                </Badge>
              </div>
            </div>
            <Progress value={sentiment.fearGreed} className="h-2" />
          </div>

          {/* 其他情绪指标 */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex justify-between">
              <span className="text-muted-foreground">社交情绪</span>
              <span className="text-green-600">{sentiment.socialSentiment}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">大户活动</span>
              <span className="text-green-600">{sentiment.whaleActivity}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 技术指标 */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center justify-between">
            <span>技术指标</span>
            <Button 
              variant="ghost" 
              size="sm"
              className="text-xs h-7"
              onClick={() => onInsightRequest(`${selectedCoin.symbol}的技术指标显示什么信号？`, selectedCoin.symbol)}
            >
              技术分析
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {technicalIndicators.map((indicator) => (
              <div key={indicator.name} className="flex justify-between items-center text-sm">
                <span className="font-medium">{indicator.name}</span>
                <div className="text-right">
                  <div className={indicator.color}>{indicator.value}</div>
                  <div className="text-xs text-muted-foreground">{indicator.status}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 风险提醒 */}
      <Card className="border-orange-200 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950/50 dark:to-orange-900/50 dark:border-orange-800">
        <CardContent className="p-4">
          <div className="flex items-start gap-2">
            <AlertTriangle className="h-4 w-4 text-orange-600 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <div className="font-medium text-orange-900 dark:text-orange-100 text-sm">风险提醒</div>
              <ul className="text-xs text-orange-700 dark:text-orange-200 mt-1 space-y-1">
                {risks.map((risk, index) => (
                  <li key={index}>• {risk}</li>
                ))}
              </ul>
              <Button 
                variant="link" 
                size="sm" 
                className="text-orange-600 p-0 h-auto text-xs mt-2"
                onClick={() => onInsightRequest(`${selectedCoin.symbol}现在有什么投资风险需要注意？`, selectedCoin.symbol)}
              >
                详细风险分析 →
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 快速操作 */}
      <div className="space-y-2">
        <Button 
          variant="outline" 
          className="w-full justify-start text-sm h-9"
          onClick={() => onInsightRequest(`现在是买入${selectedCoin.symbol}的好时机吗？`, selectedCoin.symbol)}
        >
          <TrendingUp className="h-4 w-4 mr-2" />
          买入时机分析
        </Button>
        <Button 
          variant="outline" 
          className="w-full justify-start text-sm h-9"
          onClick={() => onInsightRequest(`${selectedCoin.symbol}的价格预测和趋势分析`, selectedCoin.symbol)}
        >
          <BarChart3 className="h-4 w-4 mr-2" />
          价格预测
        </Button>
      </div>
    </div>
  )
}