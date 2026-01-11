// Next.js API Route: AI分析助手后端
import type { NextApiRequest, NextApiResponse } from 'next'

export interface AnalysisRequest {
  question: string
  coin_symbol: string
  context?: {
    current_price?: number
    price_change_24h?: number
    market_cap?: number
    volume_24h?: number
  }
}

export interface AnalysisResponse {
  success: boolean
  data?: {
    answer: string
    analysis_type: 'price' | 'market' | 'risk' | 'insight' | 'technical'
    confidence: number
    sources: string[]
    recommendations?: string[]
    warnings?: string[]
    charts_data?: any
  }
  error?: string
  timestamp: string
}

// AI分析逻辑 - 生产环境应该连接真实的AI服务
function generateAIAnalysis(request: AnalysisRequest): AnalysisResponse['data'] {
  const { question, coin_symbol, context } = request
  const lowerQuestion = question.toLowerCase()
  const coinName = getCoinName(coin_symbol)
  
  // 买入时机分析
  if (lowerQuestion.includes('买入') || lowerQuestion.includes('时机') || lowerQuestion.includes('购买')) {
    return {
      answer: `基于${coinName}的当前分析，我看到以下关键信号：\n\n📈 价格动态：当前价格 $${context?.current_price?.toLocaleString() || '46,300'} (${context?.price_change_24h || '+2.4'}%)\n📊 技术面分析：RSI 68.5，接近超买区域但趋势向上\n😤 市场情绪：恐慌贪婪指数65（贪婪状态）\n💰 资金流向：交易所净流入减少15.3%（积极信号）\n🐋 大户行为：持仓地址增加8.2%\n\n💡 投资建议：\n• ${coin_symbol.toUpperCase()}目前技术面偏强，但市场情绪已进入贪婪区域\n• 建议采用分批建仓策略，避免单点买入风险\n• 建议仓位控制在总投资组合的10-20%\n• 设置止损位在关键支撑位附近\n• 短期内需警惕获利回吐压力`,
      analysis_type: 'insight',
      confidence: 78,
      sources: ['技术指标分析', '市场情绪数据', '链上数据', '资金流向分析'],
      recommendations: [
        '分批建仓，降低平均成本',
        '设置止损位保护资金',
        '关注市场情绪变化',
        '控制仓位比例'
      ],
      warnings: [
        'RSI接近超买区域，短期可能回调',
        '市场情绪偏向贪婪，需谨慎对待'
      ]
    }
  }
  
  // 市场情绪分析
  if (lowerQuestion.includes('情绪') || lowerQuestion.includes('市场') || lowerQuestion.includes('氛围')) {
    return {
      answer: `${coinName}的市场情绪深度分析：\n\n😤 恐慌贪婪指数：65/100（贪婪状态）\n📱 社交媒体情绪：对${coin_symbol.toUpperCase()}整体偏向乐观\n💰 大户地址活动：活跃度增加 8.2%\n🔄 交易所资金流向：流入减少 15.3%（减少抛压）\n📈 长期持有者信心：持币地址数量稳步增加\n📊 期货市场：多空比例 1.8:1，多头占优\n\n📈 情绪指标解读：\n• 恐慌贪婪指数65表明市场情绪偏向乐观，但需警惕过度FOMO\n• 减少的交易所流入表明持有者惜售心理较强\n• 社交媒体讨论热度高，但需区分理性分析和情绪化言论\n• 大户增持行为显示机构信心较强\n\n⚠️ 风险提示：当前情绪水平已接近"贪婪"区间，历史上这个水平容易出现短期调整`,
      analysis_type: 'market',
      confidence: 82,
      sources: ['恐慌贪婪指数', '社交媒体监控', '链上数据分析', '期货市场数据'],
      recommendations: [
        '密切关注情绪指标变化',
        '避免FOMO情绪影响决策',
        '关注大户动向变化'
      ],
      warnings: [
        '当前情绪水平偏高，需谨慎对待',
        '社交媒体热度可能放大波动性'
      ]
    }
  }
  
  // 风险评估分析
  if (lowerQuestion.includes('风险') || lowerQuestion.includes('注意') || lowerQuestion.includes('危险')) {
    return {
      answer: `投资${coinName}的全面风险评估：\n\n⚠️ 技术层面风险：\n• RSI 68.5接近超买，短期回调概率较高\n• 价格接近前期阻力位，突破需要量能配合\n• 波动性指标显示近期波动可能加剧\n\n📉 市场层面风险：\n• 恐慌贪婪指数65，市场情绪偏热\n• 宏观经济不确定性，美联储政策影响流动性\n• 加密市场整体相关性较高，系统性风险存在\n\n🏛️ 监管层面风险：\n• 各国监管政策不确定性依然存在\n• 税收政策变化可能影响投资收益\n• 反洗钱法规趋严，合规成本上升\n\n⛽ ${coin_symbol.toUpperCase()}特有风险：\n• 网络拥堵可能影响用户体验\n• 竞争币种分流用户和资金\n• 核心开发团队集中度风险\n\n🛡️ 风险管理建议：\n• 仓位控制：建议不超过投资组合的15-20%\n• 止损设置：在关键支撑位设置止损\n• 分散投资：不要将所有资金投入单一币种\n• 定期评估：根据市场变化调整投资策略`,
      analysis_type: 'risk',
      confidence: 85,
      sources: ['技术分析', '宏观经济分析', '监管环境监控', '项目基本面分析'],
      recommendations: [
        '严格控制仓位比例',
        '设置多层次止损策略',
        '分散投资降低风险',
        '定期重新评估风险'
      ],
      warnings: [
        '当前多个风险指标偏高',
        '建议保守投资，避免过度杠杆',
        '密切关注监管政策变化'
      ]
    }
  }
  
  // 技术分析
  if (lowerQuestion.includes('技术') || lowerQuestion.includes('指标') || lowerQuestion.includes('图表')) {
    return {
      answer: `${coinName}技术分析综合报告：\n\n📊 关键技术指标：\n• RSI：68.5（接近超买区域）\n• MACD：金叉确认，上涨动能较强\n• 布林带：价格接近上轨，需要回踩确认\n• KDJ：K线83，D线76，短期超买\n\n🎯 关键价位分析：\n• 支撑位：$44,500（20日均线）/ $42,800（50日均线）\n• 阻力位：$48,000（前高）/ $50,000（心理关口）\n• 当前位置：接近阻力区间，需要突破确认\n\n📈 趋势分析：\n• 短期趋势：向上，但接近技术性调整区域\n• 中期趋势：多头格局，均线系统支撑良好\n• 长期趋势：牛市格局维持，大趋势向上\n\n📊 量能分析：\n• 成交量较前期放大，显示市场参与度提升\n• 量价配合良好，但需要持续量能支撑突破\n• 大额交易增加，机构参与度较高\n\n🎪 技术面结论：\n短期内${coin_symbol.toUpperCase()}处于强势上升趋势，但多个指标显示接近技术性调整区域。建议等待回踩确认或突破放量再做操作决策。`,
      analysis_type: 'technical',
      confidence: 88,
      sources: ['技术指标计算', '量价分析', '趋势线分析', '支撑阻力分析'],
      recommendations: [
        '等待技术性回调买入机会',
        '关注突破后的量能确认',
        '设置支撑位附近的买入计划'
      ],
      warnings: [
        '多个技术指标显示短期超买',
        '需要量能配合才能持续上涨'
      ]
    }
  }
  
  // 默认回复
  return {
    answer: `关于${coinName}的分析，我建议从以下几个维度来考虑：\n\n📊 技术面：当前趋势、关键支撑阻力位、技术指标信号\n📈 基本面：项目发展、生态建设、团队动态\n😤 市场面：投资者情绪、资金流向、大户行为\n⚠️ 风险面：技术风险、市场风险、监管风险\n\n你可以具体询问任何一个方面，我会为你提供详细的专业分析。比如：\n• "现在买入${coin_symbol.toUpperCase()}合适吗？"\n• "${coin_symbol.toUpperCase()}的技术指标怎么样？"\n• "投资${coin_symbol.toUpperCase()}有什么风险？"\n• "${coin_symbol.toUpperCase()}的市场情绪如何？"`,
    analysis_type: 'insight',
    confidence: 60,
    sources: ['综合市场数据'],
    recommendations: [
      '明确投资目标和风险承受能力',
      '多维度分析后再做决策',
      '保持理性投资心态'
    ]
  }
}

function getCoinName(symbol: string): string {
  const names: { [key: string]: string } = {
    'btc': 'Bitcoin',
    'eth': 'Ethereum',
    'sol': 'Solana',
    'bnb': 'BNB',
    'ada': 'Cardano',
    'avax': 'Avalanche'
  }
  return names[symbol.toLowerCase()] || symbol.toUpperCase()
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<AnalysisResponse>
) {
  // 设置CORS头
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')

  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  try {
    if (req.method === 'POST') {
      const request: AnalysisRequest = req.body
      
      if (!request.question || !request.coin_symbol) {
        return res.status(400).json({
          success: false,
          error: 'Question and coin_symbol are required',
          timestamp: new Date().toISOString()
        })
      }
      
      // 模拟AI处理时间
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const analysis = generateAIAnalysis(request)
      
      res.status(200).json({
        success: true,
        data: analysis,
        timestamp: new Date().toISOString()
      })
    } else {
      res.status(405).json({
        success: false,
        error: 'Method not allowed',
        timestamp: new Date().toISOString()
      })
    }
  } catch (error) {
    console.error('AI Analysis Error:', error)
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      timestamp: new Date().toISOString()
    })
  }
}