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
