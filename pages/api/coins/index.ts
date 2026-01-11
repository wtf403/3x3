// Next.js API Route: 获取所有支持的加密货币列表
import type { NextApiRequest, NextApiResponse } from 'next'

export interface CryptoData {
  id: string
  symbol: string
  name: string
  current_price: number
  price_change_percentage_24h: number
  market_cap: number
  market_cap_rank: number
  total_volume: number
  circulating_supply: number
  max_supply: number | null
  ath: number
  ath_change_percentage: number
  last_updated: string
}

export interface ApiResponse {
  success: boolean
  data?: CryptoData[]
  error?: string
  timestamp: string
}

// 模拟的加密货币数据 - 生产环境应该从CoinGecko等API获取
const mockCryptoData: CryptoData[] = [
  {
    id: 'bitcoin',
    symbol: 'btc',
    name: 'Bitcoin',
    current_price: 46300,
    price_change_percentage_24h: 2.4,
    market_cap: 905200000000,
    market_cap_rank: 1,
    total_volume: 28500000000,
    circulating_supply: 19500000,
    max_supply: 21000000,
    ath: 69045,
    ath_change_percentage: -32.9,
    last_updated: new Date().toISOString()
  },
  {
    id: 'ethereum',
    symbol: 'eth',
    name: 'Ethereum',
    current_price: 2890,
    price_change_percentage_24h: 1.8,
    market_cap: 347500000000,
    market_cap_rank: 2,
    total_volume: 15200000000,
    circulating_supply: 120280000,
    max_supply: null,
    ath: 4878,
    ath_change_percentage: -40.7,
    last_updated: new Date().toISOString()
  },
  {
    id: 'solana',
    symbol: 'sol',
    name: 'Solana',
    current_price: 125.40,
    price_change_percentage_24h: 5.2,
    market_cap: 58900000000,
    market_cap_rank: 5,
    total_volume: 3200000000,
    circulating_supply: 469500000,
    max_supply: null,
    ath: 260.06,
    ath_change_percentage: -51.8,
    last_updated: new Date().toISOString()
  },
  {
    id: 'binancecoin',
    symbol: 'bnb',
    name: 'BNB',
    current_price: 635.80,
    price_change_percentage_24h: -1.2,
    market_cap: 92100000000,
    market_cap_rank: 4,
    total_volume: 1800000000,
    circulating_supply: 144800000,
    max_supply: 200000000,
    ath: 686.31,
    ath_change_percentage: -7.4,
    last_updated: new Date().toISOString()
  },
  {
    id: 'cardano',
    symbol: 'ada',
    name: 'Cardano',
    current_price: 1.05,
    price_change_percentage_24h: 3.7,
    market_cap: 37200000000,
    market_cap_rank: 8,
    total_volume: 890000000,
    circulating_supply: 35400000000,
    max_supply: 45000000000,
    ath: 3.10,
    ath_change_percentage: -66.1,
    last_updated: new Date().toISOString()
  },
  {
    id: 'avalanche-2',
    symbol: 'avax',
    name: 'Avalanche',
    current_price: 42.30,
    price_change_percentage_24h: 8.1,
    market_cap: 17800000000,
    market_cap_rank: 12,
    total_volume: 720000000,
    circulating_supply: 420700000,
    max_supply: 720000000,
    ath: 146.22,
    ath_change_percentage: -71.1,
    last_updated: new Date().toISOString()
  }
]

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
      const { limit, page, sort } = req.query
      
      let data = [...mockCryptoData]
      
      // 排序逻辑
      if (sort === 'market_cap') {
        data.sort((a, b) => b.market_cap - a.market_cap)
      } else if (sort === 'price_change') {
        data.sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h)
      } else if (sort === 'volume') {
        data.sort((a, b) => b.total_volume - a.total_volume)
      }
      
      // 分页逻辑
      const pageNum = parseInt(page as string) || 1
      const limitNum = parseInt(limit as string) || 50
      const startIndex = (pageNum - 1) * limitNum
      const endIndex = startIndex + limitNum
      
      data = data.slice(startIndex, endIndex)
      
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