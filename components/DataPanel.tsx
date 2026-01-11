import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { TrendingUp, TrendingDown, DollarSign, Users, Activity, Target, AlertTriangle, Zap } from "lucide-react"
import PriceChart from "./PriceChart"

interface DataPanelProps {
  onInsightRequest: (insight: string) => void
}

export default function DataPanel({ onInsightRequest }: DataPanelProps) {
  const metrics = [
    {
      title: "当前价格",
      value: "$46,300",
      change: "+2.4%",
      changeType: "positive" as const,
      icon: DollarSign,
      insight: "价格刚刚突破关键阻力位 $45,000，这通常是看涨信号"
    },
    {
      title: "市值",
      value: "$905.2B",
      change: "+1.8%",
      changeType: "positive" as const,
      icon: TrendingUp,
      insight: "市值增长稳定，反映了机构投资者的持续信心"
    },
    {
      title: "24h交易量",
      value: "$28.5B",
      change: "-5.2%",
      changeType: "negative" as const,
      icon: Activity,
      insight: "交易量下降但价格上涨，表明供应紧张"
    },
    {
      title: "活跃地址",
      value: "1.2M",
      change: "+0.8%",
      changeType: "positive" as const,
      icon: Users,
      insight: "网络活跃度稳步增长，生态系统健康发展"
    }
  ]

  const sentiment = {
    fearGreed: 65,
    socialSentiment: "乐观",
    whaleActivity: "+8.2%",
    exchangeInflow: "-15.3%"
  }

  const technicalIndicators = [
    { name: "RSI", value: 68.5, status: "接近超买" },
    { name: "MACD", value: "看涨", status: "金叉确认" },
    { name: "布林带", value: "上轨", status: "突破在即" }
  ]

  return (
    <div className="space-y-6">
      {/* 核心指标 */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium">实时数据</h3>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => onInsightRequest("根据这些核心指标，现在的整体趋势如何？")}
          >
            <Zap className="h-4 w-4 mr-2" />
            分析趋势
          </Button>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          {metrics.map((metric) => (
            <Card 
              key={metric.title} 
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onInsightRequest(metric.insight)}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <metric.icon className="h-4 w-4 text-muted-foreground" />
                  <Badge variant={metric.changeType === 'positive' ? 'default' : 'destructive'}>
                    {metric.change}
                  </Badge>
                </div>
                <div className="text-2xl font-bold">{metric.value}</div>
                <div className="text-xs text-muted-foreground">{metric.title}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* 价格图表 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>价格走势</span>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => onInsightRequest("根据价格图表，你能看出什么技术面信号吗？")}
            >
              分析图表
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <PriceChart />
        </CardContent>
      </Card>

      {/* 市场情绪 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>市场情绪</span>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => onInsightRequest("市场情绪指标显示什么信号？现在投资者心理如何？")}
            >
              解读情绪
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm">恐慌贪婪指数</span>
            <div className="flex items-center gap-2">
              <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-orange-500 transition-all"
                  style={{ width: `${sentiment.fearGreed}%` }}
                />
              </div>
              <span className="font-medium">{sentiment.fearGreed}</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">社交情绪</span>
              <span>{sentiment.socialSentiment}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">大户活动</span>
              <span className="text-green-600">{sentiment.whaleActivity}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">交易所流入</span>
              <span className="text-green-600">{sentiment.exchangeInflow}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 技术指标 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>技术指标</span>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => onInsightRequest("技术指标都在说什么？现在适合进场吗？")}
            >
              技术分析
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {technicalIndicators.map((indicator) => (
              <div key={indicator.name} className="flex justify-between items-center">
                <span className="text-sm font-medium">{indicator.name}</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm">{indicator.value}</span>
                  <Badge variant="outline" className="text-xs">
                    {indicator.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 风险提醒 */}
      <Card className="border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-950">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-orange-600 mt-0.5" />
            <div>
              <div className="font-medium text-orange-900 dark:text-orange-100">智能风险提醒</div>
              <div className="text-sm text-orange-700 dark:text-orange-200 mt-1">
                RSI 接近超买区域，建议关注回调风险
              </div>
              <Button 
                variant="link" 
                size="sm" 
                className="text-orange-600 p-0 h-auto"
                onClick={() => onInsightRequest("当前有什么风险需要我注意？应该如何应对？")}
              >
                了解详情 →
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}