import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const mockPriceData = [
  { time: "00:00", price: 42500, volume: 1200000 },
  { time: "04:00", price: 43200, volume: 1350000 },
  { time: "08:00", price: 41800, volume: 980000 },
  { time: "12:00", price: 44100, volume: 1580000 },
  { time: "16:00", price: 45200, volume: 1750000 },
  { time: "20:00", price: 44800, volume: 1420000 },
  { time: "24:00", price: 46300, volume: 1680000 },
]

export default function PriceChart() {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>价格走势</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={mockPriceData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip 
              formatter={(value, name) => [
                name === "price" ? `$${value.toLocaleString()}` : value.toLocaleString(),
