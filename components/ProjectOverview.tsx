import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { ExternalLink, Star, AlertTriangle } from "lucide-react"
import QuestionableMetric from "./QuestionableMetric"

interface ProjectOverviewProps {
  onQuestionClick?: (question: string) => void
}

export default function ProjectOverview({ onQuestionClick }: ProjectOverviewProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Bitcoin (BTC)
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon">
              <Star className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-4">
          <div>
            <h3>Bitcoin</h3>
            <p className="text-sm text-muted-foreground">点对点电子现金系统</p>
            <div className="flex space-x-2 mt-2">
              <Badge>Layer 1</Badge>
              <Badge variant="outline">PoW</Badge>
              <Badge variant="outline">数字黄金</Badge>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">市值排名</span>
            <span>#1</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">总供应量</span>
            <span>21,000,000 BTC</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">流通供应量</span>
            <span>19,600,000 BTC</span>
          </div>
          {onQuestionClick ? (
            <QuestionableMetric
              question="什么是完全稀释估值？"
              onQuestionClick={onQuestionClick}
              tooltip="了解完全稀释估值的含义"
            >
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">完全稀释估值</span>
                <span>$972B</span>
              </div>
            </QuestionableMetric>
          ) : (
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">完全稀释估值</span>
              <span>$972B</span>
            </div>
          )}
        </div>

        <div className="border-t pt-3">
          <div className="flex items-center space-x-2 text-sm">
            <AlertTriangle className="h-4 w-4 text-yellow-500" />
            <span>风险评级: 低风险</span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            基于技术指标、市场表现和基本面分析
          </p>
        </div>
      </CardContent>
    </Card>
  )
}