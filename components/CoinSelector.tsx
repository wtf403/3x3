import { useState } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Badge } from "./ui/badge"
import { Card, CardContent } from "./ui/card"
import { Search, TrendingUp, TrendingDown, Star } from "lucide-react"
import { ImageWithFallback } from "./figma/ImageWithFallback"

interface Coin {
  symbol: string
  name: string
  price: string
  change: string
  changeType: "positive" | "negative"
  marketCap: string
  rank: number
  logo?: string
}

interface CoinSelectorProps {
  selectedCoin: Coin
  onCoinSelect: (coin: Coin) => void
}

const popularCoins: Coin[] = [
  {
    symbol: "BTC",
    name: "Bitcoin",
    price: "$46,300",
    change: "+2.4%",
    changeType: "positive",
    marketCap: "$905.2B",
    rank: 1
  },
  {
    symbol: "ETH", 
    name: "Ethereum",
    price: "$2,890",
    change: "+1.8%",
    changeType: "positive",
    marketCap: "$347.5B",
    rank: 2
  },
  {
    symbol: "SOL",
    name: "Solana", 
    price: "$125.40",
    change: "+5.2%",
    changeType: "positive",
    marketCap: "$58.9B",
    rank: 5
  },
  {
    symbol: "BNB",
    name: "BNB",
    price: "$635.80",
    change: "-1.2%",
    changeType: "negative", 
    marketCap: "$92.1B",
    rank: 4
  },
  {
    symbol: "ADA",
    name: "Cardano",
    price: "$1.05",
    change: "+3.7%",
    changeType: "positive",
    marketCap: "$37.2B",
    rank: 8
  },
  {
    symbol: "AVAX",
    name: "Avalanche",
    price: "$42.30",
    change: "+8.1%",
    changeType: "positive",
    marketCap: "$17.8B",
    rank: 12
  }
]

export default function CoinSelector({ selectedCoin, onCoinSelect }: CoinSelectorProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredCoins, setFilteredCoins] = useState(popularCoins)

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    if (!query) {
      setFilteredCoins(popularCoins)
    } else {
      const filtered = popularCoins.filter(coin => 
        coin.name.toLowerCase().includes(query.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(query.toLowerCase())
      )
      setFilteredCoins(filtered)
    }
  }

  return (
    <div className="space-y-4">
      {/* 当前选中的币种 */}
      <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
              <span className="text-primary-foreground font-bold">
                {selectedCoin.symbol.substring(0, 2)}
              </span>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold">{selectedCoin.name}</h3>
                <Badge variant="outline" className="text-xs">
                  #{selectedCoin.rank}
                </Badge>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-lg font-bold">{selectedCoin.price}</span>
                <Badge variant={selectedCoin.changeType === 'positive' ? 'default' : 'destructive'}>
                  {selectedCoin.changeType === 'positive' ? 
                    <TrendingUp className="h-3 w-3 mr-1" /> : 
                    <TrendingDown className="h-3 w-3 mr-1" />
                  }
                  {selectedCoin.change}
                </Badge>
              </div>
            </div>
          </div>
          
          <div className="mt-3 pt-3 border-t border-primary/20">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">市值</span>
              <span className="font-medium">{selectedCoin.marketCap}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 搜索框 */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="搜索币种..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* 热门币种列表 */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-medium text-sm">热门币种</h4>
          <Button variant="ghost" size="sm" className="text-xs">
            查看全部
          </Button>
        </div>
        
        <div className="space-y-2">
          {filteredCoins.map((coin) => (
            <Card 
              key={coin.symbol}
              className={`cursor-pointer transition-all hover:shadow-md ${
                selectedCoin.symbol === coin.symbol ? 'ring-2 ring-primary bg-primary/5' : ''
              }`}
              onClick={() => onCoinSelect(coin)}
            >
              <CardContent className="p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                      <span className="text-xs font-medium">
                        {coin.symbol.substring(0, 2)}
                      </span>
                    </div>
                    <div>
                      <div className="font-medium text-sm">{coin.symbol}</div>
                      <div className="text-xs text-muted-foreground">{coin.name}</div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="font-medium text-sm">{coin.price}</div>
                    <div className={`text-xs flex items-center ${
                      coin.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {coin.changeType === 'positive' ? 
                        <TrendingUp className="h-3 w-3 mr-1" /> : 
                        <TrendingDown className="h-3 w-3 mr-1" />
                      }
                      {coin.change}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* 提示信息 */}
      <Card className="bg-muted/50">
        <CardContent className="p-3">
          <div className="flex items-start gap-2">
            <Star className="h-4 w-4 text-yellow-500 mt-0.5" />
            <div className="text-xs text-muted-foreground">
              <p className="font-medium mb-1">智能分析助手</p>
              <p>选择任意币种开始对话分析，AI会基于实时数据为你提供专业洞察。</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}