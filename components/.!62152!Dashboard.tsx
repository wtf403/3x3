import MetricCard from "./MetricCard"
import PriceChart from "./PriceChart"
import ProjectOverview from "./ProjectOverview"
import { DollarSign, TrendingUp, Users, Activity } from "lucide-react"

interface DashboardProps {
  onQuestionClick?: (question: string) => void
}

export default function Dashboard({ onQuestionClick }: DashboardProps) {
  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="当前价格"
          value="$46,300"
          change="+2.4%"
          changeType="positive"
          icon={DollarSign}
