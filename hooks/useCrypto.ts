// React Hooks for cryptocurrency data management
import { useState, useEffect, useCallback } from 'react'
import { cryptoService } from '../services/cryptoService'
import type { CryptoData } from '../pages/api/coins/index'
import type { DetailedCryptoData } from '../pages/api/coins/[symbol]'
import type { AnalysisRequest } from '../pages/api/ai/analyze'

/**
 * Hook for managing cryptocurrency list
 */
export function useCryptoList() {
  const [coins, setCoins] = useState<CryptoData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchCoins = useCallback(async (params?: {
    limit?: number
    page?: number
    sort?: 'market_cap' | 'price_change' | 'volume'
  }) => {
    try {
      setLoading(true)
      setError(null)
      const data = await cryptoService.getAllCoins(params)
      setCoins(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch coins')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchCoins()
  }, [fetchCoins])

  return {
    coins,
    loading,
    error,
    refetch: fetchCoins
  }
}

/**
 * Hook for managing individual coin details
 */
export function useCoinDetails(symbol: string) {
  const [coinData, setCoinData] = useState<DetailedCryptoData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchCoinDetails = useCallback(async () => {
    if (!symbol) return

    try {
      setLoading(true)
      setError(null)
      const data = await cryptoService.getCoinDetailsWithCache(symbol)
      setCoinData(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch coin details')
    } finally {
      setLoading(false)
    }
  }, [symbol])

  useEffect(() => {
    fetchCoinDetails()
  }, [fetchCoinDetails])

  return {
    coinData,
    loading,
    error,
    refetch: fetchCoinDetails
  }
}

/**
 * Hook for AI analysis
 */
export function useAIAnalysis() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const getAnalysis = useCallback(async (request: AnalysisRequest) => {
    try {
      setLoading(true)
      setError(null)
      const result = await cryptoService.getAIAnalysis(request)
      return result
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to get AI analysis'
      setError(errorMessage)
      throw new Error(errorMessage)
    } finally {
      setLoading(false)
    }
  }, [])

  return {
    getAnalysis,
    loading,
    error
  }
}

/**
 * Hook for coin search functionality
 */
export function useCoinSearch() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<CryptoData[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const search = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([])
      return
    }

    try {
      setLoading(true)
      setError(null)
      const data = await cryptoService.searchCoins(searchQuery)
      setResults(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Search failed')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      search(query)
    }, 300) // 防抖延迟

    return () => clearTimeout(timeoutId)
  }, [query, search])

  return {
    query,
    setQuery,
    results,
    loading,
    error,
    search
  }
}

/**
 * Hook for trending coins
 */
export function useTrendingCoins(limit: number = 6) {
  const [trendingCoins, setTrendingCoins] = useState<CryptoData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchTrendingCoins = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await cryptoService.getTrendingCoins(limit)
      setTrendingCoins(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch trending coins')
    } finally {
      setLoading(false)
    }
  }, [limit])

  useEffect(() => {
    fetchTrendingCoins()
  }, [fetchTrendingCoins])

  return {
    trendingCoins,
    loading,
    error,
    refetch: fetchTrendingCoins
  }
}

/**
 * Hook for real-time price updates
 */
export function useRealTimePrice(symbol: string, interval: number = 30000) {
  const [price, setPrice] = useState<number | null>(null)
  const [change, setChange] = useState<number | null>(null)
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null)

  useEffect(() => {
    if (!symbol) return

    const updatePrice = async () => {
      try {
        const data = await cryptoService.getCoinDetails(symbol)
        setPrice(data.current_price)
        setChange(data.price_change_percentage_24h)
        setLastUpdate(new Date())
      } catch (err) {
        console.error('Failed to update price:', err)
      }
    }

    // 立即执行一次
    updatePrice()

    // 设置定时更新
    const intervalId = setInterval(updatePrice, interval)

    return () => clearInterval(intervalId)
  }, [symbol, interval])

  return {
    price,
    change,
    lastUpdate,
    formattedPrice: price ? cryptoService.formatPrice(price) : null,
    formattedChange: change ? cryptoService.formatPercentageChange(change) : null,
    changeType: change ? cryptoService.getPriceChangeType(change) : null
  }
}

/**
 * Hook for managing watchlist
 */
export function useWatchlist() {
  const [watchlist, setWatchlist] = useState<string[]>([])

  useEffect(() => {
    // 从localStorage加载watchlist
    const saved = localStorage.getItem('crypto-watchlist')
    if (saved) {
      try {
        setWatchlist(JSON.parse(saved))
      } catch (err) {
        console.error('Failed to parse watchlist:', err)
      }
    }
  }, [])

  const addToWatchlist = useCallback((symbol: string) => {
    setWatchlist(prev => {
      const updated = [...prev, symbol.toLowerCase()]
      localStorage.setItem('crypto-watchlist', JSON.stringify(updated))
      return updated
    })
  }, [])

  const removeFromWatchlist = useCallback((symbol: string) => {
    setWatchlist(prev => {
      const updated = prev.filter(s => s !== symbol.toLowerCase())
      localStorage.setItem('crypto-watchlist', JSON.stringify(updated))
      return updated
    })
  }, [])

  const isInWatchlist = useCallback((symbol: string) => {
    return watchlist.includes(symbol.toLowerCase())
  }, [watchlist])

  return {
    watchlist,
    addToWatchlist,
    removeFromWatchlist,
    isInWatchlist
  }
}

/**
 * Hook for price alerts
 */
export function usePriceAlerts() {
  const [alerts, setAlerts] = useState<Array<{
    id: string
    symbol: string
    targetPrice: number
    condition: 'above' | 'below'
    isActive: boolean
    createdAt: Date
  }>>([])

  useEffect(() => {
    // 从localStorage加载alerts
    const saved = localStorage.getItem('crypto-alerts')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        setAlerts(parsed.map((alert: any) => ({
          ...alert,
          createdAt: new Date(alert.createdAt)
        })))
      } catch (err) {
        console.error('Failed to parse alerts:', err)
      }
    }
  }, [])

  const addAlert = useCallback((
    symbol: string,
    targetPrice: number,
    condition: 'above' | 'below'
  ) => {
    const newAlert = {
      id: Date.now().toString(),
      symbol: symbol.toLowerCase(),
      targetPrice,
      condition,
      isActive: true,
      createdAt: new Date()
    }

    setAlerts(prev => {
      const updated = [...prev, newAlert]
      localStorage.setItem('crypto-alerts', JSON.stringify(updated))
      return updated
    })
  }, [])

  const removeAlert = useCallback((id: string) => {
    setAlerts(prev => {
      const updated = prev.filter(alert => alert.id !== id)
      localStorage.setItem('crypto-alerts', JSON.stringify(updated))
      return updated
    })
  }, [])

  const toggleAlert = useCallback((id: string) => {
    setAlerts(prev => {
      const updated = prev.map(alert =>
        alert.id === id ? { ...alert, isActive: !alert.isActive } : alert
      )
      localStorage.setItem('crypto-alerts', JSON.stringify(updated))
      return updated
    })
  }, [])

  return {
    alerts,
    addAlert,
    removeAlert,
    toggleAlert
  }
}