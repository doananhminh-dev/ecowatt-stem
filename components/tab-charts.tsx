'use client'

import { ChartsSection } from './charts-section'

interface Device {
  id: string
  name: string
  power: number
  quantity: number
  hoursPerDay: number
}

interface TabChartsProps {
  devices: Device[]
}

export function TabCharts({ devices }: TabChartsProps) {
  // Calculate total consumption
  const totalDailyKwh = devices.reduce(
    (sum, device) => sum + (device.power * device.quantity * device.hoursPerDay) / 1000,
    0
  )

  const totalMonthlyCost = devices.reduce((sum, device) => {
    const dailyKwh = (device.power * device.quantity * device.hoursPerDay) / 1000
    const monthlyCost = dailyKwh * 30 * 3500
    return sum + monthlyCost
  }, 0)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Biểu đồ và phân tích</h1>
        <p className="text-muted-foreground">
          Xem các biểu đồ chi tiết về tiêu thụ điện và phân bổ chi phí của các thiết bị
        </p>
      </div>

      {devices.length === 0 ? (
        <div className="bg-white border border-border rounded-xl p-8 text-center space-y-3">
          <p className="text-muted-foreground text-lg">Chưa có thiết bị nào được thêm</p>
          <p className="text-sm text-muted-foreground">
            Vui lòng thêm thiết bị trong tab "Tính điện năng" để xem biểu đồ
          </p>
        </div>
      ) : (
        <>
          {/* Summary Stats */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white border border-border rounded-xl p-8">
              <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">
                Tiêu thụ hàng ngày
              </p>
              <div className="text-4xl font-bold text-primary">
                {totalDailyKwh.toFixed(2)} <span className="text-xl">kWh</span>
              </div>
            </div>

            <div className="bg-white border border-border rounded-xl p-8">
              <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">
                Chi phí hàng tháng
              </p>
              <div className="text-4xl font-bold text-accent">
                ₫{Math.round(totalMonthlyCost).toLocaleString('vi-VN')}
              </div>
            </div>
          </div>

          {/* Charts Section */}
          <ChartsSection devices={devices} />

          {/* Device Breakdown */}
          <div className="bg-white border border-border rounded-xl p-8">
            <h3 className="text-lg font-bold mb-6 text-foreground">Phân bổ tiêu thụ theo thiết bị</h3>
            <div className="space-y-4">
              {devices
                .map((device) => ({
                  ...device,
                  dailyKwh: (device.power * device.quantity * device.hoursPerDay) / 1000,
                }))
                .sort((a, b) => b.dailyKwh - a.dailyKwh)
                .map((device) => {
                  const percentage =
                    totalDailyKwh > 0 ? (device.dailyKwh / totalDailyKwh) * 100 : 0
                  return (
                    <div key={device.id} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-semibold text-foreground">{device.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {device.dailyKwh.toFixed(2)} kWh/ngày
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-primary">{percentage.toFixed(1)}%</div>
                          <div className="text-xs text-muted-foreground">
                            ₫{Math.round(device.dailyKwh * 30 * 3500).toLocaleString('vi-VN')}/tháng
                          </div>
                        </div>
                      </div>
                      <div className="w-full bg-border rounded-full h-2">
                        <div
                          className="bg-primary rounded-full h-2 transition-all"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  )
                })}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
