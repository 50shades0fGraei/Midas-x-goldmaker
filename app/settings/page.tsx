"use client"

import type React from "react"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Save, Check, X } from "lucide-react"

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    darkMode: true,
    binanceApiKey: "",
    binanceSecretKey: "",
    googleDriveBackup: false,
    paypalEmail: "meta2graei@gmail.com",
    paypalPercentage: 10,
  })

  const [saved, setSaved] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setSettings((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))

    // Reset saved/error states when user makes changes
    setSaved(false)
    setError("")
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate settings
    if (settings.binanceApiKey && settings.binanceApiKey.length < 10) {
      setError("Binance API Key must be at least 10 characters")
      return
    }

    if (settings.binanceSecretKey && settings.binanceSecretKey.length < 10) {
      setError("Binance Secret Key must be at least 10 characters")
      return
    }

    // In a real app, this would save the settings to the server
    setTimeout(() => {
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    }, 500)
  }

  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-6 max-w-4xl">
        <div className="relative mb-6">
          <h1 className="text-2xl font-bold mb-2">Settings</h1>
          <p className="text-gray-400">Configure your trading preferences</p>
          <div className="absolute -right-4 -top-4 opacity-5 text-gold">
            <span className="text-9xl font-bold">4-17</span>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="gold-card mb-6">
            <h2 className="text-lg font-medium mb-4">Appearance</h2>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Dark Mode</p>
                <p className="text-sm text-gray-400">Enable dark mode for the application</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="darkMode"
                  checked={settings.darkMode}
                  onChange={handleChange}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gold"></div>
              </label>
            </div>
          </div>

          <div className="dark-card mb-6">
            <h2 className="text-lg font-medium mb-4">API Configuration</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Binance API Key</label>
                <input
                  type="password"
                  name="binanceApiKey"
                  value={settings.binanceApiKey}
                  onChange={handleChange}
                  placeholder="Enter your Binance API Key"
                  className="gold-input w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Binance Secret Key</label>
                <input
                  type="password"
                  name="binanceSecretKey"
                  value={settings.binanceSecretKey}
                  onChange={handleChange}
                  placeholder="Enter your Binance Secret Key"
                  className="gold-input w-full"
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="googleDriveBackup"
                  name="googleDriveBackup"
                  checked={settings.googleDriveBackup}
                  onChange={handleChange}
                  className="w-4 h-4 text-gold bg-gray-700 border-gray-600 rounded focus:ring-gold focus:ring-2"
                />
                <label htmlFor="googleDriveBackup" className="ml-2 text-sm font-medium">
                  Enable Google Drive Backup
                </label>
              </div>
            </div>
          </div>

          <div className="dark-card mb-6">
            <h2 className="text-lg font-medium mb-4">PayPal Configuration</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">PayPal Email</label>
                <input
                  type="email"
                  name="paypalEmail"
                  value={settings.paypalEmail}
                  onChange={handleChange}
                  className="gold-input w-full"
                  disabled
                />
                <p className="text-xs text-gray-400 mt-1">This email is used for daily profit sharing (10%)</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Profit Sharing Percentage</label>
                <div className="relative">
                  <input
                    type="number"
                    name="paypalPercentage"
                    value={settings.paypalPercentage}
                    onChange={handleChange}
                    className="gold-input w-full pr-8"
                    disabled
                  />
                  <span className="absolute right-3 top-2 text-gray-400">%</span>
                </div>
                <p className="text-xs text-gray-400 mt-1">Fixed at 10% as per license agreement</p>
              </div>
            </div>
          </div>

          {error && (
            <div className="bg-red-900/50 border border-red-800 text-red-300 px-4 py-3 rounded mb-6">
              <div className="flex items-center">
                <X size={20} className="mr-2" />
                <p>{error}</p>
              </div>
            </div>
          )}

          {saved && (
            <div className="bg-green-900/50 border border-green-800 text-green-300 px-4 py-3 rounded mb-6">
              <div className="flex items-center">
                <Check size={20} className="mr-2" />
                <p>Settings saved successfully!</p>
              </div>
            </div>
          )}

          <button type="submit" className="gold-button flex items-center">
            <Save size={18} className="mr-2" />
            Save Settings
          </button>
        </form>
      </main>
    </>
  )
}
