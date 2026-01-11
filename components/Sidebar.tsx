import { BarChart3, TrendingUp, Shield, FileText, Users, Activity, DollarSign } from "lucide-react"
import { Button } from "./ui/button"

interface SidebarProps {
  activeSection: string
  onSectionChange: (section: string) => void
}

export default function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
  const menuItems = [
    { id: "dashboard", label: "仪表板", icon: BarChart3 },
    { id: "analysis", label: "项目分析", icon: TrendingUp },
    { id: "risk", label: "风险评估", icon: Shield },
    { id: "tokenomics", label: "代币经济", icon: DollarSign },
    { id: "activity", label: "链上活动", icon: Activity },
    { id: "social", label: "社区数据", icon: Users },
    { id: "reports", label: "研究报告", icon: FileText },
  ]

  return (
    <aside className="w-64 border-r bg-card p-4">
      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          return (
            <Button
              key={item.id}
              variant={activeSection === item.id ? "secondary" : "ghost"}
              className="w-full justify-start"
              onClick={() => onSectionChange(item.id)}
            >
              <Icon className="mr-3 h-4 w-4" />
              {item.label}
            </Button>
          )
        })}
      </nav>
    </aside>
  )
}