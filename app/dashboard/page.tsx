"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"
import { ArrowUpRight, ArrowDownRight } from "lucide-react"

// Mock data for the dashboard
const marketData = [
  { name: "SHIB", value: 30, profit: 27000, change: 7.2 },
  { name: "DOGS", value: 30, profit: 25000, change: -2.5 },
  { name: "BTC", value: 20, profit: 18000, change: 3.8 },
  { name: "ETH", value: 20, profit: 17000, change: 1.2 },
]

const COLORS = ["#FFD700", "#D4AF37", "#B8860B", "#DAA520"]

export default function Dashboard() {
  const [totalProfit, setTotalProfit] = useState(90123.45)
  const [currentAlgo, setCurrentAlgo] = useState("Midas X")

  // Simulate profit increasing in real-time
  useEffect(() => {
    const interval = setInterval(() => {
      setTotalProfit((prev) => prev + Math.random() * 10)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-6 max-w-4xl">
        <div className="relative mb-6">
          <h1 className="text-2xl font-bold mb-2">Dashboard</h1>
          <p className="text-gray-400">
            Current algorithm: <span className="text-gold">{currentAlgo}</span>
          </p>
          <div className="absolute -right-4 -top-4 opacity-5 text-gold">
            <span className="text-9xl font-bold">4-17</span>
          </div>
        </div>

        {/* Profit Tracker */}
        <div className="gold-card mb-6 relative">
          <h2 className="text-lg font-medium mb-2">Total Profit</h2>
          <div className="flex items-end">
            <span className="text-4xl font-mono font-bold text-gold">
              ${totalProfit.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
            <span className="ml-2 text-green-500 flex items-center text-sm">
              <ArrowUpRight size={16} className="mr-1" />
              9012.34%
            </span>
          </div>
          <p className="text-xs text-gray-400 mt-1">10% daily royalty sent to meta2graei@gmail.com</p>
        </div>

        {/* Market Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {marketData.map((market) => (
            <div key={market.name} className="dark-card">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{market.name}</h3>
                  <p className="text-2xl font-mono font-bold text-gold mt-1">${market.profit.toLocaleString()}</p>
                </div>
                <div className={`flex items-center ${market.change >= 0 ? "text-green-500" : "text-red-500"}`}>
                  {market.change >= 0 ? (
                    <ArrowUpRight size={16} className="mr-1" />
                  ) : (
                    <ArrowDownRight size={16} className="mr-1" />
                  )}
                  <span>{Math.abs(market.change)}%</span>
                </div>
              </div>
              <div className="mt-2 h-1 bg-dark-light rounded-full overflow-hidden">
                <div className="h-full bg-gold" style={{ width: `${market.value}%` }}></div>
              </div>
              <p className="text-xs text-gray-400 mt-1">{market.value}% allocation</p>
            </div>
          ))}
        </div>

        {/* Allocation Chart */}
        <div className="gold-card">
          <h2 className="text-lg font-medium mb-4">Portfolio Allocation</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={marketData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={2}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {marketData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => [`${value}%`, "Allocation"]}
                  contentStyle={{
                    backgroundColor: "#1E1E1E",
                    borderColor: "#FFD700",
                    color: "white",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </main>
    </>
  )
}
