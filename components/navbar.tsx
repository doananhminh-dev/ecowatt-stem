import { Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-blue-900/20 bg-blue-900 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-white/20 p-2.5">
            <Zap className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">EcoWatt</h1>
            <p className="text-xs text-blue-100">Theo dõi năng lượng</p>
          </div>
        </div>
        
        <div className="hidden gap-2 sm:flex">
          <Button variant="ghost" className="text-blue-100 hover:bg-white/10">
            Tìm hiểu
          </Button>
          <Button variant="ghost" className="text-blue-100 hover:bg-white/10">
            Giới thiệu
          </Button>
          <Button className="bg-white text-blue-900 hover:bg-blue-50 font-semibold">
            Bắt đầu
          </Button>
        </div>
      </div>
    </nav>
  );
}
