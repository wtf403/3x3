import { useState } from "react"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { Card, CardContent } from "./ui/card"
import { BarChart3, Brain, TrendingUp, Shield, Zap, Users, ChevronRight, Play, Star, CheckCircle, ArrowRight, Moon, Sun } from "lucide-react"
import { ImageWithFallback } from "./figma/ImageWithFallback"
import Image from "next/image"

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
      title: "实时数据监控",
      description: "24/7全天候监控价格变化、交易量和市场情绪指标",
      color: "text-green-500"
    },
    {
      icon: Shield,
      title: "风险评估",
      description: "多维度风险分析，帮助您制定合理的投资策略和风险管控",
      color: "text-orange-500"
    },
    {
      icon: Zap,
      title: "闪电响应",
      description: "毫秒级数据更新，确保您第一时间获得市场变化信息",
      color: "text-purple-500"
    }
  ]

  const stats = [
    { value: "50+", label: "支持币种" },
    { value: "24/7", label: "实时监控" },
    { value: "99.9%", label: "数据准确率" },
    { value: "1M+", label: "分析数据点" }
  ]

  const testimonials = [
    {
      name: "张伟",
      role: "资深投资者",
      content: "3x3帮我在加密市场中做出了更明智的决策，AI分析师就像我的专业顾问。",
      rating: 5
    },
    {
      name: "李慧",
      role: "区块链开发者",
      content: "数据准确性令人印象深刻，技术指标分析非常专业，是我日常投资的重要工具。",
      rating: 5
    },
    {
      name: "王明",
      role: "交易员",
      content: "界面简洁直观，AI对话功能让复杂的市场分析变得简单易懂。",
      rating: 5
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* 导航栏 */}
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Image src="/logo.svg" alt="3x3 Logo" width={65} height={30} priority className="w-[65px] h-[30px]" />
            </div>

            <nav className="hidden md:flex items-center gap-6">
              <button onClick={() => scrollToSection('features')} className="text-muted-foreground hover:text-foreground transition-colors">功能特性</button>
              <button onClick={() => scrollToSection('demo')} className="text-muted-foreground hover:text-foreground transition-colors">产品演示</button>
              <button onClick={() => scrollToSection('testimonials')} className="text-muted-foreground hover:text-foreground transition-colors">用户反馈</button>
            </nav>

            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" onClick={toggleTheme}>
                {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
              <Button variant="outline" onClick={onEnterApp}>
                立即体验
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-4 py-20 md:py-32">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-6">
              🚀 AI驱动的加密货币分析平台
            </Badge>

            <h1 className="text-4xl md:text-6xl mb-6 bg-gradient-to-r from-primary via-blue-600 to-purple-600 bg-clip-text text-transparent">
              与AI分析师对话
              <br />
              掌握加密市场脉搏
            </h1>

            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              3x3 是您的专业加密货币投资助手。通过对话式AI分析，实时数据监控，让复杂的市场分析变得简单直观。
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button
                size="lg"
                onClick={onEnterApp}
                className="text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all transform hover:scale-105 bg-gradient-to-r from-primary to-blue-600"
              >
                免费开始分析
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="text-lg px-8 py-6 hover:bg-primary/5 transition-all"
              >
                <Play className="mr-2 h-5 w-5" />
                观看演示
              </Button>
            </div>

            {/* 统计数据 */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-primary mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 背景装饰 */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"></div>
        </div>
      </section>

      {/* 产品演示预览 */}
      <section className="py-20 bg-muted/30" id="demo">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl mb-4">智能分析界面预览</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              三栏式专业布局，币种选择、实时数据、AI对话，让复杂分析变得简单
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <Card className="p-2 shadow-2xl bg-background">
              <div className="aspect-video rounded-lg relative overflow-hidden group cursor-pointer" onClick={onEnterApp}>
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1644925295849-f057b6ee1c66?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcnlwdG9jdXJyZW5jeSUyMHRyYWRpbmclMjBkYXNoYm9hcmR8ZW58MXx8fHwxNzU4OTU4MzM4fDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="3x3 Dashboard Preview"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute inset-0 bg-background/20 group-hover:bg-background/10 transition-colors"></div>

                {/* 悬浮的体验按钮 */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button size="lg" className="shadow-2xl">
                    <Play className="mr-2 h-5 w-5" />
                    立即体验产品
                  </Button>
                </div>

                {/* 左下角的功能标签 */}
                <div className="absolute bottom-4 left-4 flex gap-2">
                  <Badge className="bg-background/90 text-foreground">实时数据</Badge>
                  <Badge className="bg-background/90 text-foreground">AI分析</Badge>
                  <Badge className="bg-background/90 text-foreground">智能对话</Badge>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* 功能特性 */}
      <section className="py-20" id="features">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl mb-4">核心功能特性</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              专为加密货币投资者设计的全面分析工具
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
            {features.map((feature, index) => (
              <Card
                key={index}
                className={`p-6 cursor-pointer transition-all duration-300 hover:shadow-lg ${
                  isHovered === feature.title ? 'scale-105' : ''
                }`}
                onMouseEnter={() => setIsHovered(feature.title)}
                onMouseLeave={() => setIsHovered(null)}
              >
                <CardContent className="p-0">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg bg-muted ${feature.color}`}>
                      <feature.icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl mb-2">{feature.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* 详细功能展示 */}
          <div className="max-w-6xl mx-auto">
            <Card className="p-8 bg-gradient-to-br from-primary/5 to-blue-500/5">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl mb-4">对话式AI分析体验</h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    不同于传统的图表工具，3x3提供自然语言交互。只需要用中文提问，AI分析师就能为您提供专业的市场洞察和投资建议。
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center mt-0.5">
                        <CheckCircle className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium mb-1">智能问答系统</div>
                        <div className="text-sm text-muted-foreground">支持复杂的投资策略咨询</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center mt-0.5">
                        <CheckCircle className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium mb-1">实时数据融合</div>
                        <div className="text-sm text-muted-foreground">基于最新市场数据的分析</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center mt-0.5">
                        <CheckCircle className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium mb-1">个性化建议</div>
                        <div className="text-sm text-muted-foreground">根据您的问题提供针对性建议</div>
                      </div>
                    </div>
                  </div>
                  <Button className="mt-6" onClick={onEnterApp}>
                    体验AI分析师
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
                <div className="relative">
                  <Card className="p-4 bg-background/80 backdrop-blur-sm">
                    <div className="space-y-3">
                      <div className="flex gap-2 text-sm">
                        <Badge variant="outline">BTC分析</Badge>
                        <Badge variant="secondary">实时数据</Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="bg-muted/50 rounded-lg p-3">
                          <div className="text-sm text-muted-foreground mb-1">您的问题：</div>
                          <div className="text-sm">"现在适合买入比特币吗？"</div>
                        </div>
                        <div className="bg-primary/10 rounded-lg p-3">
                          <div className="text-sm text-muted-foreground mb-1">AI分析师：</div>
                          <div className="text-sm">基于当前技术指标，BTC RSI为68.5，接近超买区域。建议分批建仓，控制仓位...</div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* 支持的币种 */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl mb-4">支持50+主流加密货币</h2>
            <p className="text-muted-foreground">
              覆盖市值前100的主要币种，实时更新市场数据
            </p>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-6 max-w-4xl mx-auto">
            {[
              { symbol: "BTC", name: "Bitcoin", color: "bg-orange-500" },
              { symbol: "ETH", name: "Ethereum", color: "bg-blue-600" },
              { symbol: "BNB", name: "BNB", color: "bg-yellow-500" },
              { symbol: "SOL", name: "Solana", color: "bg-purple-500" },
              { symbol: "ADA", name: "Cardano", color: "bg-blue-500" },
              { symbol: "AVAX", name: "Avalanche", color: "bg-red-500" },
              { symbol: "DOT", name: "Polkadot", color: "bg-pink-500" },
              { symbol: "MATIC", name: "Polygon", color: "bg-purple-600" },
            ].map((coin, index) => (
              <div key={coin.symbol} className="flex items-center gap-2 p-3 rounded-lg bg-background/80 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-colors">
                <div className={`w-8 h-8 ${coin.color} rounded-full flex items-center justify-center`}>
                  <span className="text-white text-xs font-medium">{coin.symbol.substring(0, 2)}</span>
                </div>
                <div className="text-sm">
                  <div className="font-medium">{coin.symbol}</div>
                  <div className="text-xs text-muted-foreground">{coin.name}</div>
                </div>
              </div>
            ))}
            <div className="flex items-center gap-2 p-3 rounded-lg bg-primary/10 border border-primary/20">
              <div className="text-primary font-medium">+42 更多币种</div>
            </div>
          </div>
        </div>
      </section>

      {/* 产品优势对比 */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl mb-4">为什么选择 3x3？</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              与传统分析工具相比，我们提供更智能、更直观的投资分析体验
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="p-6 text-center">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="text-lg mb-2 text-muted-foreground">传统工具</h3>
                <ul className="text-sm text-muted-foreground space-y-2 text-left">
                  <li>• 复杂的技术图表</li>
                  <li>• 需要专业知识</li>
                  <li>• 静态数据展示</li>
                  <li>• 缺乏个性化建议</li>
                </ul>
              </Card>

              <Card className="p-6 text-center border-primary shadow-lg scale-105">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Brain className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="text-lg mb-2 text-primary">AI驱动的智能分析平台</h3>
                <ul className="text-sm space-y-2 text-left">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>自然语言对话</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>AI智能分析</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>实时数据更新</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>个性化投资建议</span>
                  </li>
                </ul>
                <Badge className="mt-4">推荐选择</Badge>
              </Card>

              <Card className="p-6 text-center">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Users className="h-6 w-6 text-gray-600" />
                </div>
                <h3 className="text-lg mb-2 text-muted-foreground">人工分析师</h3>
                <ul className="text-sm text-muted-foreground space-y-2 text-left">
                  <li>• 服务成本高昂</li>
                  <li>• 响应时间较长</li>
                  <li>• 受主观情绪影响</li>
                  <li>• 服务时间受限</li>
                </ul>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* 用户反馈 */}
      <section className="py-20 bg-muted/30" id="testimonials">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl mb-4">用户怎么说</h2>
            <p className="text-xl text-muted-foreground">
              来自真实用户的反馈
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6">
                <CardContent className="p-0">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-500 fill-current" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    "{testimonial.content}"
                  </p>
                  <div>
                    <div className="font-medium">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl mb-6">
              准备开始您的
              <span className="text-primary"> 智能投资</span> 之旅？
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              立即加入3x3，让AI助手帮您在加密货币市场中做出更明智的决策
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={onEnterApp}
                className="text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all"
              >
                立即开始免费体验
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="text-lg px-8 py-6"
              >
                了解更多功能
              </Button>
            </div>

            <div className="flex items-center justify-center gap-6 mt-12 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>免费使用</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>实时数据</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>专业分析</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/30">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* 品牌信息 */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <Image src="/logo.svg" alt="3x3 Logo" width={65} height={30} priority className="w-[65px] h-[30px]" />
              </div>
              <p className="text-muted-foreground mb-4 max-w-md">
                专业的加密货币分析平台，通过AI驱动的对话式分析，让复杂的市场数据变得简单易懂，助您在加密市场中做出明智决策。
              </p>
              <div className="flex gap-4">
                <Button variant="outline" size="sm" onClick={onEnterApp}>
                  开始使用
                </Button>
                <Button variant="ghost" size="sm">
                  了解更多
                </Button>
              </div>
            </div>

            {/* 产品功能 */}
            <div>
              <h4 className="font-medium mb-4">产品功能</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">AI智能分析</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">实时数据监控</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">风险评估</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">投资建议</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">市场情绪分析</a></li>
              </ul>
            </div>

            {/* 帮助支持 */}
            <div>
              <h4 className="font-medium mb-4">帮助支持</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">使用指南</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">常见问题</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">API文档</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">联系客服</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">意见反馈</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-sm text-muted-foreground">
                &copy; 2026 3x3. 保留所有权利。
              </div>

              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <a href="#" className="hover:text-foreground transition-colors">隐私政策</a>
                <a href="#" className="hover:text-foreground transition-colors">服务条款</a>
                <a href="#" className="hover:text-foreground transition-colors">Cookie政策</a>
              </div>
            </div>

            <div className="mt-4 text-center">
              <p className="text-xs text-muted-foreground">
                ⚠️ 加密货币投资有风险，请理性投资。3x3提供的分析仅供参考，不构成投资建议。
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}