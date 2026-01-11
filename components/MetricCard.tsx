import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { LucideIcon } from "lucide-react"
import QuestionableMetric from "./QuestionableMetric"

interface MetricCardProps {
  title: string
  value: string
  change?: string
  changeType?: "positive" | "negative" | "neutral"
  icon?: LucideIcon
  description?: string
  onQuestionClick?: (question: string) => void
}

export default function MetricCard({ 
  title, 
  value, 
  change, 
  changeType = "neutral", 
  icon: Icon,
  description,
  onQuestionClick 
}: MetricCardProps) {
  const getChangeColor = () => {
    switch (changeType) {
      case "positive": return "text-green-600"
      case "negative": return "text-red-600"
      default: return "text-muted-foreground"
    }
  }

  const getBadgeVariant = () => {
    switch (changeType) {
      case "positive": return "default"
      case "negative": return "destructive"
      default: return "secondary"
    }
  }

  const cardContent = (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {change && (
          <div className="flex items-center space-x-2 mt-1">
            <Badge variant={getBadgeVariant()} className="text-xs">
              {change}
            </Badge>
          </div>
        )}
        {description && (
          <p className="text-xs text-muted-foreground mt-2">{description}</p>
        )}
      </CardContent>
    </Card>
  )

  if (onQuestionClick) {
    return (
      <QuestionableMetric
        question={`什么是${title}？`}
        onQuestionClick={onQuestionClick}
        tooltip={`了解 ${title} 的含义`}
      >
        {cardContent}
      </QuestionableMetric>
    )
  }

  return cardContent
}