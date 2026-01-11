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
