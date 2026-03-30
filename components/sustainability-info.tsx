'use client';

import { Card } from '@/components/ui/card';
import { Leaf, Droplet, Wind, BarChart3 } from 'lucide-react';

export function SustainabilityInfo() {
  const stats = [
    {
      icon: Leaf,
      title: 'Giảm dấu chân carbon',
      description: 'Mỗi kWh tiết kiệm giảm khoảng 0,6 kg CO₂',
      color: 'bg-green-100',
      iconColor: 'text-green-600',
    },
    {
      icon: Droplet,
      title: 'Tiết kiệm nước',
      description: 'Sản xuất điện cần nước. Tiết kiệm năng lượng bảo vệ tài nguyên nước',
      color: 'bg-blue-100',
      iconColor: 'text-blue-600',
    },
    {
      icon: Wind,
      title: 'Hỗ trợ năng lượng sạch',
      description: 'Năng lượng tái tạo phát triển khiến tiết kiệm hiệu quả hơn',
      color: 'bg-cyan-100',
      iconColor: 'text-cyan-600',
    },
    {
      icon: BarChart3,
      title: 'Theo dõi tiến độ',
      description: 'Giám sát thói quen dùng điện và đạt các mục tiêu tiết kiệm',
      color: 'bg-purple-100',
      iconColor: 'text-purple-600',
    },
  ];

  return (
    <section className="bg-gradient-to-r from-green-50 to-blue-50 py-12 border-t border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-foreground">Vì sao điện năng quan trọng</h2>
          <p className="mt-2 text-muted-foreground">
            Mỗi kWh tiết kiệm đóng góp vào tương lai bền vững hơn cho Việt Nam
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <Card
                key={idx}
                className={`border-border p-6 text-center transition-all hover:shadow-md hover:-translate-y-1 ${stat.color}`}
              >
                <div className="flex justify-center mb-4">
                  <Icon className={`h-8 w-8 ${stat.iconColor}`} />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{stat.title}</h3>
                <p className="text-sm text-muted-foreground">{stat.description}</p>
              </Card>
            );
          })}
        </div>

        {/* Vietnamese Energy Facts */}
        <div className="mt-8 rounded-lg bg-white border border-border p-6">
          <h3 className="font-bold text-foreground mb-4">Sự kiện năng lượng Việt Nam</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2 pb-4 border-b sm:border-b-0 sm:border-r border-border">
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">Tiêu thụ trung bình nhà cửa:</span> 70-100 kWh/tháng
              </p>
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">Giá điện thông thường:</span> ₫3.000-4.000/kWh
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">Giờ cao điểm:</span> 9 sáng - 11 tối
              </p>
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">Năng lượng tái tạo:</span> Năng lực điện mặt trời đang tăng
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
