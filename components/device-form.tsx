'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus } from 'lucide-react';

interface DeviceFormProps {
  onAddDevice: (device: { name: string; power: number; quantity: number; hoursPerDay: number }) => void;
}

export function DeviceForm({ onAddDevice }: DeviceFormProps) {
  const [name, setName] = useState('');
  const [power, setPower] = useState('');
  const [quantity, setQuantity] = useState('1');
  const [hoursPerDay, setHoursPerDay] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!name.trim()) {
      setError('Vui lòng nhập tên thiết bị');
      return;
    }
    if (!power || parseFloat(power) <= 0) {
      setError('Công suất phải lớn hơn 0');
      return;
    }
    if (!quantity || parseFloat(quantity) <= 0) {
      setError('Số lượng phải lớn hơn 0');
      return;
    }
    if (!hoursPerDay || parseFloat(hoursPerDay) < 0 || parseFloat(hoursPerDay) > 24) {
      setError('Giờ sử dụng phải từ 0 đến 24');
      return;
    }

    onAddDevice({
      name: name.trim(),
      power: parseFloat(power),
      quantity: parseFloat(quantity),
      hoursPerDay: parseFloat(hoursPerDay),
    });

    // Reset form
    setName('');
    setPower('');
    setQuantity('1');
    setHoursPerDay('');
  };

  return (
    <Card className="border-border bg-white p-6 shadow-sm">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Tên thiết bị
            </label>
            <Input
              type="text"
              placeholder="Ví dụ: Tủ lạnh, Điều hòa"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border-border"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Công suất (W)
            </label>
            <Input
              type="number"
              placeholder="Ví dụ: 1500"
              value={power}
              onChange={(e) => setPower(e.target.value)}
              className="border-border"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Số lượng
            </label>
            <Input
              type="number"
              placeholder="1"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="border-border"
              min="1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Giờ sử dụng/ngày
            </label>
            <Input
              type="number"
              placeholder="Ví dụ: 8"
              value={hoursPerDay}
              onChange={(e) => setHoursPerDay(e.target.value)}
              className="border-border"
              min="0"
              max="24"
            />
          </div>
        </div>

        {error && (
          <p className="text-sm text-destructive">{error}</p>
        )}

        <Button 
          type="submit" 
          className="w-full gap-2 bg-primary text-white hover:bg-primary/90 sm:w-auto"
        >
          <Plus className="h-4 w-4" />
          Thêm thiết bị
        </Button>
      </form>
    </Card>
  );
}
