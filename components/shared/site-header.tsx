"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setIsScrolled(offset > 50);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  return (
    <header className={cn(
      "fixed top-0 w-full z-50 transition-all duration-300",
      isScrolled 
        ? "bg-slate-900/80 backdrop-blur-md shadow-md py-2" 
        : "bg-transparent py-4"
    )}>
      <div className="container flex items-center justify-between">
        <Link href="/" className="font-bold text-xl text-white">
          Vincent<span className="text-blue-500">.</span>Weng
        </Link>
        
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="#about" className="text-sm text-gray-300 hover:text-white">
            关于我
          </Link>
          <Link href="#ai-expertise" className="text-sm text-gray-300 hover:text-white">
            AI专长
          </Link>
          <Link href="#skills" className="text-sm text-gray-300 hover:text-white">
            技能
          </Link>
          <Link href="#projects" className="text-sm text-gray-300 hover:text-white">
            项目
          </Link>
          <Link href="#experience" className="text-sm text-gray-300 hover:text-white">
            经历
          </Link>
        </nav>
        
        <Button variant="outline" className="border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white">
          联系我
        </Button>
      </div>
    </header>
  );
}
