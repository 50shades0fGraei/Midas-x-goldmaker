"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

// Algo data for the simulator
const algos = [
  { id: "midas1", name: "Midas 1", roi: 4.5, markets: ["SHIB"] },
  { id: "midas2", name: "Midas 2", roi: 10, markets: ["SHIB", "DOGS"] },
  { id: "midas3", name: "Midas 3", roi: 25, markets: ["SHIB", "DOGS", "BTC"] },
  { id: "midas4", name: "Midas 4", roi: 45, markets: ["SHIB", "DOGS", "BTC", "ETH"] },
  { id: "midas5", name: "Midas 5", roi: 70, markets: ["SHIB", "DOGS", "BTC", "ETH", "Custom"] },
  { id: "midasx", name: "Midas X", roi: 90.1234, markets: ["SHIB", "DOGS", "BTC", "ETH"] },
]

export default function SimulatorPage() {
  const [investment, setInvestment] = useState(1000)
  const [selectedAlgo, setSelectedAlgo] = useState("midasx")
  const [projectedProfit, setProjectedProfit] = useState(0)
  const [chartData, setChartData] = useState<any[]>([])

  // Calculate projected profit and chart data when investment or algo changes
  useEffect(() => {
    const algo = algos.find((a) => a.id === selectedAlgo)
    if (!algo) return

    const profit = investment * algo.roi
    setProjectedProfit(profit)

    // Generate chart data
    const data = []
    const marketCount = algo.markets.length
    const profitPerMarket = profit / marketCount

    // Weekly data for 12 weeks
    for (let week = 1; week <= 12; week++) {
      const weekData: any = { name: `Week ${week}` }

      algo.markets.forEach((market) => {
        // Add some randomness to make the chart more interesting
        const variance = 0.8 + Math.random() * 0.4 // 0.8 to 1.2
        weekData[market] = (profitPerMarket / 12) * variance * week
      })

      data.push(weekData)
    }

    setChartData(data)
  }, [investment, selectedAlgo])

  const handleInvestmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(e.target.value)
    if (!isNaN(value) && value >= 100 && value <= 10000) {
      setInvestment(value)
    }
  }

  const handleAlgoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedAlgo(e.target.value)
  }

  const handleTryAlgo = () => {
    const algo = algos.find((a) => a.id === selectedAlgo)
    if (!algo) return

    // In a real app, this would redirect to the algos page
    alert(`Redirecting to purchase ${algo.name} algorithm...`)
  }

  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-6 max-w-4xl">
        <div className="relative mb-6">
          <h1 className="text-2xl font-bold mb-2">Profit Simulator</h1>
          <p className="text-gray-400">Simulate your potential profits</p>
          <div className="absolute -right-4 -top-4 opacity-5 text-gold">
            <span className="text-9xl font-bold">4-17</span>
          </div>
        </div>

        <div className="gold-card mb-6">
          <h2 className="text-lg font-medium mb-4">Investment Parameters</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Select Algorithm</label>
              <select value={selectedAlgo} onChange={handleAlgoChange} className="gold-input w-full">
                {algos.map((algo) => (
                  <option key={algo.id} value={algo.id}>
                    {algo.name} ({algo.roi * 100}% ROI)
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Investment Amount (Min: $100, Max: $10,000)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-gray-400">$</span>
                <input
                  type="number"
                  min="100"
                  max="10000"
                  value={investment}
                  onChange={handleInvestmentChange}
                  className="gold-input w-full pl-8"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="dark-card mb-6">
          <h2 className="text-lg font-medium mb-4">Projected 90-Day Profit</h2>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-6">
            <div>
              <p className="text-sm text-gray-400">Total Projected Profit</p>
              <p className="text-4xl font-mono font-bold text-gold">
                ${projectedProfit.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            </div>

            <button className="gold-button" onClick={handleTryAlgo}>
              Try {algos.find((a) => a.id === selectedAlgo)?.name}
            </button>
          </div>

          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="name" stroke="#999" />
                <YAxis stroke="#999" />
                <Tooltip
                  formatter={(value) => [`$${value.toLocaleString("en-US", { maximumFractionDigits: 0 })}`, "Profit"]}
                  contentStyle={{
                    backgroundColor: "#1E1E1E",
                    borderColor: "#FFD700",
                    color: "white",
                  }}
                />
                <Legend />
                {algos
                  .find((a) => a.id === selectedAlgo)
                  ?.markets.map((market, index) => (
                    <Bar
                      key={market}
                      dataKey={market}
                      stackId="a"
                      fill={["#FFD700", "#D4AF37", "#B8860B", "#DAA520", "#CD7F32"][index]}
                    />
                  ))}
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="dark-card">
          <h2 className="text-lg font-medium mb-4">Profit Breakdown</h2>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left py-2 px-4">Market</th>
                  <th className="text-right py-2 px-4">Allocation</th>
                  <th className="text-right py-2 px-4">Projected Profit</th>
                </tr>
              </thead>
              <tbody>
                {algos
                  .find((a) => a.id === selectedAlgo)
                  ?.markets.map((market, index) => {
                    const marketCount = algos.find((a) => a.id === selectedAlgo)?.markets.length || 1
                    const allocation = 100 / marketCount
                    const profit = projectedProfit / marketCount

                    return (
                      <tr key={market} className="border-b border-gray-800">
                        <td className="py-3 px-4">{market}</td>
                        <td className="text-right py-3 px-4">{allocation.toFixed(1)}%</td>
                        <td className="text-right py-3 px-4 text-gold font-mono">
                          ${profit.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </td>
                      </tr>
                    )
                  })}
                <tr className="bg-dark-light">
                  <td className="py-3 px-4 font-medium">Total</td>
                  <td className="text-right py-3 px-4 font-medium">100%</td>
                  <td className="text-right py-3 px-4 text-gold font-medium font-mono">
                    ${projectedProfit.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </>
  )
}
