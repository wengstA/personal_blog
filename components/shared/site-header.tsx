"use client";

import Link from "next/link";
import { useState, useEffect, Suspense } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { Moon, Sun, ArrowLeft } from "lucide-react";
import { usePathname } from "next/navigation";

// 提取需要使用 useSearchParams 的部分到一个单独的组件
function NavigationWithSearchParams() {
  "use client";
  const { useSearchParams, usePathname } = require('next/navigation');
  const searchParams = useSearchParams();
  const pathname = usePathname();
  
  // 检查当前是否在首页
  const isHomePage = pathname === "/";
  
  // 为锚点链接创建正确的URL
  const getHomeAnchorUrl = (anchor: string) => {
    return isHomePage ? anchor : `/${anchor}`;
  };
  
  return (
    <nav className="hidden md:flex items-center space-x-8">
      <NavLink href={`/feishu?url=https://ocnair1qm2mu.feishu.cn/wiki/Ahk2wKrREi4BVykCrg4cWlqGn7f?from=from_copylink`}>关于我</NavLink>
      <NavLink href={isHomePage ? "#ai-expertise" : "/#ai-expertise"}>AI专长</NavLink>
      <NavLink href={isHomePage ? "#skills" : "/#skills"}>技能</NavLink>
      <NavLink href={isHomePage ? "#projects" : "/#projects"}>项目</NavLink>
      <NavLink href={isHomePage ? "#experience" : "/#experience"}>经历</NavLink>
      <NavLink href="/blog">浪潮沉思录</NavLink>
      <NavLink href={`/feishu?url=https://ocnair1qm2mu.feishu.cn/wiki/PMo2wLeeZigWCykoDjdcqG00nLh`}>学习笔记</NavLink>
    </nav>
  );
}

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  
  // Check if we're on the feishu page
  const isFeishuPage = pathname === "/feishu";
  
  // After mounting, we can safely show the theme toggle
  useEffect(() => {
    setMounted(true);
  }, []);
  
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setIsScrolled(offset > 50);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  
  // Handle back navigation for study notes page
  const handleBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = '/';
    }
  };
  
  // Render simplified header for Feishu document pages
  if (isFeishuPage) {
    return (
      <header className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        "bg-white/80 backdrop-blur-md shadow-sm py-2 dark:bg-[rgb(28,28,30)]/80" 
      )}>
        <div className="container flex items-center justify-between">
          {/* Left side: Theme toggle and back button */}
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
            <Button 
              variant="ghost" 
              onClick={handleBack}
              className="text-[rgb(0,113,227)] dark:text-[rgb(10,132,255)] hover:text-blue-700 dark:hover:text-blue-400 flex items-center gap-1 font-medium p-0"
            >
              <ArrowLeft size={18} />
              <span>返回</span>
            </Button>
          </div>
          
          {/* The page title is now handled by the FeishuPage component */}
          <div className="invisible" aria-hidden="true">
            {/* This empty div maintains layout consistency */}
          </div>
          
          {/* Right side: Username */}
          <div className="flex items-center">
            <Link href="/" className="font-medium text-lg text-[rgb(48,48,48)] dark:text-white">
              Vincent<span className="text-[rgb(0,113,227)]">.</span>Weng
            </Link>
          </div>
        </div>
      </header>
    );
  }
  
  // Regular header for all other pages
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
          <Suspense fallback={<div className="hidden md:block h-8 w-96 bg-gray-100 dark:bg-gray-800 animate-pulse rounded"></div>}>
            <NavigationWithSearchParams />
          </Suspense>
          
          {/* <Button 
            variant="ghost" 
            className="ml-6 text-[rgb(0,113,227)] hover:bg-[rgba(0,113,227,0.1)] dark:text-[rgb(10,132,255)] dark:hover:bg-[rgba(10,132,255,0.1)] transition-colors font-medium rounded-full px-4"
          >
            联系我
          </Button> */}
        </div>
      </div>
    </header>
  );
}

// Navigation link component with blue underline animation
function NavLink({ href, children, isExternal = false }: { href: string; children: React.ReactNode; isExternal?: boolean }) {
  const linkProps = isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {};
  
  return isExternal ? (
    <a 
      href={href}
      {...linkProps}
      className="text-sm font-medium text-[rgb(48,48,48)] dark:text-[rgb(220,220,220)] relative group py-2"
    >
      {children}
      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[rgb(0,113,227)] dark:bg-[rgb(10,132,255)] transition-all duration-300 group-hover:w-full"></span>
    </a>
  ) : (
    <Link 
      href={href} 
      className="text-sm font-medium text-[rgb(48,48,48)] dark:text-[rgb(220,220,220)] relative group py-2"
    >
      {children}
      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[rgb(0,113,227)] dark:bg-[rgb(10,132,255)] transition-all duration-300 group-hover:w-full"></span>
    </Link>
  );
}
