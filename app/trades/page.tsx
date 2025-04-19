"use client"

import type React from "react"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { ChevronDown, ChevronUp, Filter } from "lucide-react"

// Generate mock trade data
const generateMockTrades = () => {
  const markets = ["SHIB", "DOGS", "BTC", "ETH"]
  const layers = ["Main", "Nano", "Pico", "Femto"]
  const algos = ["Midas 1", "Midas 2", "Midas 3", "Midas 4", "Midas 5", "Midas X"]

  const trades = []

  // Generate 50 mock trades
  for (let i = 0; i < 50; i++) {
    const date = new Date()
    date.setDate(date.getDate() - Math.floor(Math.random() * 30))

    const market = markets[Math.floor(Math.random() * markets.length)]
    const layer = layers[Math.floor(Math.random() * layers.length)]
    const algo = algos[Math.floor(Math.random() * algos.length)]

    // Generate a profit between $100 and $5000
    const profit = Math.floor(Math.random() * 4900) + 100

    trades.push({
      id: `trade-${i}`,
      date: date.toISOString(),
      market,
      layer,
      algo,
      profit,
      success: Math.random() > 0.1, // 90% success rate
    })
  }

  // Sort by date, newest first
  return trades.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

const mockTrades = generateMockTrades()

export default function TradesPage() {
  const [filters, setFilters] = useState({
    market: "",
    layer: "",
    algo: "",
  })
  const [showFilters, setShowFilters] = useState(false)

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target
    setFilters((prev) => ({ ...prev, [name]: value }))
  }

  const filteredTrades = mockTrades.filter((trade) => {
    if (filters.market && trade.market !== filters.market) return false
    if (filters.layer && trade.layer !== filters.layer) return false
    if (filters.algo && trade.algo !== filters.algo) return false
    return true
  })

  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-6 max-w-4xl">
        <div className="relative mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold mb-2">Trade History</h1>
              <p className="text-gray-400">View your past trading activity</p>
            </div>
            <button
              className="flex items-center text-gray-400 hover:text-gold"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter size={18} className="mr-1" />
              <span className="mr-1">Filter</span>
              {showFilters ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>
          </div>
          <div className="absolute -right-4 -top-4 opacity-5 text-gold">
            <span className="text-9xl font-bold">4-17</span>
          </div>
        </div>

        {showFilters && (
          <div className="dark-card mb-6">
            <h2 className="text-lg font-medium mb-4">Filters</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Market</label>
                <select
                  name="market"
                  value={filters.market}
                  onChange={handleFilterChange}
                  className="gold-input w-full"
                >
                  <option value="">All Markets</option>
                  <option value="SHIB">SHIB</option>
                  <option value="DOGS">DOGS</option>
                  <option value="BTC">BTC</option>
                  <option value="ETH">ETH</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Layer</label>
                <select name="layer" value={filters.layer} onChange={handleFilterChange} className="gold-input w-full">
                  <option value="">All Layers</option>
                  <option value="Main">Main</option>
                  <option value="Nano">Nano</option>
                  <option value="Pico">Pico</option>
                  <option value="Femto">Femto</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Algorithm</label>
                <select name="algo" value={filters.algo} onChange={handleFilterChange} className="gold-input w-full">
                  <option value="">All Algorithms</option>
                  <option value="Midas 1">Midas 1</option>
                  <option value="Midas 2">Midas 2</option>
                  <option value="Midas 3">Midas 3</option>
                  <option value="Midas 4">Midas 4</option>
                  <option value="Midas 5">Midas 5</option>
                  <option value="Midas X">Midas X</option>
                </select>
              </div>
            </div>
          </div>
        )}

        <div className="dark-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left py-3 px-4">Date</th>
                  <th className="text-left py-3 px-4">Market</th>
                  <th className="text-left py-3 px-4">Layer</th>
                  <th className="text-left py-3 px-4">Algorithm</th>
                  <th className="text-right py-3 px-4">Profit</th>
                  <th className="text-center py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredTrades.map((trade) => (
                  <tr key={trade.id} className="border-b border-gray-800 hover:bg-dark-light">
                    <td className="py-3 px-4">{new Date(trade.date).toLocaleDateString()}</td>
                    <td className="py-3 px-4">{trade.market}</td>
                    <td className="py-3 px-4">{trade.layer}</td>
                    <td className="py-3 px-4">{trade.algo}</td>
                    <td className="py-3 px-4 text-right font-mono text-gold">${trade.profit.toLocaleString()}</td>
                    <td className="py-3 px-4 text-center">
                      <span
                        className={`inline-block px-2 py-1 rounded text-xs ${
                          trade.success ? "bg-green-900 text-green-300" : "bg-red-900 text-red-300"
                        }`}
                      >
                        {trade.success ? "Success" : "Failed"}
                      </span>
                    </td>
                  </tr>
                ))}

                {filteredTrades.length === 0 && (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-gray-400">
                      No trades found matching your filters
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </>
  )
}
