'use client'

import { SustainabilityInfo } from './sustainability-info'

interface Device {
  id: string
  name: string
  power: number
  quantity: number
  hoursPerDay: number
}

interface TabSustainabilityProps {
  devices: Device[]
}

export function TabSustainability({ devices }: TabSustainabilityProps) {
  // Calculate carbon footprint
  const totalMonthlyCost = devices.reduce((sum, device) => {
    const dailyKwh = (device.power * device.quantity * device.hoursPerDay) / 1000
    const monthlyCost = dailyKwh * 30 * 3500
    return sum + monthlyCost
  }, 0)

  const totalDailyKwh = devices.reduce(
    (sum, device) => sum + (device.power * device.quantity * device.hoursPerDay) / 1000,
    0
  )

  // Carbon footprint: 1 kWh = 0.54 kg CO2
  const monthlyCarbon = totalDailyKwh * 30 * 0.54
  const yearlyCarbon = monthlyCarbon * 12

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Kiến thức xanh</h1>
        <p className="text-muted-foreground">
          Hiểu rõ hơn về tác động môi trường của tiêu thụ điện và cách bảo vệ hành tinh chúng ta
        </p>
      </div>

      {/* Carbon Footprint */}
      {devices.length > 0 && (
        <div className="bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/20 rounded-xl p-8">
          <h3 className="text-lg font-bold mb-6 text-foreground">Dấu chân carbon của bạn</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground uppercase tracking-wider">
                Mỗi tháng
              </p>
              <div className="text-4xl font-bold text-accent">
                {monthlyCarbon.toFixed(1)} kg
              </div>
              <p className="text-xs text-muted-foreground">CO₂ tương đương</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground uppercase tracking-wider">
                Mỗi năm
              </p>
              <div className="text-4xl font-bold text-accent">
                {yearlyCarbon.toFixed(1)} kg
              </div>
              <p className="text-xs text-muted-foreground">CO₂ tương đương</p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-6">
            * Dựa trên mức carbon intensity trung bình của Việt Nam là 0.54 kg CO₂/kWh
          </p>
        </div>
      )}

      {/* Sustainability Info Component */}
      <SustainabilityInfo />

      {/* Energy Facts for Vietnam */}
      <div className="bg-white border border-border rounded-xl p-8">
        <h3 className="text-lg font-bold mb-6 text-foreground">Sự kiện năng lượng Việt Nam</h3>
        <div className="space-y-6">
          <div className="border-l-4 border-primary pl-4 space-y-1">
            <h4 className="font-semibold text-foreground">Năng lượng tái tạo</h4>
            <p className="text-sm text-muted-foreground">
              Việt Nam cam kết đạt 45% năng lượng tái tạo trong tổng công suất điện vào năm 2030
            </p>
          </div>

          <div className="border-l-4 border-accent pl-4 space-y-1">
            <h4 className="font-semibold text-foreground">Tiêu thụ điện dân cư</h4>
            <p className="text-sm text-muted-foreground">
              Tiêu thụ điện dân cư Việt Nam tăng khoảng 8-10% mỗi năm do công nghiệp hóa
            </p>
          </div>

          <div className="border-l-4 border-primary pl-4 space-y-1">
            <h4 className="font-semibold text-foreground">Giá điện hợp lý</h4>
            <p className="text-sm text-muted-foreground">
              Giá điện bình quân của Việt Nam là khoảng 3,500 VNĐ/kWh, rẻ hơn so với khu vực
            </p>
          </div>
        </div>
      </div>

      {/* Impact Comparison */}
      <div className="bg-white border border-border rounded-xl p-8">
        <h3 className="text-lg font-bold mb-6 text-foreground">So sánh tác động</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
            <div>
              <div className="font-semibold text-foreground">Một cây xanh hấp thụ/năm</div>
              <div className="text-xs text-muted-foreground">trung bình</div>
            </div>
            <div className="font-bold text-primary">~20 kg CO₂</div>
          </div>

          {devices.length > 0 && (
            <div className="flex items-center justify-between p-4 bg-primary/5 rounded-lg border border-primary/20">
              <div>
                <div className="font-semibold text-foreground">Carbon footprint hàng năm của bạn</div>
                <div className="text-xs text-muted-foreground">từ tiêu thụ điện</div>
              </div>
              <div className="font-bold text-primary">
                ~{yearlyCarbon.toFixed(0)} kg CO₂
              </div>
            </div>
          )}

          <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
            <div>
              <div className="font-semibold text-foreground">Cần trồng cây để trung hòa</div>
              <div className="text-xs text-muted-foreground">hàng năm</div>
            </div>
            <div className="font-bold text-accent">
              {devices.length > 0
                ? Math.ceil(yearlyCarbon / 20)
                : '?'} cây
            </div>
          </div>
        </div>
      </div>

      {/* Action Tips */}
      <div className="bg-white border border-border rounded-xl p-8">
        <h3 className="text-lg font-bold mb-6 text-foreground">Hành động vì môi trường</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-muted/30 rounded-lg space-y-2">
            <h4 className="font-semibold text-foreground">Tại nhà</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>✓ Sử dụng bóng đèn LED</li>
              <li>✓ Tắt điều hòa khi không cần</li>
              <li>✓ Rút phích cắm khi không sử dụng</li>
              <li>✓ Sử dụng đạm nước lạnh</li>
            </ul>
          </div>

          <div className="p-4 bg-muted/30 rounded-lg space-y-2">
            <h4 className="font-semibold text-foreground">Tại cộng đồng</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>✓ Ủng hộ năng lượng tái tạo</li>
              <li>✓ Tham gia chương trình tiết kiệm</li>
              <li>✓ Nâng cao nhận thức cộng đồng</li>
              <li>✓ Trồng cây để trung hòa carbon</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
