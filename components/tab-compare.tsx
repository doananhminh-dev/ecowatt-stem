'use client'

import { useState } from 'react'
import { ComparisonSection } from './comparison-section'

interface Device {
  id: string
  name: string
  power: number
  quantity: number
  hoursPerDay: number
}

interface TabCompareProps {
  devices: Device[]
}

export function TabCompare({ devices }: TabCompareProps) {
  const [savingsPercentage, setSavingsPercentage] = useState(20)

  // Calculate total monthly cost
  const totalMonthlyCost = devices.reduce((sum, device) => {
    const dailyKwh = (device.power * device.quantity * device.hoursPerDay) / 1000
    const monthlyCost = dailyKwh * 30 * 3500
    return sum + monthlyCost
  }, 0)

  const savingsAmount = totalMonthlyCost * (savingsPercentage / 100)
  const newCost = totalMonthlyCost - savingsAmount

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">So sánh tiết kiệm</h1>
        <p className="text-muted-foreground">
          So sánh chi phí điện hiện tại với các kịch bản tiết kiệm năng lượng khác nhau
        </p>
      </div>

      {devices.length === 0 ? (
        <div className="bg-white border border-border rounded-xl p-8 text-center space-y-3">
          <p className="text-muted-foreground text-lg">Chưa có thiết bị nào được thêm</p>
          <p className="text-sm text-muted-foreground">
            Vui lòng thêm thiết bị trong tab "Tính điện năng" để xem so sánh
          </p>
        </div>
      ) : (
        <>
          {/* Current vs Savings */}
          <div className="bg-white border border-border rounded-xl p-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Current Situation */}
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                  Tình trạng hiện tại
                </h3>
                <div className="space-y-2">
                  <div className="text-4xl font-bold text-primary">
                    ₫{Math.round(totalMonthlyCost).toLocaleString('vi-VN')}
                  </div>
                  <p className="text-muted-foreground">Chi phí điện hàng tháng</p>
                </div>
              </div>

              {/* After Savings */}
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                  Sau khi tiết kiệm
                </h3>
                <div className="space-y-2">
                  <div className="text-4xl font-bold text-accent">
                    ₫{Math.round(newCost).toLocaleString('vi-VN')}
                  </div>
                  <p className="text-muted-foreground">Chi phí dự tính</p>
                </div>
              </div>
            </div>
          </div>

          {/* Savings Slider */}
          <div className="bg-white border border-border rounded-xl p-8 space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground block">
                Mức tiết kiệm: {savingsPercentage}%
              </label>
              <input
                type="range"
                min="0"
                max="50"
                value={savingsPercentage}
                onChange={(e) => setSavingsPercentage(Number(e.target.value))}
                className="w-full h-2 bg-border rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <p className="text-xs text-muted-foreground">Kéo để điều chỉnh mức tiết kiệm từ 0% đến 50%</p>
            </div>

            {/* Savings Amount */}
            <div className="bg-accent/5 rounded-lg p-4 border border-accent/20 space-y-2">
              <p className="text-sm text-muted-foreground">Số tiền tiết kiệm hàng tháng</p>
              <p className="text-3xl font-bold text-accent">
                ₫{Math.round(savingsAmount).toLocaleString('vi-VN')}
              </p>
              <p className="text-xs text-muted-foreground">
                Hàng năm: ₫{Math.round(savingsAmount * 12).toLocaleString('vi-VN')}
              </p>
            </div>
          </div>

          {/* Comparison Section */}
          <ComparisonSection devices={devices} />

          {/* Tips */}
          <div className="bg-white border border-border rounded-xl p-8">
            <h3 className="text-lg font-bold mb-4 text-foreground">Cách đạt được tiết kiệm này</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex gap-3">
                <span className="text-primary font-bold">1.</span>
                <span>Sử dụng bóng đèn LED thay cho bóng đèn truyền thống</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">2.</span>
                <span>Tắt thiết bị khi không sử dụng để tránh tiêu thụ điện chờ</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">3.</span>
                <span>Sử dụng điều hòa ở chế độ tiết kiệm và đặt nhiệt độ phù hợp</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">4.</span>
                <span>Giặt quần áo vào giờ cao điểm và sử dụng nước mát</span>
              </li>
            </ul>
          </div>
        </>
      )}
    </div>
  )
}
