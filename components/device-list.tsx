'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Trash2, Zap } from 'lucide-react';
import { useState } from 'react';
import type { Device } from '@/app/page';

interface DeviceListProps {
  devices: Device[];
  onDelete: (id: string) => void;
  onUpdate: (id: string, updated: Omit<Device, 'id'>) => void;
  electricityPrice: number;
}

export function DeviceList({ devices, onDelete, onUpdate, electricityPrice }: DeviceListProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<Omit<Device, 'id'>>({ name: '', power: 0, quantity: 0, hoursPerDay: 0 });

  const calculateDeviceKwh = (device: Device) => {
    return (device.power * device.quantity * device.hoursPerDay) / 1000;
  };

  const calculateDeviceMonthlyCost = (device: Device) => {
    const monthlyKwh = calculateDeviceKwh(device) * 30;
    return Math.round(monthlyKwh * electricityPrice);
  };

  const startEdit = (device: Device) => {
    setEditingId(device.id);
    setEditValues({
      name: device.name,
      power: device.power,
      quantity: device.quantity,
      hoursPerDay: device.hoursPerDay,
    });
  };

  const saveEdit = (id: string) => {
    onUpdate(id, editValues);
    setEditingId(null);
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  return (
    <Card className="border-border bg-white p-6 shadow-sm">
      <h2 className="text-xl font-bold text-foreground mb-4">Thiết bị của bạn ({devices.length})</h2>
      
      {devices.length === 0 ? (
        <div className="text-center py-8">
          <Zap className="h-12 w-12 mx-auto text-muted-foreground/30 mb-2" />
          <p className="text-muted-foreground">Chưa có thiết bị nào. Thêm thiết bị ở trên!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {devices.map((device) => (
            <div key={device.id} className="border border-border rounded-lg p-4 hover:bg-muted/30 transition-colors">
              {editingId === device.id ? (
                // Edit Mode
                <div className="space-y-4">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div>
                      <label className="text-xs font-medium text-muted-foreground">Tên thiết bị</label>
                      <Input
                        value={editValues.name}
                        onChange={(e) => setEditValues({ ...editValues, name: e.target.value })}
                        className="mt-1 border-border text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-muted-foreground">Công suất (W)</label>
                      <Input
                        type="number"
                        value={editValues.power}
                        onChange={(e) => setEditValues({ ...editValues, power: parseFloat(e.target.value) })}
                        className="mt-1 border-border text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-muted-foreground">Số lượng</label>
                      <Input
                        type="number"
                        value={editValues.quantity}
                        onChange={(e) => setEditValues({ ...editValues, quantity: parseFloat(e.target.value) })}
                        className="mt-1 border-border text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-muted-foreground">Giờ/ngày</label>
                      <Input
                        type="number"
                        value={editValues.hoursPerDay}
                        onChange={(e) => setEditValues({ ...editValues, hoursPerDay: parseFloat(e.target.value) })}
                        className="mt-1 border-border text-sm"
                      />
                    </div>
                  </div>
                  <div className="flex gap-2 justify-end">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={cancelEdit}
                      className="border-border text-foreground hover:bg-muted"
                    >
                      Hủy
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => saveEdit(device.id)}
                      className="bg-primary text-white hover:bg-primary/90"
                    >
                      Lưu
                    </Button>
                  </div>
                </div>
              ) : (
                // Display Mode
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div className="flex-1">
                    <p className="font-semibold text-foreground">{device.name}</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {device.power}W × {device.quantity} × {device.hoursPerDay}h/ngày = {calculateDeviceKwh(device).toFixed(2)} kWh/ngày
                    </p>
                    <p className="text-sm font-medium text-accent mt-1">
                      Hàng tháng: ₫{calculateDeviceMonthlyCost(device).toLocaleString('vi-VN')}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => startEdit(device)}
                      className="border-border text-foreground hover:bg-muted"
                    >
                      Sửa
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => onDelete(device.id)}
                      className="gap-1"
                    >
                      <Trash2 className="h-4 w-4" />
                      Xóa
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
