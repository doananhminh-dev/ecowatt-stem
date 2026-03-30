import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function HeroSection() {
  return (
    <section className="bg-gradient-to-r from-primary/10 to-accent/10 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-balance text-foreground sm:text-5xl lg:text-6xl">
            Track Your Energy, Save Your Money
          </h1>
          <p className="mt-6 text-lg text-muted-foreground text-balance sm:text-xl">
            Hiểu rõ tiêu thụ điện gia dụng và đưa ra những quyết định thông minh để giảm dấu chân carbon. Tính toán thời gian thực. Gợi ý thông minh.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Button size="lg" className="gap-2 bg-primary text-white hover:bg-primary/90">
              Bắt đầu theo dõi <ArrowRight className="h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/5">
              Tìm hiểu thêm
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
