import { useState } from "react"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { Card, CardContent } from "./ui/card"
import { BarChart3, Brain, TrendingUp, Shield, Zap, Users, ChevronRight, Play, Star, CheckCircle, ArrowRight, Moon, Sun } from "lucide-react"
import { ImageWithFallback } from "./figma/ImageWithFallback"

interface LandingPageProps {
  onEnterApp: () => void
  isDark: boolean
  toggleTheme: () => void
}

export default function LandingPage({ onEnterApp, isDark, toggleTheme }: LandingPageProps) {
  const [isHovered, setIsHovered] = useState<string | null>(null)

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const features = [
    {
      icon: Brain,
      title: "AI驱动分析",
      description: "基于机器学习的智能分析引擎，提供实时市场洞察和投资建议",
      color: "text-blue-500"
    },
    {
      icon: TrendingUp,
