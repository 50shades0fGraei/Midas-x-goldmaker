"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { ChevronDown, ChevronUp } from "lucide-react"

// Algo data
const algos = [
  {
    id: "midas1",
    name: "Midas 1",
    price: "Free",
    roi: "450%",
    markets: ["SHIB"],
    minInvestment: 100,
    trades: 30,
    description: "Entry-level algorithm for SHIB market with 450% ROI potential.",
    isActive: true,
    isPaid: false,
  },
  {
    id: "midas2",
    name: "Midas 2",
    price: "Free",
    roi: "1000%",
    markets: ["SHIB", "DOGS"],
    minInvestment: 100,
    trades: 45,
    description: "Free algorithm for SHIB and DOGS markets with 1000% ROI potential.",
    isActive: true,
    isPaid: false,
  },
  {
    id: "midas3",
    name: "Midas 3",
    price: "$500",
    roi: "2500%",
    markets: ["SHIB", "DOGS", "BTC"],
    minInvestment: 500,
    trades: 60,
    description: "Mid-tier algorithm for 3 markets with 2500% ROI potential.",
    isActive: false,
    isPaid: true,
  },
  {
    id: "midas4",
    name: "Midas 4",
    price: "$1000",
    roi: "4500%",
    markets: ["SHIB", "DOGS", "BTC", "ETH"],
    minInvestment: 1000,
    trades: 85,
    description: "Advanced algorithm for 4 markets with 4500% ROI potential.",
    isActive: false,
    isPaid: true,
  },
  {
    id: "midas5",
    name: "Midas 5",
    price: "$2500",
    roi: "7000%",
    markets: ["SHIB", "DOGS", "BTC", "ETH", "Custom"],
    minInvestment: 1500,
    trades: 110,
    description: "Premium algorithm for 5 markets with 7000% ROI potential.",
    isActive: false,
    isPaid: true,
  },
  {
    id: "midasx",
    name: "Midas X",
    price: "$5000",
    roi: "9012.34%",
    markets: ["SHIB", "DOGS", "BTC", "ETH"],
    minInvestment: 2000,
    trades: 128,
    description: "Ultimate algorithm with 9012.34% ROI potential across 4 optimized markets.",
    isActive: false,
    isPaid: true,
  },
]

export default function AlgosPage() {
  const [expandedAlgo, setExpandedAlgo] = useState<string | null>(null)
  const [selectedAlgo, setSelectedAlgo] = useState<string>("midas1")

  const toggleExpand = (id: string) => {
    setExpandedAlgo(expandedAlgo === id ? null : id)
  }

  const handleActivate = (id: string) => {
    setSelectedAlgo(id)
    // In a real app, this would activate the algorithm
    alert(`Algorithm ${id} selected! In a real app, this would activate the algorithm.`)
  }

  const handleBuy = (id: string, price: string) => {
    // In a real app, this would redirect to PayPal
    alert(`Redirecting to PayPal to purchase ${id} for ${price}...`)
  }

  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-6 max-w-4xl">
        <div className="relative mb-6">
          <h1 className="text-2xl font-bold mb-2">Algorithm Selection</h1>
          <p className="text-gray-400">Choose your trading algorithm</p>
          <div className="absolute -right-4 -top-4 opacity-5 text-gold">
            <span className="text-9xl font-bold">4-17</span>
          </div>
        </div>

        <div className="space-y-4">
          {algos.map((algo) => (
            <div
              key={algo.id}
              className={`dark-card transition-all duration-300 ${
                selectedAlgo === algo.id ? "border-gold shadow-gold" : ""
              }`}
            >
              <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleExpand(algo.id)}>
                <div className="flex items-center">
                  <div
                    className={`w-4 h-4 rounded-full mr-3 ${selectedAlgo === algo.id ? "bg-gold" : "bg-gray-600"}`}
                  ></div>
                  <div>
                    <h3 className="font-medium">{algo.name}</h3>
                    <p className="text-sm text-gray-400">
                      {algo.price} • {algo.roi} ROI
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  {algo.isActive && (
                    <span className="text-xs bg-green-900 text-green-300 px-2 py-1 rounded mr-2">Active</span>
                  )}
                  {expandedAlgo === algo.id ? (
                    <ChevronUp size={20} className="text-gray-400" />
                  ) : (
                    <ChevronDown size={20} className="text-gray-400" />
                  )}
                </div>
              </div>

              {expandedAlgo === algo.id && (
                <div className="mt-4 pt-4 border-t border-gray-800">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-400">Markets</p>
                      <p className="font-medium">{algo.markets.join(", ")}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Min Investment</p>
                      <p className="font-medium">${algo.minInvestment}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Trades</p>
                      <p className="font-medium">{algo.trades} per cycle</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">ROI</p>
                      <p className="font-medium text-gold">{algo.roi}</p>
                    </div>
                  </div>

                  <p className="text-sm mb-4">{algo.description}</p>

                  <div className="flex space-x-3">
                    {algo.isPaid && !algo.isActive ? (
                      <button className="gold-button flex-1" onClick={() => handleBuy(algo.id, algo.price)}>
                        Buy with PayPal ({algo.price})
                      </button>
                    ) : (
                      <button
                        className={`gold-button flex-1 ${selectedAlgo === algo.id ? "opacity-50 cursor-not-allowed" : ""}`}
                        onClick={() => handleActivate(algo.id)}
                        disabled={selectedAlgo === algo.id}
                      >
                        {selectedAlgo === algo.id ? "Currently Active" : "Activate"}
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
    </>
  )
}
