'use client';

import { Separator } from '@/components/ui/separator';
import { Github, Mail, Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-border bg-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-3">
          {/* Brand */}
          <div>
            <h3 className="font-bold text-foreground">EcoWatt</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Theo dõi tiêu thụ điện và xây dựng thói quen sống xanh bền vững cho ngày mai.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-3">Tài nguyên</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Hướng dẫn tiết kiệm điện
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Câu hỏi thường gặp
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Liên hệ chúng tôi
                </a>
              </li>
            </ul>
          </div>

          {/* Social & Info */}
          <div>
            <h4 className="font-semibold text-foreground mb-3">Kết nối</h4>
            <div className="flex gap-4 mb-4">
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
            <p className="text-xs text-muted-foreground">
              Tạo với <Heart className="h-3 w-3 inline text-red-500" /> cho năng lượng bền vững
            </p>
          </div>
        </div>

        <Separator className="my-6" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>&copy; 2025 EcoWatt. Dự án STEM 2026 - Năng lượng bền vững</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-foreground transition-colors">
              Chính sách bảo mật
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Điều khoản dịch vụ
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
