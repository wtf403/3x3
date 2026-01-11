import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Progress } from "./ui/progress"
import { Badge } from "./ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"

export default function AnalysisSection() {
  const technicalScores = [
    { name: "代码质量", score: 85, description: "GitHub活跃度、代码提交频率" },
    { name: "团队实力", score: 92, description: "核心团队背景、开发经验" },
    { name: "社区活跃度", score: 78, description: "社交媒体、Discord、Telegram" },
    { name: "生态发展", score: 88, description: "合作伙伴、应用场景" },
  ]

  const riskFactors = [
    { factor: "监管风险", level: "中等", color: "yellow" },
    { factor: "技术风险", level: "低", color: "green" },
    { factor: "市场风险", level: "高", color: "red" },
    { factor: "流动性风险", level: "低", color: "green" },
  ]

  const getBadgeVariant = (color: string) => {
    switch (color) {
      case "green": return "default"
      case "red": return "destructive"
      default: return "secondary"
    }
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="technical" className="w-full">
        <TabsList>
          <TabsTrigger value="technical">技术分析</TabsTrigger>
          <TabsTrigger value="fundamental">基本面分析</TabsTrigger>
          <TabsTrigger value="risk">风险评估</TabsTrigger>
        </TabsList>

        <TabsContent value="technical" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>技术评分</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {technicalScores.map((item) => (
                <div key={item.name} className="space-y-2">
                  <div className="flex justify-between">
                    <span>{item.name}</span>
                    <span>{item.score}/100</span>
                  </div>
                  <Progress value={item.score} className="h-2" />
                  <p className="text-xs text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="fundamental" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>基本面指标</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4>网络活跃度</h4>
                  <p className="text-2xl">124,580</p>
                  <p className="text-xs text-muted-foreground">日活跃地址数</p>
                </div>
                <div>
                  <h4>哈希率</h4>
                  <p className="text-2xl">450 EH/s</p>
                  <p className="text-xs text-muted-foreground">网络安全性指标</p>
                </div>
                <div>
                  <h4>交易费用</h4>
                  <p className="text-2xl">$12.50</p>
                  <p className="text-xs text-muted-foreground">平均交易费用</p>
                </div>
                <div>
                  <h4>确认时间</h4>
                  <p className="text-2xl">10 分钟</p>
                  <p className="text-xs text-muted-foreground">平均确认时间</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="risk" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>风险因素</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {riskFactors.map((risk) => (
                <div key={risk.factor} className="flex justify-between items-center">
                  <span>{risk.factor}</span>
                  <Badge variant={getBadgeVariant(risk.color)}>
                    {risk.level}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}