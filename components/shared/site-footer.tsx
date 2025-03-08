import React from "react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

export function SiteFooter() {
  return (
    <footer className="w-full py-12 bg-white dark:bg-[rgb(28,28,30)] text-gray-600 dark:text-gray-300 relative overflow-hidden border-t border-gray-100 dark:border-gray-800">
      {/* Headspace风格背景元素 */}
      <div className="absolute inset-0 bg-grid-small-white/[0.07] dark:bg-grid-small-black/[0.1] -z-10" />
      
      {/* 简化设计，移除彩色几何装饰 */}
      
      <div className="container px-4 md:px-6 relative z-10">
        <div className="flex flex-col space-y-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start">
            <div className="mb-6 md:mb-0">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Vincent WENG</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm">© {new Date().getFullYear()} All rights reserved.</p>
            </div>
            
            <div id="contact" className="relative">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">联系方式</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-left">
                <div className="text-gray-500 dark:text-gray-400">邮箱: st_weng_302@foxmail.com</div>
                <div className="text-gray-500 dark:text-gray-400">
                  GitHub: <a href="https://github.com/wengstA" className="text-[rgb(0,113,227)] hover:underline" target="_blank" rel="noopener noreferrer">github.com/wengstA</a>
                </div>
                <div className="text-gray-500 dark:text-gray-400">Wechat: WenSENTeeee</div>
                <div className="text-gray-500 dark:text-gray-400">LinkedIn: 晚点更新:)</div>
              </div>
              <div id="magic-cursor" className="absolute -inset-4 border-2 border-transparent rounded-lg pointer-events-none opacity-0"></div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
