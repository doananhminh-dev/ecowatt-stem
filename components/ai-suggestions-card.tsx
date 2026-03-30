'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Sparkles, Send } from 'lucide-react';
import { useState } from 'react';
import type { Device } from '@/app/page';

interface AiSuggestionsCardProps {
  devices: Device[];
  dailyKwh: number;
  monthlyCost: number;
}

export function AiSuggestionsCard({
  devices,
  dailyKwh,
  monthlyCost,
}: AiSuggestionsCardProps) {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState('');

  // Find high-consumption devices
  const topDevices = [...devices]
    .sort((a, b) => {
      const aKwh = (a.power * a.quantity * a.hoursPerDay) / 1000;
      const bKwh = (b.power * b.quantity * b.hoursPerDay) / 1000;
      return bKwh - aKwh;
    })
    .slice(0, 3);

  const topDevicesStr = topDevices
    .map((d) => `${d.name} (${((d.power * d.quantity * d.hoursPerDay) / 1000).toFixed(2)} kWh/ngày)`)
    .join(', ');

  const handleSubmit = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    setResponse('');

    // Simulate AI response with placeholder logic
    setTimeout(() => {
      const defaultResponse = `
Dựa trên hồ sơ năng lượng của bạn (${dailyKwh.toFixed(2)} kWh/ngày):

**Thiết bị tiêu thụ nhiều điện nhất:** ${topDevicesStr}

**Gợi ý:**
1. Sử dụng điều hòa vào giờ ngoài cao điểm khi có thể
2. Xem xét LED để giảm tiêu thụ 75%
3. Rút phích cắm thiết bị khi không sử dụng để tránh tiêu thụ chờ
4. Đặt nhiệt độ tủ lạnh ở 4-5°C để hiệu quả tối ưu
5. Sử dụng ổ cắm để dễ dàng tắt các hệ thống giải trí

**Câu hỏi của bạn:** "${prompt}"

Đây là những gợi ý chung. Chiến lược tốt nhất tùy thuộc vào mô hình sử dụng cụ thể và giá điện địa phương của bạn.`;

      setResponse(defaultResponse);
      setLoading(false);
    }, 1500);
  };

  return (
    <Card className="border-accent/50 bg-gradient-to-br from-accent/5 to-white p-6 shadow-sm relative overflow-hidden">
      {/* Premium Badge */}
      <Badge className="absolute top-4 right-4 bg-accent text-white gap-1">
        <Sparkles className="h-3 w-3" />
        Gợi ý thông minh
      </Badge>

      <h3 className="font-bold text-foreground mb-4 mt-2">AI Tối ưu hóa năng lượng</h3>

      <div className="space-y-4">
        {/* Quick Stats */}
        <div className="text-xs text-muted-foreground">
          <p className="mb-2">
            <span className="font-semibold">Tiêu thụ hiện tại:</span> {dailyKwh.toFixed(2)} kWh/ngày
          </p>
          <p>
            <span className="font-semibold">Chi phí hàng tháng:</span> ₫{monthlyCost.toLocaleString('vi-VN')}
          </p>
        </div>

        {/* Input Area */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">
            Hỏi gợi ý tiết kiệm điện:
          </label>
          <Textarea
            placeholder="Ví dụ: Làm thế nào tôi có thể giảm sử dụng điều hòa?"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="border-border min-h-20 text-sm resize-none"
            disabled={loading}
          />
          <Button
            onClick={handleSubmit}
            disabled={loading || !prompt.trim()}
            className="w-full gap-2 bg-accent text-white hover:bg-accent/90"
          >
            <Send className="h-4 w-4" />
            {loading ? 'Đang phân tích...' : 'Nhận gợi ý'}
          </Button>
        </div>

        {/* Response */}
        {response && (
          <div className="rounded-lg bg-white border border-border p-4 space-y-2">
            <div className="text-sm text-foreground whitespace-pre-line leading-relaxed">
              {response}
            </div>
            <Button
              variant="outline"
              size="sm"
              className="border-accent text-accent hover:bg-accent/5 mt-2"
              onClick={() => {
                setResponse('');
                setPrompt('');
              }}
            >
              Xóa
            </Button>
          </div>
        )}

        {/* Info */}
        <p className="text-xs text-muted-foreground">
          💡 Những gợi ý này được tạo dựa trên hồ sơ năng lượng hiện tại của bạn. Kết quả có thể thay đổi tùy theo cách thiết lập nhà cửa và giá điện địa phương.
        </p>
      </div>
    </Card>
  );
}
