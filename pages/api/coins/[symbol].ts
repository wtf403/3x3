// Next.js API Route: 获取特定币种的详细数据
import type { NextApiRequest, NextApiResponse } from 'next'

export interface DetailedCryptoData {
  id: string
  symbol: string
  name: string
  current_price: number
  price_change_percentage_24h: number
  price_change_percentage_7d: number
  price_change_percentage_30d: number
  market_cap: number
  market_cap_rank: number
  total_volume: number
  circulating_supply: number
  max_supply: number | null
  ath: number
  ath_change_percentage: number
  atl: number
  atl_change_percentage: number
  last_updated: string
  
  // 技术指标
  technical_indicators: {
    rsi: number
    macd: {
      macd: number
      signal: number
      histogram: number
      trend: 'bullish' | 'bearish' | 'neutral'
    }
    bollinger_bands: {
      upper: number
      middle: number
      lower: number
      position: 'upper' | 'middle' | 'lower'
    }
    moving_averages: {
      ma_20: number
      ma_50: number
      ma_200: number
      trend: 'bullish' | 'bearish' | 'neutral'
    }
  }
  
  // 市场情绪
  market_sentiment: {
    fear_greed_index: number
    social_sentiment: string
    whale_activity: number
    exchange_inflow: number
    active_addresses: number
    network_growth: number
  }
  
  // 风险评估
  risk_assessment: {
    volatility_score: number
    liquidity_score: number
    market_risk: 'low' | 'medium' | 'high'
    technical_risk: 'low' | 'medium' | 'high'
    fundamental_risk: 'low' | 'medium' | 'high'
    overall_risk: 'low' | 'medium' | 'high'
  }
  
  // 价格预测
  price_prediction: {
    short_term: { // 1-7天
      trend: 'bullish' | 'bearish' | 'neutral'
      confidence: number
      target_high: number
      target_low: number
    }
    medium_term: { // 1-4周
      trend: 'bullish' | 'bearish' | 'neutral'
      confidence: number
      target_high: number
      target_low: number
    }
    long_term: { // 1-6个月
      trend: 'bullish' | 'bearish' | 'neutral'
      confidence: number
      target_high: number
      target_low: number
    }
  }
}

export interface ApiResponse {
  success: boolean
  data?: DetailedCryptoData
  error?: string
  timestamp: string
}

// 生成模拟的详细数据
function generateDetailedData(symbol: string): DetailedCryptoData | null {
  const baseData = {
    'btc': {
      id: 'bitcoin',
      symbol: 'btc',
      name: 'Bitcoin',
      current_price: 46300,
      price_change_percentage_24h: 2.4,
      price_change_percentage_7d: 12.5,
      price_change_percentage_30d: 145.2,
      market_cap: 905200000000,
      market_cap_rank: 1,
      total_volume: 28500000000,
      circulating_supply: 19500000,
      max_supply: 21000000,
      ath: 69045,
      ath_change_percentage: -32.9,
      atl: 67.81,
      atl_change_percentage: 68210.2,
    },
    'eth': {
      id: 'ethereum',
      symbol: 'eth',
      name: 'Ethereum',
      current_price: 2890,
      price_change_percentage_24h: 1.8,
      price_change_percentage_7d: 8.3,
      price_change_percentage_30d: 67.4,
      market_cap: 347500000000,
      market_cap_rank: 2,
      total_volume: 15200000000,
      circulating_supply: 120280000,
      max_supply: null,
      ath: 4878,
      ath_change_percentage: -40.7,
      atl: 0.432979,
      atl_change_percentage: 667645.1,
    },
    'sol': {
      id: 'solana',
      symbol: 'sol',
      name: 'Solana',
      current_price: 125.40,
      price_change_percentage_24h: 5.2,
      price_change_percentage_7d: 15.8,
      price_change_percentage_30d: 89.3,
      market_cap: 58900000000,
      market_cap_rank: 5,
      total_volume: 3200000000,
      circulating_supply: 469500000,
      max_supply: null,
      ath: 260.06,
      ath_change_percentage: -51.8,
      atl: 0.500801,
      atl_change_percentage: 25040.2,
    }
  }
  
  const base = baseData[symbol as keyof typeof baseData]
  if (!base) return null
  
  return {
    ...base,
    last_updated: new Date().toISOString(),
    
    technical_indicators: {
      rsi: 68.5,
      macd: {
        macd: 1250.5,
        signal: 1180.3,
        histogram: 70.2,
        trend: 'bullish'
      },
      bollinger_bands: {
        upper: 48000,
        middle: 45500,
        lower: 43000,
        position: 'upper'
      },
      moving_averages: {
        ma_20: 44200,
        ma_50: 42800,
        ma_200: 38500,
        trend: 'bullish'
      }
    },
    
    market_sentiment: {
      fear_greed_index: 65,
      social_sentiment: 'optimistic',
      whale_activity: 8.2,
      exchange_inflow: -15.3,
      active_addresses: 1200000,
      network_growth: 12.8
    },
    
    risk_assessment: {
      volatility_score: 75,
      liquidity_score: 95,
      market_risk: 'medium',
      technical_risk: 'medium',
      fundamental_risk: 'low',
      overall_risk: 'medium'
    },
    
    price_prediction: {
      short_term: {
        trend: 'bullish',
        confidence: 72,
        target_high: 50000,
        target_low: 42000
      },
      medium_term: {
        trend: 'bullish',
        confidence: 68,
        target_high: 55000,
        target_low: 38000
      },
      long_term: {
        trend: 'neutral',
        confidence: 45,
        target_high: 75000,
        target_low: 30000
      }
    }
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  // 设置CORS头
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')

  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  try {
    if (req.method === 'GET') {
      const { symbol } = req.query
      
      if (!symbol || typeof symbol !== 'string') {
        return res.status(400).json({
          success: false,
          error: 'Symbol parameter is required',
          timestamp: new Date().toISOString()
        })
      }
      
      const data = generateDetailedData(symbol.toLowerCase())
      
      if (!data) {
        return res.status(404).json({
          success: false,
          error: 'Cryptocurrency not found',
          timestamp: new Date().toISOString()
        })
      }
      
      res.status(200).json({
        success: true,
        data,
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
    console.error('API Error:', error)
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      timestamp: new Date().toISOString()
    })
  }
}