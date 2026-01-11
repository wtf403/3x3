// 应用常量定义
export const API_ENDPOINTS = {
  COINS: '/api/coins',
  COIN_DETAILS: '/api/coins',
  AI_ANALYZE: '/api/ai/analyze',
  EXTERNAL: {
    COINGECKO: 'https://api.coingecko.com/api/v3',
    COINMARKETCAP: 'https://pro-api.coinmarketcap.com/v1'
  }
} as const

export const CACHE_KEYS = {
  COIN_LIST: 'coin_list',
  COIN_DETAILS: (symbol: string) => `coin_details_${symbol}`,
  TRENDING_COINS: 'trending_coins',
  MARKET_DATA: 'market_data'
} as const

export const CACHE_DURATION = {
  COIN_LIST: 5 * 60 * 1000, // 5分钟
  COIN_DETAILS: 2 * 60 * 1000, // 2分钟
  TRENDING_COINS: 10 * 60 * 1000, // 10分钟
  MARKET_DATA: 30 * 1000 // 30秒
} as const

export const SUPPORTED_COINS = [
  {
    id: 'bitcoin',
    symbol: 'btc',
    name: 'Bitcoin',
    coingecko_id: 'bitcoin'
  },
  {
    id: 'ethereum', 
    symbol: 'eth',
    name: 'Ethereum',
    coingecko_id: 'ethereum'
  },
  {
    id: 'solana',
    symbol: 'sol', 
    name: 'Solana',
    coingecko_id: 'solana'
  },
  {
    id: 'binancecoin',
    symbol: 'bnb',
    name: 'BNB',
    coingecko_id: 'binancecoin'
  },
  {
    id: 'cardano',
    symbol: 'ada',
    name: 'Cardano', 
    coingecko_id: 'cardano'
  },
  {
    id: 'avalanche-2',
    symbol: 'avax',
    name: 'Avalanche',
    coingecko_id: 'avalanche-2'
  },
  {
    id: 'polkadot',
    symbol: 'dot',
    name: 'Polkadot',
    coingecko_id: 'polkadot'
  },
  {
    id: 'polygon',
    symbol: 'matic',
    name: 'Polygon',
    coingecko_id: 'matic-network'
  },
  {
    id: 'chainlink',
    symbol: 'link',
    name: 'Chainlink',
    coingecko_id: 'chainlink'
  },
  {
    id: 'litecoin',
    symbol: 'ltc',
    name: 'Litecoin',
    coingecko_id: 'litecoin'
  }
] as const

export const TECHNICAL_INDICATORS = {
  RSI: {
    OVERSOLD: 30,
    NEUTRAL_LOW: 40,
    NEUTRAL_HIGH: 60,
    OVERBOUGHT: 70
  },
  FEAR_GREED: {
    EXTREME_FEAR: 25,
    FEAR: 45,
    NEUTRAL: 55,
    GREED: 75,
    EXTREME_GREED: 100
  }
} as const

export const RISK_LEVELS = {
  LOW: 'low',
  MEDIUM: 'medium', 
  HIGH: 'high'
} as const

export const TREND_TYPES = {
  BULLISH: 'bullish',
  BEARISH: 'bearish',
  NEUTRAL: 'neutral'
} as const

export const ANALYSIS_TYPES = {
  PRICE: 'price',
  MARKET: 'market',
  RISK: 'risk',
  INSIGHT: 'insight',
  TECHNICAL: 'technical'
} as const

export const UI_CONSTANTS = {
  SIDEBAR_WIDTH: 320,
  MOBILE_BREAKPOINT: 768,
  ANIMATION_DURATION: 300,
  DEBOUNCE_DELAY: 300,
  REFRESH_INTERVAL: 30000, // 30秒
  CHART_COLORS: [
    '#3b82f6', // blue-500
    '#10b981', // emerald-500
    '#f59e0b', // amber-500
    '#ef4444', // red-500
    '#8b5cf6', // violet-500
    '#06b6d4', // cyan-500
    '#84cc16', // lime-500
    '#f97316'  // orange-500
  ]
} as const

export const ERROR_MESSAGES = {
  NETWORK_ERROR: '网络连接错误，请检查网络设置',
  API_ERROR: 'API服务暂时不可用，请稍后重试',
  RATE_LIMIT: '请求过于频繁，请稍后重试',
  INVALID_SYMBOL: '无效的币种符号',
  DATA_NOT_FOUND: '未找到相关数据',
  UNKNOWN_ERROR: '发生未知错误，请重试'
} as const

export const SUCCESS_MESSAGES = {
  DATA_LOADED: '数据加载成功',
  ANALYSIS_COMPLETE: 'AI分析完成',
  WATCHLIST_ADDED: '已添加到关注列表',
  WATCHLIST_REMOVED: '已从关注列表移除',
  ALERT_CREATED: '价格提醒创建成功'
} as const

export const DEFAULT_PAGINATION = {
  PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,
  DEFAULT_PAGE: 1
} as const

export const WEBSOCKET_CONFIG = {
  RECONNECT_INTERVAL: 5000,
  MAX_RECONNECT_ATTEMPTS: 10,
  HEARTBEAT_INTERVAL: 30000
} as const

// 环境变量默认值
export const ENV_DEFAULTS = {
  API_BASE_URL: typeof window !== 'undefined' ? window.location.origin : '',
  COINGECKO_API_KEY: '',
  COINMARKETCAP_API_KEY: '',
  RATE_LIMIT_ENABLED: true,
  CACHE_ENABLED: true,
  DEBUG_MODE: process.env.NODE_ENV === 'development'
} as const