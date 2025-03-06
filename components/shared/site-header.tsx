"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  // After mounting, we can safely show the theme toggle
  useEffect(() => {
    setMounted(true);
    
    // 确保localStorage中的主题设置与当前状态匹配
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, [setTheme]);
  
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setIsScrolled(offset > 50);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    // 手动将主题存储到localStorage，增强兼容性
    localStorage.setItem('theme', newTheme);
  };
  
  return (
    <header className={cn(
      "fixed top-0 w-full z-50 transition-all duration-300",
      isScrolled 
        ? "bg-white/80 backdrop-blur-md shadow-sm py-2 dark:bg-[rgb(28,28,30)]/80" 
        : "bg-transparent py-4"
    )}>
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-4">
          {mounted && (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleTheme}
              className="rounded-full hover:bg-[rgba(0,0,0,0.05)] dark:hover:bg-[rgba(255,255,255,0.1)]"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5 text-white" />
              ) : (
                <Moon className="h-5 w-5 text-[rgb(48,48,48)]" />
              )}
            </Button>
          )}
          <Link href="/" className="font-medium text-lg text-[rgb(48,48,48)] dark:text-white">
            Vincent<span className="text-[rgb(0,113,227)]">.</span>Weng
          </Link>
        </div>
        
        <div className="flex items-center space-x-2">
          <nav className="hidden md:flex items-center space-x-8">
            <NavLink href="#about">关于我</NavLink>
            <NavLink href="#ai-expertise">AI专长</NavLink>
            <NavLink href="#skills">技能</NavLink>
            <NavLink href="#projects">项目</NavLink>
            <NavLink href="#experience">经历</NavLink>
            <NavLink href="#experience">浪潮沉思录</NavLink>
            <NavLink href="#experience">学习笔记</NavLink>
          </nav>
          
          <Button 
            variant="ghost" 
            className="ml-6 text-[rgb(0,113,227)] hover:bg-[rgba(0,113,227,0.1)] dark:text-[rgb(10,132,255)] dark:hover:bg-[rgba(10,132,255,0.1)] transition-colors font-medium rounded-full px-4"
          >
            联系我
          </Button>
        </div>
      </div>
    </header>
  );
}

// Navigation link component with blue underline animation
function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link 
      href={href} 
      className="text-sm font-medium text-[rgb(48,48,48)] dark:text-[rgb(220,220,220)] relative group py-2"
    >
      {children}
      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[rgb(0,113,227)] dark:bg-[rgb(10,132,255)] transition-all duration-300 group-hover:w-full"></span>
    </Link>
  );
}
