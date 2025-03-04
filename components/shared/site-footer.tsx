import React from "react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

export function SiteFooter() {
  return (
    <footer className="w-full py-12 bg-gradient-to-t from-blue-950 to-blue-900 text-gray-400 relative overflow-hidden">
      {/* Tech background elements */}
      <div className="absolute inset-0 bg-grid-small-white/[0.02] -z-10" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl" />
      
      <div className="container px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Vincent Weng</h3>
            <p className="max-w-xs">
              兼具人机交互学术背景与AI工程思维的复合型人才，致力于构建AI增强型个体。
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">导航</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  首页
                </Link>
              </li>
              <li>
                <Link href="#ai-expertise" className="hover:text-white transition-colors">
                  AI专长
                </Link>
              </li>
              <li>
                <Link href="#skills" className="hover:text-white transition-colors">
                  技能
                </Link>
              </li>
              <li>
                <Link href="#projects" className="hover:text-white transition-colors">
                  项目
                </Link>
              </li>
              <li>
                <Link href="#experience" className="hover:text-white transition-colors">
                  经历
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">联系方式</h3>
            <ul className="space-y-2">
              <li>邮箱: example@example.com</li>
              <li>GitHub: github.com/yourusername</li>
              <li>LinkedIn: linkedin.com/in/yourusername</li>
            </ul>
          </div>
        </div>
        <Separator className="my-8 bg-slate-800" />
        <div className="text-center">
          <p>© {new Date().getFullYear()} Vincent Weng. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
