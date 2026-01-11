// 加密货币数据服务层
import type { CryptoData, ApiResponse } from '../pages/api/coins/index'
import type { DetailedCryptoData } from '../pages/api/coins/[symbol]'
import type { AnalysisRequest, AnalysisResponse } from '../pages/api/ai/analyze'

export class CryptoService {
  private baseUrl: string
  
  constructor(baseUrl?: string) {
    this.baseUrl = baseUrl || (typeof window !== 'undefined' ? window.location.origin : '')
  }
  
  /**
   * 获取所有支持的加密货币列表
   */
  async getAllCoins(params?: {
    limit?: number
    page?: number
    sort?: 'market_cap' | 'price_change' | 'volume'
  }): Promise<CryptoData[]> {
    try {
      const searchParams = new URLSearchParams()
      if (params?.limit) searchParams.append('limit', params.limit.toString())
      if (params?.page) searchParams.append('page', params.page.toString())
      if (params?.sort) searchParams.append('sort', params.sort)
      
      const response = await fetch(`${this.baseUrl}/api/coins?${searchParams.toString()}`)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const result: ApiResponse = await response.json()
      
      if (!result.success) {
        throw new Error(result.error || 'Failed to fetch crypto data')
      }
      
      return result.data || []
    } catch (error) {
      console.error('Error fetching all coins:', error)
      throw error
    }
  }
  
  /**
   * 获取特定币种的详细数据
   */
  async getCoinDetails(symbol: string): Promise<DetailedCryptoData> {
    try {
      const response = await fetch(`${this.baseUrl}/api/coins/${symbol.toLowerCase()}`)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const result = await response.json()
      
      if (!result.success) {
        throw new Error(result.error || 'Failed to fetch coin details')
      }
      
      return result.data
    } catch (error) {
      console.error(`Error fetching details for ${symbol}:`, error)
      throw error
    }
  }
  
  /**
   * 调用AI分析服务
   */
  async getAIAnalysis(request: AnalysisRequest): Promise<AnalysisResponse['data']> {
    try {
      const response = await fetch(`${this.baseUrl}/api/ai/analyze`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request)
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const result: AnalysisResponse = await response.json()
      
      if (!result.success) {
        throw new Error(result.error || 'Failed to get AI analysis')
      }
      
      return result.data!
    } catch (error) {
      console.error('Error getting AI analysis:', error)
      throw error
    }
  }
  
  /**
   * 搜索币种
   */
  async searchCoins(query: string): Promise<CryptoData[]> {
    try {
      const allCoins = await this.getAllCoins({ limit: 100 })
      return allCoins.filter(coin => 
        coin.name.toLowerCase().includes(query.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(query.toLowerCase())
      )
    } catch (error) {
      console.error('Error searching coins:', error)
      throw error
    }
  }
  
  /**
   * 获取热门币种
   */
  async getTrendingCoins(limit: number = 6): Promise<CryptoData[]> {
    try {
      return await this.getAllCoins({ 
        limit, 
        sort: 'price_change' 
      })
    } catch (error) {
      console.error('Error fetching trending coins:', error)
      throw error
    }
  }
  
  /**
   * 格式化价格显示
   */
  formatPrice(price: number): string {
    if (price >= 1000) {
      return `$${price.toLocaleString('en-US', { maximumFractionDigits: 0 })}`
    } else if (price >= 1) {
      return `$${price.toLocaleString('en-US', { maximumFractionDigits: 2 })}`
    } else {
      return `$${price.toFixed(6)}`
    }
  }
  
  /**
   * 格式化市值显示
   */
  formatMarketCap(marketCap: number): string {
    if (marketCap >= 1e12) {
      return `$${(marketCap / 1e12).toFixed(1)}T`
    } else if (marketCap >= 1e9) {
      return `$${(marketCap / 1e9).toFixed(1)}B`
    } else if (marketCap >= 1e6) {
      return `$${(marketCap / 1e6).toFixed(1)}M`
    } else {
      return `$${marketCap.toLocaleString()}`
    }
  }
  
  /**
   * 格式化百分比变化
   */
  formatPercentageChange(change: number): string {
    const sign = change >= 0 ? '+' : ''
    return `${sign}${change.toFixed(2)}%`
  }
  
  /**
   * 判断价格变化类型
   */
  getPriceChangeType(change: number): 'positive' | 'negative' {
    return change >= 0 ? 'positive' : 'negative'
  }
  
  /**
   * 缓存管理
   */
  private cache = new Map<string, { data: any; timestamp: number }>()
  private cacheTimeout = 60000 // 1分钟缓存
  
  private getCachedData<T>(key: string): T | null {
    const cached = this.cache.get(key)
    if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
      return cached.data as T
    }
    return null
  }
  
  private setCachedData<T>(key: string, data: T): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now()
    })
  }
  
  /**
   * 带缓存的获取币种详情
   */
  async getCoinDetailsWithCache(symbol: string): Promise<DetailedCryptoData> {
    const cacheKey = `coin-details-${symbol.toLowerCase()}`
    const cached = this.getCachedData<DetailedCryptoData>(cacheKey)
    
    if (cached) {
      return cached
    }
    
    const data = await this.getCoinDetails(symbol)
    this.setCachedData(cacheKey, data)
    return data
  }
}

// 创建全局实例
export const cryptoService = new CryptoService()

// 工具函数
export const cryptoUtils = {
  /**
   * 获取风险等级颜色
   */
  getRiskLevelColor(risk: 'low' | 'medium' | 'high'): string {
    const colors = {
      low: 'text-green-600',
      medium: 'text-yellow-600',
      high: 'text-red-600'
    }
    return colors[risk]
  },
  
  /**
   * 获取趋势指示器
   */
  getTrendIndicator(trend: 'bullish' | 'bearish' | 'neutral'): {
    icon: string
    color: string
    label: string
  } {
    const indicators = {
      bullish: { icon: '📈', color: 'text-green-600', label: '看涨' },
      bearish: { icon: '📉', color: 'text-red-600', label: '看跌' },
      neutral: { icon: '➡️', color: 'text-gray-600', label: '中性' }
    }
    return indicators[trend]
  },
  
  /**
   * 获取情绪等级
   */
  getSentimentLevel(score: number): {
    level: string
    color: string
    description: string
  } {
    if (score >= 75) {
      return { level: '极度贪婪', color: 'text-red-600', description: '市场过热' }
    } else if (score >= 55) {
      return { level: '贪婪', color: 'text-orange-600', description: '乐观情绪' }
    } else if (score >= 45) {
      return { level: '中性', color: 'text-gray-600', description: '平衡状态' }
    } else if (score >= 25) {
      return { level: '恐慌', color: 'text-yellow-600', description: '谨慎情绪' }
    } else {
      return { level: '极度恐慌', color: 'text-green-600', description: '抄底机会' }
    }
  }
}