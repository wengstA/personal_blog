"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon, GitHubLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";

// 客户端组件处理随机数生成
function ClientDigitalRain() {
  const [digitalRainElements, setDigitalRainElements] = useState<{top: string; left: string; opacity: number; text: string}[]>([]);
  
  useEffect(() => {
    // 只在客户端生成随机数据
    const elements = Array(10).fill(0).map(() => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      opacity: Math.random() * 0.5 + 0.2,
      text: Math.random().toString(36).substring(2, 7)
    }));
    
    setDigitalRainElements(elements);
  }, []);
  
  return (
    <div className="absolute inset-0 overflow-hidden opacity-[0.10]">
      {digitalRainElements.map((element, i) => (
        <div 
          key={i} 
          className="absolute text-xs font-mono text-cyan-400"
          style={{ 
            top: element.top, 
            left: element.left, 
            opacity: element.opacity 
          }}
        >
          {element.text}
        </div>
      ))}
    </div>
  );
}

export function HeroSection() {
  const words = [
    { text: "融合" },
    { text: "技术洞察", className: "text-[hsl(var(--secondary))]" },
    { text: "与" },
    { text: "产品思维", className: "text-[hsl(var(--primary))]" },
    { text: "的"},
    { text: "AI一线冲浪者🏄", className: "text-[hsl(var(--impressionist-blue))]" },
    { text: "创新实践 + 超强执行力 = AI时代新个体", className: "text-[hsl(var(--accent))]"},
  ];

  // Define shape props structure for type safety
  interface Shape {
    type: 'circle' | 'triangle' | 'rectangle' | 'blob';
    width: number;
    height: number;
    left: string;
    top: string;
    rotation: number;
    duration: number;
    color: string;
    zIndex: number;
  }
  
  const [shapes, setShapes] = useState<Shape[]>([]);

  // Generate geometric shapes only on the client side to avoid hydration issues
  useEffect(() => {
    // Headspace风格的柔和颜色
    const headspaceColors = [
      'hsla(var(--impressionist-blue) / 0.15)',
      'hsla(var(--impressionist-green) / 0.15)',
      'hsla(var(--impressionist-yellow) / 0.15)',
      'hsla(var(--impressionist-pink) / 0.15)',
      'hsla(var(--impressionist-purple) / 0.15)',
      'hsla(var(--primary) / 0.15)',
      'hsla(var(--secondary) / 0.15)',
      'hsla(var(--accent) / 0.15)',
    ];
    
    // 创建大型几何形状，类似Headspace风格
    const shapes: Shape[] = [
      // 大圆形
      {
        type: 'circle',
        width: 400,
        height: 400,
        left: '75%',
        top: '20%',
        rotation: 0,
        duration: 20,
        color: headspaceColors[0],
        zIndex: 1
      },
      // 矩形
      {
        type: 'rectangle',
        width: 200,
        height: 300,
        left: '10%',
        top: '60%',
        rotation: 15,
        duration: 25,
        color: headspaceColors[1],
        zIndex: 1
      },
      // 三角形
      {
        type: 'triangle',
        width: 250,
        height: 250,
        left: '20%',
        top: '15%',
        rotation: -10,
        duration: 22,
        color: headspaceColors[2],
        zIndex: 1
      },
      // 不规则形状
      {
        type: 'blob',
        width: 350,
        height: 350,
        left: '65%',
        top: '65%',
        rotation: 5,
        duration: 30,
        color: headspaceColors[3],
        zIndex: 1
      },
      // 额外的形状
      {
        type: 'circle',
        width: 200,
        height: 200,
        left: '40%',
        top: '80%',
        rotation: 0,
        duration: 18,
        color: headspaceColors[4],
        zIndex: 2
      },
      {
        type: 'rectangle',
        width: 150,
        height: 100,
        left: '50%',
        top: '30%',
        rotation: -20,
        duration: 23,
        color: headspaceColors[5],
        zIndex: 2
      },
    ];
    
    setShapes(shapes);
  }, []);

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center bg-background overflow-hidden">
      {/* 背景动画元素 - 细微纹理 */}
      <div className="absolute inset-0 w-full h-full bg-grid-small-white/[0.08] -z-10" />
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center [mask-image:radial-gradient(ellipse_at_center,transparent_20%,white)]"></div>
      
      {/* 高科技风格背景元素 - 蓝光效果（仅在黑暗模式下显示） */}
      <div className="dark:block hidden">
        <div className="absolute w-[800px] h-[800px] left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 bg-[hsl(220,100%,50%)] rounded-full blur-[250px] opacity-[0.15] animate-pulse"></div>
        <div className="absolute w-[400px] h-[400px] left-[65%] top-[30%] bg-[hsl(190,100%,50%)] rounded-full blur-[150px] opacity-[0.10] animate-pulse"></div>
        <div className="absolute w-[300px] h-[300px] left-[20%] bottom-[20%] bg-[hsl(210,100%,60%)] rounded-full blur-[120px] opacity-[0.10] animate-pulse"></div>
        
        {/* 数字雨风格的元素 */}
        <ClientDigitalRain />
        
        {/* 扫描线效果 */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent bg-repeat-y h-10 animate-scan"></div>
      </div>
      
      {/* 山脉背景和过渡效果 - 固定在Hero部分底部 */}
      <div className="dark:hidden absolute bottom-0 left-0 right-0 overflow-hidden" style={{ height: "40vh" }}>
        {/* 山脉形状背景 */}
        <svg className="absolute bottom-0 w-full h-full" viewBox="0 0 1440 380" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0,142L60,152.7C120,163,240,185,360,179.3C480,174,600,142,720,147.3C840,153,960,195,1080,211.3C1200,227,1320,217,1380,211.3L1440,206L1440,380L1380,380C1320,380,1200,380,1080,380C960,380,840,380,720,380C600,380,480,380,360,380C240,380,120,380,60,380L0,380Z" fill="rgba(79, 161, 97, 0.25)"/>
          <path d="M0,174L48,168.7C96,163,192,153,288,163.3C384,174,480,206,576,200.7C672,195,768,153,864,120.7C960,89,1056,67,1152,78C1248,89,1344,131,1392,152.7L1440,174L1440,380L1392,380C1344,380,1248,380,1152,380C1056,380,960,380,864,380C768,380,672,380,576,380C480,380,384,380,288,380C192,380,96,380,48,380L0,380Z" fill="rgba(54, 133, 77, 0.35)"/>
          <path d="M0,206L60,200.7C120,195,240,185,360,168.7C480,153,600,131,720,131.3C840,131,960,153,1080,163.3C1200,174,1320,174,1380,174L1440,174L1440,380L1380,380C1320,380,1200,380,1080,380C960,380,840,380,720,380C600,380,480,380,360,380C240,380,120,380,60,380L0,380Z" fill="rgba(105, 180, 132, 0.4)"/>
        </svg>
          
        {/* 改进的过渡效果 - 移除白色背景 */}
        <div className="absolute bottom-0 left-0 right-0 h-full bg-gradient-to-b from-transparent via-background/30 to-transparent backdrop-blur-[1px]"></div>
      </div>
      
      
      
      {/* 主内容 */}
      <div className="container px-4 md:px-6 z-10">
        <div className="flex flex-col items-center space-y-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tighter text-foreground drop-shadow-sm">
              Hello啊!🤓 我是文森特
            </h1>
            <p className="mt-2 text-xl md:text-2xl text-muted-foreground">
              AI产品 | 算法研究者 | 全栈开发者 | 风味探险家☕️
            </p>
          </motion.div>
          
          <div className="h-20">
            <TypewriterEffect words={words} className="text-lg md:text-2xl" noLoop={true} />
          </div>
          
          <motion.div 
            className="flex flex-col sm:flex-row items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Button size="lg" className="bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--secondary))] hover:from-[hsl(var(--primary))] hover:to-[hsl(var(--primary))] border-none shadow-lg shadow-primary/20 text-white">
              查看我的项目 <ArrowRightIcon className="ml-2 h-4 w-4" />
            </Button>
            
            <Button variant="outline" size="lg" className="border-[hsl(var(--accent))] text-[hsl(var(--accent))] hover:bg-[hsl(var(--accent))] hover:text-white">
              联系我
            </Button>
          </motion.div>
          
          <motion.div 
            className="flex gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Button variant="ghost" size="icon" className="rounded-full text-muted-foreground hover:bg-[hsl(var(--impressionist-pink))/0.2] hover:text-[hsl(var(--primary))]">
              <GitHubLogoIcon className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full text-muted-foreground hover:bg-[hsl(var(--impressionist-blue))/0.2] hover:text-[hsl(var(--impressionist-blue))]">
              <LinkedInLogoIcon className="h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
