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
