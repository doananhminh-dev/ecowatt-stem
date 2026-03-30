'use client';

import { Card } from '@/components/ui/card';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import type { Device } from '@/app/page';

interface ChartsSectionProps {
  devices: Device[];
  electricityPrice: number;
}

export function ChartsSection({ devices, electricityPrice }: ChartsSectionProps) {
  // Prepare data for bar chart (Daily consumption by device)
  const barData = devices.map((device) => ({
    name: device.name,
    'kWh/ngày': Math.round(((device.power * device.quantity * device.hoursPerDay) / 1000) * 100) / 100,
  }));

  // Prepare data for pie chart (Cost distribution)
  const pieData = devices.map((device) => {
    const monthlyKwh = ((device.power * device.quantity * device.hoursPerDay) / 1000) * 30;
    const cost = monthlyKwh * electricityPrice;
    return {
      name: device.name,
      value: Math.round(cost),
    };
  });

  const colors = [
    '#2563eb', // primary blue
    '#06b6d4', // accent cyan
    '#3b82f6', // light blue
    '#60a5fa', // lighter blue
    '#93c5fd', // very light blue
    '#0ea5e9', // sky blue
  ];

  const totalCost = pieData.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="space-y-6">
      {/* Bar Chart */}
      <Card className="border-border bg-white p-6 shadow-sm">
        <h3 className="font-bold text-foreground mb-4">Tiêu thụ điện hàng ngày theo thiết bị</h3>
        {barData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '0.5rem',
                }}
              />
              <Bar dataKey="kWh/ngày" fill="#2563eb" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-300 flex items-center justify-center text-muted-foreground">
            Thêm thiết bị để xem biểu đồ
          </div>
        )}
      </Card>

      {/* Pie Chart */}
      <Card className="border-border bg-white p-6 shadow-sm">
        <h3 className="font-bold text-foreground mb-4">Phân bổ chi phí hàng tháng</h3>
        {pieData.length > 0 ? (
          <div className="flex flex-col md:flex-row gap-6">
            <ResponsiveContainer width="100%" height={300} minWidth={250}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => `₫${Number(value).toLocaleString('vi-VN')}`}
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '0.5rem',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>

            {/* Legend */}
            <div className="space-y-2 md:w-48">
              <p className="text-sm font-semibold text-foreground">Chi phí thiết bị</p>
              {pieData.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div
                      className="h-3 w-3 rounded-full"
                      style={{ backgroundColor: colors[idx % colors.length] }}
                    />
                    <span className="text-muted-foreground">{item.name}</span>
                  </div>
                  <span className="font-semibold text-foreground">
                    ₫{item.value.toLocaleString('vi-VN')}
                  </span>
                </div>
              ))}
              <div className="mt-3 border-t border-border pt-3">
                <div className="flex justify-between text-sm font-bold">
                  <span>Tổng/tháng:</span>
                  <span className="text-primary">₫{totalCost.toLocaleString('vi-VN')}</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-300 flex items-center justify-center text-muted-foreground">
            Thêm thiết bị để xem biểu đồ
          </div>
        )}
      </Card>
    </div>
  );
}
