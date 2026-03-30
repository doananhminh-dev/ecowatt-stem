'use client'

import { Button } from '@/components/ui/button'
import { ArrowRight, Zap } from 'lucide-react'
import { SummaryCards } from './summary-cards'

interface TabHomeProps {
  devices: Array<{
    id: string
    name: string
    power: number
    quantity: number
    hoursPerDay: number
  }>
  onNavigate: (tab: string) => void
}

export function TabHome({ devices, onNavigate }: TabHomeProps) {
  // Calculate energy statistics
  const dailyKwh = devices.reduce((sum, device) => {
    return sum + (device.power * device.quantity * device.hoursPerDay) / 1000
  }, 0)
  const monthlyKwh = dailyKwh * 30
  const monthlyCost = Math.round(monthlyKwh * 3500)

  return (
    <div className="space-y-12">
      {/* Hero Section with Blue Tech Calm gradient */}
      <div className="bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500 rounded-2xl p-8 md:p-16 text-center text-white shadow-lg">
        <div className="max-w-3xl mx-auto space-y-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
            Track Your Energy, Save Your Money
          </h1>
          <p className="text-lg md:text-xl text-blue-100">
            Theo dõi điện năng, tiết kiệm chi phí, hướng tới lối sống xanh bền vững.
          </p>
        </div>
      </div>

      {/* Summary Cards */}
      <div>
        <h2 className="text-2xl font-bold mb-8 text-foreground">Thống kê hiện tại</h2>
        <SummaryCards dailyKwh={dailyKwh} monthlyKwh={monthlyKwh} monthlyCost={monthlyCost} />
      </div>

      {/* CTA Buttons */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white border border-border rounded-xl p-8 space-y-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <Zap className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-xl font-bold text-foreground">Tính toán tiêu thụ điện</h3>
          <p className="text-muted-foreground">
            Thêm thiết bị gia dụng của bạn và tính toán chi phí điện năng hàng tháng
          </p>
          <Button
            onClick={() => onNavigate('calculate')}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold"
          >
            Bắt đầu tính toán
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>

        <div className="bg-white border border-border rounded-xl p-8 space-y-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
            <span className="text-xl">📊</span>
          </div>
          <h3 className="text-xl font-bold text-foreground">So sánh tiết kiệm</h3>
          <p className="text-muted-foreground">
            So sánh chi phí hiện tại với các kịch bản tiết kiệm năng lượng khác nhau
          </p>
          <Button
            onClick={() => onNavigate('compare')}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold"
          >
            Xem gợi ý
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-8 shadow-sm">
        <h3 className="text-xl font-bold mb-8 text-foreground">Lợi ích của EcoWatt</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center space-y-3 bg-white rounded-lg p-6 shadow-sm">
            <div className="text-4xl font-bold text-blue-600">30%</div>
            <p className="text-muted-foreground font-medium">Giảm chi phí điện trung bình</p>
          </div>
          <div className="text-center space-y-3 bg-white rounded-lg p-6 shadow-sm">
            <div className="text-4xl font-bold text-green-600">100%</div>
            <p className="text-muted-foreground font-medium">Miễn phí sử dụng</p>
          </div>
          <div className="text-center space-y-3 bg-white rounded-lg p-6 shadow-sm">
            <div className="text-4xl font-bold text-blue-600">24/7</div>
            <p className="text-muted-foreground font-medium">Theo dõi thời gian thực</p>
          </div>
        </div>
      </div>
    </div>
  )
}
