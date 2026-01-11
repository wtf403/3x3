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
          description="24小时变化"
          onQuestionClick={onQuestionClick}
        />
        <MetricCard
          title="市值"
          value="$905.2B"
          change="+1.8%"
          changeType="positive"
          icon={TrendingUp}
          description="总市值排名 #1"
          onQuestionClick={onQuestionClick}
        />
        <MetricCard
          title="24h交易量"
          value="$28.5B"
          change="-5.2%"
          changeType="negative"
          icon={Activity}
          description="全网交易量"
          onQuestionClick={onQuestionClick}
        />
        <MetricCard
          title="活跃地址"
          value="1.2M"
          change="+0.8%"
          changeType="positive"
          icon={Users}
          description="日活跃地址数"
          onQuestionClick={onQuestionClick}
        />
      </div>

      {/* Charts and Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <PriceChart />
        <ProjectOverview onQuestionClick={onQuestionClick} />
      </div>

      {/* Additional Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricCard
          title="恐慌贪婪指数"
          value="65"
          description="贪婪状态"
          changeType="positive"
          onQuestionClick={onQuestionClick}
        />
        <MetricCard
          title="交易所流入量"
          value="12,450 BTC"
          change="-15.3%"
          changeType="positive"
          description="24小时流入"
          onQuestionClick={onQuestionClick}
        />
        <MetricCard
          title="链上交易数"
          value="285,670"
          change="+3.2%"
          changeType="positive"
          description="24小时交易数"
          onQuestionClick={onQuestionClick}
        />
      </div>
    </div>
  )
}