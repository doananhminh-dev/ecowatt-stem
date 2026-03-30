'use client'

import { DeviceForm } from './device-form'
import { DeviceList } from './device-list'

interface Device {
  id: string
  name: string
  power: number
  quantity: number
  hoursPerDay: number
}

interface TabCalculateProps {
  devices: Device[]
  onAddDevice: (device: Omit<Device, 'id'>) => void
  onUpdateDevice: (id: string, device: Omit<Device, 'id'>) => void
  onDeleteDevice: (id: string) => void
}

export function TabCalculate({
  devices,
  onAddDevice,
  onUpdateDevice,
  onDeleteDevice,
}: TabCalculateProps) {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Tính toán tiêu thụ điện</h1>
        <p className="text-muted-foreground">
          Thêm các thiết bị gia dụng của bạn để tính toán chi phí điện năng hàng ngày và hàng tháng
        </p>
      </div>

      {/* Device Form */}
      <div className="bg-white border border-border rounded-xl p-6 md:p-8">
        <h2 className="text-xl font-bold mb-6 text-foreground">Thêm thiết bị mới</h2>
        <DeviceForm onAddDevice={onAddDevice} />
      </div>

      {/* Device List */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-foreground">Danh sách thiết bị</h2>
        {devices.length === 0 ? (
          <div className="bg-white border border-border rounded-xl p-8 text-center space-y-3">
            <p className="text-muted-foreground text-lg">Chưa có thiết bị nào được thêm</p>
            <p className="text-sm text-muted-foreground">
              Thêm thiết bị ở trên để bắt đầu tính toán tiêu thụ điện
            </p>
          </div>
        ) : (
          <DeviceList
            devices={devices}
            onUpdateDevice={onUpdateDevice}
            onDeleteDevice={onDeleteDevice}
          />
        )}
      </div>

      {/* Info Box */}
      {devices.length > 0 && (
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 space-y-3">
          <h3 className="font-semibold text-foreground">Cách tính toán</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• <span className="font-medium">Điện năng hàng ngày (kWh)</span> = (Công suất × Số lượng × Giờ sử dụng) / 1000</li>
            <li>• <span className="font-medium">Điện năng hàng tháng (kWh)</span> = Điện năng hàng ngày × 30</li>
            <li>• <span className="font-medium">Chi phí hàng tháng (₫)</span> = Điện năng hàng tháng × 3.500 ₫/kWh</li>
          </ul>
        </div>
      )}
    </div>
  )
}
