'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import type { Device } from '@/app/page';

interface ComparisonSectionProps {
  currentSavings: number;
  onUpdateSavings: (value: number) => void;
  devices: Device[];
  electricityPrice: number;
}

export function ComparisonSection({
  currentSavings,
  onUpdateSavings,
  devices,
  electricityPrice,
}: ComparisonSectionProps) {
  const [savingsPercent, setSavingsPercent] = useState(0);

  const calculateDailyKwh = () => {
    return devices.reduce((total, device) => {
      const dailyKwh = (device.power * device.quantity * device.hoursPerDay) / 1000;
      return total + dailyKwh;
    }, 0);
  };

  const currentDaily = calculateDailyKwh();
  const currentMonthly = currentDaily * 30;
  const currentCost = Math.round(currentMonthly * electricityPrice);

  const savedDaily = currentDaily * (savingsPercent / 100);
  const savedMonthly = savedDaily * 30;
  const savedCost = Math.round(savedMonthly * electricityPrice);

  const newDaily = currentDaily - savedDaily;
  const newCost = currentCost - savedCost;

  const handleSavingsChange = (value: number) => {
    setSavingsPercent(value);
    onUpdateSavings(savedCost);
  };

  return (
    <Card className="border-border bg-gradient-to-br from-white to-blue-50 p-6 shadow-sm">
      <h3 className="font-bold text-foreground mb-4">So sánh trước và sau khi tiết kiệm</h3>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">
            Mục tiêu tiết kiệm: {savingsPercent}%
          </label>
          <input
            type="range"
            min="0"
            max="50"
            value={savingsPercent}
            onChange={(e) => handleSavingsChange(Number(e.target.value))}
            className="w-full cursor-pointer"
          />
        </div>

        {/* Before */}
        <div className="rounded-lg bg-white p-3 border border-border">
          <p className="text-xs font-semibold text-muted-foreground uppercase">Hiện tại</p>
          <p className="mt-1 text-xl font-bold text-foreground">{currentDaily.toFixed(2)} kWh</p>
          <p className="text-sm text-muted-foreground">₫{currentCost.toLocaleString('vi-VN')}/tháng</p>
        </div>

        {savingsPercent > 0 && (
          <>
            {/* Arrow */}
            <div className="flex justify-center">
              <div className="text-2xl text-accent">↓</div>
            </div>

            {/* After */}
            <div className="rounded-lg bg-accent/10 p-3 border border-accent/30">
              <p className="text-xs font-semibold text-accent uppercase">Dự kiến sau tiết kiệm</p>
              <p className="mt-1 text-xl font-bold text-accent">{newDaily.toFixed(2)} kWh</p>
              <p className="text-sm text-accent">₫{newCost.toLocaleString('vi-VN')}/tháng</p>
            </div>

            {/* Savings Summary */}
            <div className="rounded-lg bg-green-50 p-3 border border-green-200">
              <p className="text-xs font-semibold text-green-700 uppercase">Tiết kiệm dự kiến</p>
              <p className="mt-1 text-lg font-bold text-green-700">{savedDaily.toFixed(2)} kWh</p>
              <p className="text-sm text-green-600">
                Tiết kiệm ₫{savedCost.toLocaleString('vi-VN')}/tháng
              </p>
            </div>
          </>
        )}
      </div>
    </Card>
  );
}
