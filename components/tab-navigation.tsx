'use client'

import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface TabNavigationProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

const tabs = [
  { id: 'home', label: 'Trang chủ', icon: '🏠' },
  { id: 'calculate', label: 'Tính điện năng', icon: '⚡' },
  { id: 'compare', label: 'So sánh tiết kiệm', icon: '📊' },
  { id: 'charts', label: 'Biểu đồ', icon: '📈' },
  { id: 'sustainability', label: 'Kiến thức xanh', icon: '🌱' },
]

export function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="bg-white border-b border-border sticky top-[60px] z-40 shadow-sm">
      {/* Desktop Navigation */}
      <div className="hidden md:flex max-w-7xl mx-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              onTabChange(tab.id)
              setMobileMenuOpen(false)
            }}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-all border-b-2 ${
              activeTab === tab.id
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden flex items-center justify-between p-4">
        <div className="font-semibold text-foreground">
          {tabs.find((t) => t.id === activeTab)?.label}
        </div>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 hover:bg-muted rounded-lg"
        >
          {mobileMenuOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden flex flex-col gap-1 p-4 bg-muted/50">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                onTabChange(tab.id)
                setMobileMenuOpen(false)
              }}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-primary text-primary-foreground'
                  : 'text-foreground hover:bg-muted'
              }`}
            >
              <span className="text-lg">{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
