import React from "react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

export function SiteFooter() {
  return (
    <footer className="w-full py-12 bg-white text-gray-600 relative overflow-hidden border-t border-gray-100">
      {/* Headspace风格背景元素 */}
      <div className="absolute inset-0 bg-grid-small-white/[0.07] -z-10" />
      
      {/* 几何形状装饰 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* 圆形装饰元素 */}
        <div 
          className="absolute rounded-full" 
          style={{
            top: "70%",
            left: "85%",
            width: "300px",
            height: "300px",
            background: "hsla(var(--impressionist-pink) / 0.05)",
          }}
        />
        <div 
          className="absolute rounded-full" 
          style={{
            top: "20%",
            left: "10%",
            width: "200px",
            height: "200px",
            background: "hsla(var(--impressionist-blue) / 0.05)",
          }}
        />
        
        {/* 矩形装饰元素 */}
        <div 
          className="absolute rounded-lg" 
          style={{
            top: "50%",
            left: "60%",
            width: "140px",
            height: "180px",
            background: "hsla(var(--impressionist-green) / 0.05)",
            transform: "rotate(15deg)",
          }}
        />
        <div 
          className="absolute rounded-lg" 
          style={{
            top: "10%",
            left: "40%",
            width: "160px",
            height: "120px",
            background: "hsla(var(--impressionist-yellow) / 0.05)",
            transform: "rotate(-10deg)",
          }}
        />
      </div>
      
      <div className="container px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Vincent Weng</h3>
            <p className="max-w-xs text-gray-600">
              兼具人机交互学术背景与AI工程思维的复合型人才，致力于构建AI增强型个体。
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">导航</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-500 hover:text-[hsl(var(--primary))] transition-colors">
                  首页
                </Link>
              </li>
              <li>
                <Link href="#ai-expertise" className="text-gray-500 hover:text-[hsl(var(--primary))] transition-colors">
                  AI专长
                </Link>
              </li>
              <li>
                <Link href="#skills" className="text-gray-500 hover:text-[hsl(var(--primary))] transition-colors">
                  技能
                </Link>
              </li>
              <li>
                <Link href="#projects" className="text-gray-500 hover:text-[hsl(var(--primary))] transition-colors">
                  项目
                </Link>
              </li>
              <li>
                <Link href="#experience" className="text-gray-500 hover:text-[hsl(var(--primary))] transition-colors">
                  经历
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">联系方式</h3>
            <ul className="space-y-2 text-gray-500">
              <li>邮箱: example@example.com</li>
              <li>GitHub: github.com/yourusername</li>
              <li>LinkedIn: linkedin.com/in/yourusername</li>
            </ul>
          </div>
        </div>
        <Separator className="my-8 bg-gray-200" />
        <div className="text-center">
          <p className="text-gray-500">© {new Date().getFullYear()} Vincent Weng. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
