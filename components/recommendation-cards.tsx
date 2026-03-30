'use client';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Lightbulb, Wind, Timer, Zap } from 'lucide-react';
import type { Device } from '@/app/page';

interface RecommendationCardsProps {
  devices: Device[];
}

const recommendations = [
  {
    icon: Lightbulb,
    title: 'Sử dụng bóng đèn LED',
    description: 'Bóng đèn LED tiêu thụ ít hơn 75% so với bóng đèn phổ thông',
    impact: 'Tiết kiệm 15-20%',
    color: 'bg-yellow-100',
    iconColor: 'text-yellow-600',
  },
  {
    icon: Wind,
    title: 'Tối ưu hóa điều hòa',
    description: 'Đặt nhiệt độ cao hơn 1-2°C và dùng bộ điều chỉnh lập trình',
    impact: 'Tiết kiệm 10-15%',
    color: 'bg-blue-100',
    iconColor: 'text-blue-600',
  },
  {
    icon: Timer,
    title: 'Sử dụng ngoài giờ cao điểm',
    description: 'Dùng thiết bị công suất lớn vào giờ cao điểm (9 tối - 6 sáng)',
    impact: 'Tiết kiệm 5-10%',
    color: 'bg-purple-100',
    iconColor: 'text-purple-600',
  },
  {
    icon: Zap,
    title: 'Tắt chế độ chờ',
    description: 'Rút phích cắm hoặc dùng ổ điện thông minh để tránh tiêu thụ chờ',
    impact: 'Tiết kiệm 3-5%',
    color: 'bg-red-100',
    iconColor: 'text-red-600',
  },
];

export function RecommendationCards({ devices }: RecommendationCardsProps) {
  // Check if any AC devices exist
  const hasAC = devices.some((d) => d.name.toLowerCase().includes('điều hòa') || d.name.toLowerCase().includes('ac'));

  return (
    <div className="space-y-3">
      <h3 className="font-bold text-foreground">Mẹo tiết kiệm điện</h3>
      
      <div className="grid gap-3 sm:grid-cols-2">
        {recommendations.map((rec, idx) => {
          const Icon = rec.icon;
          return (
            <Card
              key={idx}
              className={`border-border p-4 transition-all hover:shadow-md cursor-pointer ${rec.color}`}
            >
              <div className="flex gap-3">
                <div className="flex-shrink-0">
                  <Icon className={`h-5 w-5 ${rec.iconColor} mt-1`} />
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">{rec.title}</p>
                  <p className="text-xs text-muted-foreground mt-1">{rec.description}</p>
                  <Badge variant="secondary" className="mt-2 text-xs">
                    {rec.impact}
                  </Badge>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
