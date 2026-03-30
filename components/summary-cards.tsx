'use client';

import { Card } from '@/components/ui/card';
import { Zap, TrendingDown, DollarSign } from 'lucide-react';
import { useEffect, useState } from 'react';

interface SummaryCardsProps {
  dailyKwh: number;
  monthlyKwh: number;
  monthlyCost: number;
}

export function SummaryCards({ dailyKwh, monthlyKwh, monthlyCost }: SummaryCardsProps) {
  const [displayDaily, setDisplayDaily] = useState(0);
  const [displayMonthly, setDisplayMonthly] = useState(0);
  const [displayCost, setDisplayCost] = useState(0);

  // Sanitize inputs to prevent NaN
  const safeDailyKwh = typeof dailyKwh === 'number' && !isNaN(dailyKwh) ? dailyKwh : 0;
  const safeMonthlyKwh = typeof monthlyKwh === 'number' && !isNaN(monthlyKwh) ? monthlyKwh : 0;
  const safeMonthlyCost = typeof monthlyCost === 'number' && !isNaN(monthlyCost) ? monthlyCost : 0;

  useEffect(() => {
    const animateValue = (
      start: number,
      end: number,
      duration: number,
      callback: (val: number) => void
    ) => {
      let startTime: number;
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const progress = (currentTime - startTime) / duration;
        if (progress < 1) {
          callback(Math.round(start + (end - start) * progress * 100) / 100);
          requestAnimationFrame(animate);
        } else {
          callback(end);
        }
      };
      requestAnimationFrame(animate);
    };

    animateValue(0, safeDailyKwh, 800, setDisplayDaily);
    animateValue(0, safeMonthlyKwh, 800, setDisplayMonthly);
    animateValue(0, safeMonthlyCost, 800, setDisplayCost);
  }, [safeDailyKwh, safeMonthlyKwh, safeMonthlyCost]);

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid gap-6 sm:grid-cols-3">
        {/* Daily Usage */}
        <Card className="border border-border bg-white p-6 shadow-sm hover:shadow-lg transition-all rounded-lg">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-semibold text-muted-foreground">Tổng điện năng/ngày</p>
              <p className="mt-3 text-4xl font-bold text-foreground">
                {(displayDaily || 0).toFixed(2)} <span className="text-xl text-muted-foreground">kWh</span>
              </p>
              <p className="mt-2 text-xs text-muted-foreground">Bình quân hàng ngày</p>
            </div>
            <div className="rounded-lg bg-blue-100 p-3">
              <Zap className="h-6 w-6 text-primary" />
            </div>
          </div>
        </Card>

        {/* Monthly Usage */}
        <Card className="border border-border bg-white p-6 shadow-sm hover:shadow-lg transition-all rounded-lg">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-semibold text-muted-foreground">Tổng điện năng/tháng</p>
              <p className="mt-3 text-4xl font-bold text-foreground">
                {(displayMonthly || 0).toFixed(0)} <span className="text-xl text-muted-foreground">kWh</span>
              </p>
              <p className="mt-2 text-xs text-muted-foreground">Bình quân 30 ngày</p>
            </div>
            <div className="rounded-lg bg-blue-100 p-3">
              <TrendingDown className="h-6 w-6 text-primary" />
            </div>
          </div>
        </Card>

        {/* Monthly Cost */}
        <Card className="border border-border bg-white p-6 shadow-sm hover:shadow-lg transition-all rounded-lg">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-semibold text-muted-foreground">Chi phí điện/tháng</p>
              <p className="mt-3 text-4xl font-bold text-foreground">
                ₫{((displayCost || 0) as number).toLocaleString('vi-VN')}
              </p>
              <p className="mt-2 text-xs text-muted-foreground">Hóa đơn ước tính</p>
            </div>
            <div className="rounded-lg bg-green-100 p-3">
              <DollarSign className="h-6 w-6 text-secondary" />
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
